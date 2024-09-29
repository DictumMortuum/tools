import React from 'react';
import { Grid } from '@mui/material';
import { useEmail } from '../../../hooks/useEmail';
import Item from './item';
import { useQuery } from '@tanstack/react-query';

const fetchWishlist = async ({ email }) => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/wishlist?filter={"email":${email}}`);
  return rs.json();
}

const Container = () => {
  const { email } = useEmail();

  const { data, isLoading }= useQuery({
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
        <Grid item xs={4} key={i}>
          <Item {...d} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Container;
