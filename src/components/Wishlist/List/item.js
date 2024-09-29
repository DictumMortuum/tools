import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Component = ({ name, url, id, reserved }) => {
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
        <Button variant="outlined" disabled={reserved}>
          Reserve
        </Button>
        {/* <Button disabled={reserved} size="small">Reserve</Button> */}
        <Button href={url} size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default Component;
