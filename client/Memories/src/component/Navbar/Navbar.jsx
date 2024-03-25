import React, { useEffect, useState } from 'react'
import { googleLogout } from '@react-oauth/google';
import { AppBar, Avatar, Button, Grid, Toolbar, Typography, } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'
import images from '../image/memories.png';
import makeStyles from './NavbarStyle.jsx';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import { AuthAction } from '../../store/Auth.js';
import jwtDecode from 'jwt-decode';

const Navbar = () => {
    let [user, setUser] = useState(JSON.parse(localStorage.getItem('Profile')))
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.Auth)
    const classes = makeStyles()

    const Logout = () => {
        googleLogout()
        setUser(null)
        dispatch(AuthAction.Logout())
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('Profile')))

        const token = user?.token
        if (token) {
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                return Logout()
            }
        }
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
                            <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0).toUpperCase()}</Avatar>
                            <Typography className={classes.userName} variant='h6' >{user.name.toUpperCase()}</Typography>
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
