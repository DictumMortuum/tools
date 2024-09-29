import React from 'react';
import { Grid } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import List from './List';
import { Link } from 'react-router-dom';

const Component = () => {
  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        component={Link}
        to="/wishlist/create"
        sx={{
        // position: 'absolute',
        // bottom: 16,
        // right: 16,
      }}>
        <AddIcon />
      </Fab>
      </Grid>
      <Grid item xs={12}>
        <List />
      </Grid>
    </Grid>
  );
}

export default Component;
