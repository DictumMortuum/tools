import React from 'react';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Item from './item';

const fetchWishlists = async () => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/wishlist`);
  return rs.json();
}

const Container = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["wishlists"],
    queryFn: () => fetchWishlists(),
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return <Component data={[...new Set(data.map(d => d.email))]} />
}

const Component = ({ data }) => {
  return (
    <Grid container spacing={2} mt={1}>
      {data.map((d, i) => (
        <Grid item xs={12} key={i}>
          <Item email={d} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Container;
