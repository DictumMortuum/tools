import React from 'react';
import { Grid } from '@mui/material';
import Create from './create';
import Screenshot from './screenshot';

const Component = () => {
  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={3}>
        <Create />
      </Grid>
      <Grid item xs={9}>
        <Screenshot />
      </Grid>
    </Grid>
  );
}

export default Component;
