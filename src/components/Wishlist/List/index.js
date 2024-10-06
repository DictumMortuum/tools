import React from 'react';
import { Grid } from '@mui/material';
import Item from './item';
import { useQuery } from '@tanstack/react-query';

const fetchWishlist = async ({ email }) => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/wishlist?filter={"email":"${email}"}`);
  return rs.json();
}

const Container = ({ email }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["wishlist", email],
    queryFn: () => fetchWishlist({ email }),
    enabled: !!email,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return <Component data={data} />
}

const Component = ({ data }) => {
  return (
    <Grid container spacing={2} mt={1}>
      {data.map((d, i) => (
        <Grid item md={6} xs={12} key={i}>
          <Item item={d} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Container;
