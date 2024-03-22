import React, { useEffect, useState } from 'react'
import { googleLogout } from '@react-oauth/google';
import { AppBar, Avatar, Button, Grid, Toolbar, Typography, } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'
import images from '../image/memories.png';
import makeStyles from './NavbarStyle.jsx';
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';

const Navbar = () => {
    let [user, setUser] = useState(JSON.parse(localStorage.getItem('Profile')))
    const userData = useSelector((state) => state.Auth)
    const classes = makeStyles()

    const Logout = () => {
        googleLogout()
        localStorage.removeItem("Profile")
        setUser(null)
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('Profile')))
    }, [userData])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>
                    Memories
                </Typography>
                <img src={images} className={classes.image} alt="Memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Stack direction='row' spacing={2}>
                            <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant='h6' >{user.name}</Typography>
                        </Stack>
                        <LoadingButton onClick={() => Logout()} variant="contained">
                            <span>Logout</span>
                        </LoadingButton>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign Up</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
