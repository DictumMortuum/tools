import React from 'react';
import { Grid } from '@mui/material';
import Picture from './Picture';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../context';

const fetchPlayer = async ({ email }) => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/players/email/${email}`, {
    headers: {
      "SA": localStorage.getItem("st"),
    }
  });
  return rs.json();
}

const Container = () => {
  const { state: { user: { email } } } = React.useContext(UserContext);

  const { data, isLoading }= useQuery({
    queryKey: ["player", email],
    queryFn: () => fetchPlayer({ email }),
    enabled: !!email,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return <Component player={data} />
}

const Component = ({ player }) => {
  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <Picture player={player} />
      </Grid>
    </Grid>
  );
}

export default Container;
