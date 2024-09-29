import React from 'react';
import { Grid } from '@mui/material';
import List from './List';
import { useParams } from 'react-router-dom';

const Component = () => {
  const { email } = useParams();

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <List email={email} />
      </Grid>
    </Grid>
  );
}

export default Component;
