import React from 'react';
import { Grid } from '@mui/material';
import Wishlist from './Wishlist';

const Container = () => {
  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <Wishlist />
      </Grid>
    </Grid>
  );
}

export default Container;
