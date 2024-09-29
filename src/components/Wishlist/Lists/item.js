import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const fetchPlayer = async ({ email }) => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/players/email/${email}`);
  return rs.json();
}

const Container = ({ email }) => {
  const { data, isLoading }= useQuery({
    queryKey: ["player", email],
    queryFn: () => fetchPlayer({ email }),
    enabled: !!email,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return <Component {...data} />
}

const Component = ({ name, surname, avatar, email }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={avatar} />
        }
        title={`${name} ${surname}`}
      />
      <CardActions>
        <Button component={Link} to={`/wishlist/${email}`} variant="outlined">Wishlist</Button>
      </CardActions>
    </Card>
  );
}

export default Container;
