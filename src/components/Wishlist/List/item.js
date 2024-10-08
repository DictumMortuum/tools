import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { UserContext } from '../../../context';

const DeleteButton = ({ id }) => {
  const { setMsg, setOpen } = React.useContext(UserContext);
  const queryClient = useQueryClient();

  const deleteWishlistItem = () => {
    return fetch(`${process.env.REACT_APP_ENDPOINT}/rest/wishlist/${id}`, {
      method: "DELETE",
    }).then(res => res.json());
  }

  const { isPending, mutate } = useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error, variables, context) => {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    }
  });

  const onClick = () => {
    mutate();
  }

  return (
    <Button variant="contained" disabled={isPending} color="error" onClick={onClick}>
      Delete
    </Button>
  );
}

const Component = ({ item }) => {
  const { id, url, reserved, name, user_id } = item;
  const { state: { user: { user_id: state_user_id }}, setMsg, setOpen } = React.useContext(UserContext);
  const queryClient = useQueryClient();

  const reserveWishlistItem = payload => {
    return fetch(`${process.env.REACT_APP_ENDPOINT}/rest/wishlist/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }).then(res => res.json());
  }

  const { isPending, mutate } = useMutation({
    mutationFn: reserveWishlistItem,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error, variables, context) => {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    }
  });

  const handleReserve = () => {
    mutate({
      ...item,
      reserved: true,
    });
  }

  const handleUnreserve = () => {
    mutate({
      ...item,
      reserved: false,
    });
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={`${process.env.REACT_APP_ENDPOINT}/static/wish-${id}.jpg`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        {!reserved && <Button variant="contained" disabled={isPending} onClick={handleReserve}>
          Reserve
        </Button>}
        {reserved && <Button variant="outlined" disabled={isPending} color="error" onClick={handleUnreserve}>
          Reserved
        </Button>}
        {state_user_id === user_id && <DeleteButton id={id} />}
        <Button href={url} size="small">Link</Button>
      </CardActions>
    </Card>
  );
}

export default Component;
