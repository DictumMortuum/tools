import React from 'react';
import { Button, Grid, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Item from './item';
import { Link } from 'react-router-dom';

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
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button component={Link} to="/wishlist/create" variant="outlined">Create</Button>
        </Box>
      </Grid>
      {data.map((d, i) => (
        <Grid item xs={6} key={i}>
          <Item email={d} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Container;
