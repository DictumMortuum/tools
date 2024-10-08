import React from 'react';
import { Button, Grid, Box, IconButton } from '@mui/material';
import Item from './item';
import { useQuery } from '@tanstack/react-query';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end" gap={1} >
          <CopyToClipboard text={window.location.href}>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </CopyToClipboard>
          <Button component={Link} to="/wishlist/create" variant="outlined">Create</Button>
          <Button component={Link} to="/wishlist" variant="outlined">All lists</Button>
        </Box>
      </Grid>
      {data.map((d, i) => (
        <Grid item md={6} xs={12} key={i}>
          <Item item={d} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Container;
