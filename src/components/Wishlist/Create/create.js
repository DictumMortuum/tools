import * as React from 'react';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../../context';
import {
  List,
  ListItem,
  Button
} from '@mui/material';

const Component = () => {
  const { state: { user: { user_id, email }, wishlist: { name, url, reserved, screenshot } }, setMsg, setOpen, dispatch } = React.useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleName = (event) => {
    dispatch({ type: "wishlist::name", name: event.target.value });
  }

  const handleUrl = (event) => {
    dispatch({ type: "wishlist::url", url: event.target.value });
  }

  const handleReserved = (event) => {
    dispatch({ type: "wishlist::reserved", checked: event.target.checked });
  }

  const createWishlist = () => {
    return fetch(`${process.env.REACT_APP_ENDPOINT}/rest/wishlist`, {
      method: "POST",
      body: JSON.stringify({
        user_id,
        email,
        name,
        url,
        reserved,
        screenshot,
      })
    }).then(res => res.json());
  }

  const { isPending, mutate } = useMutation({
    mutationFn: createWishlist,
    onSuccess: (data, variables, context) => {
      setMsg("Your wishlist item was saved successfully.");
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error, variables, context) => {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    }
  });

  const handleClick = () => {
    if (!user_id || !email) {
      localStorage.setItem("redirectURL", pathname);
      navigate("/auth/login");
      return;
    }

    mutate({
      user_id,
      email,
      url,
      reserved,
      name,
    });

    navigate(`/wishlist/${email}`)
  }

  return (
    <List>
      <ListItem>
        <TextField label="Name" variant="outlined" onChange={handleName} value={name} />
      </ListItem>
      <ListItem>
        <TextField label="URL" variant="outlined" onChange={handleUrl} value={url} />
      </ListItem>
      <ListItem>
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Reserved" onChange={handleReserved} value={reserved} />
        </FormGroup>
      </ListItem>
      <ListItem>
        <Button variant="outlined" onClick={handleClick} disabled={isPending}>
          Create
        </Button>
      </ListItem>
    </List>
  );
}

export default Component;
