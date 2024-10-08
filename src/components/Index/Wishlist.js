import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';

const Component = () => {
  const { state: { user: { email } } } = React.useContext(UserContext);

  return (
    <Card>
      <CardHeader title="Wishlist" />
      <CardActions>
        <Button to={`/wishlist/${email}`} variant="contained" component={Link}>Visit</Button>
      </CardActions>
    </Card>
  );
}

export default Component;
