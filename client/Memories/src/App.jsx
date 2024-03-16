import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid
} from '@material-ui/core';
import makeStyles from './style';
import images from './component/image/memories.png';
import Posts from './component/Posts/Posts.jsx';
import CreateForm from './component/Form/Form.jsx'

function App() {
  const classes = makeStyles();

  return (
    <>
      <Container maxWidth='lg'>
        <AppBar className={classes.appBar} position='static' color='inherit'>
          <Typography className={classes.heading} variant='h2' align='center'>
            Memories
            <img src={images} className={classes.image} alt="Memories" height="60" />
          </Typography>
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={8}>
                <Posts />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CreateForm></CreateForm>
              </Grid>
            </Grid>
          </Container>
        </Grow >
      </Container >
    </>
  )
}

export default App;
