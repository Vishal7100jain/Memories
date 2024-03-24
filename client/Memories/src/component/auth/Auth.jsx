import React, { useEffect, useState } from "react"
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, ButtonBase } from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import makeStyles from "./Style"
import Input from './input'
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux"
import Axios from "axios"
import GoogleButton from 'react-google-button'
import { AuthAction } from "../../store/Auth"
import { useNavigate } from "react-router-dom"
import { signUp, signIn, googleLogin } from '../../actions/auth.js'

export const Auth = () => {
    const history = useNavigate()
    const classes = makeStyles()
    const dispatch = useDispatch()
    let [isSignUp, setIsSignUp] = useState(false)
    let [showPassword, setPassword] = useState(false)
    let [confirmPassword, setConfirmPassword] = useState(false)
    let [User, setUser] = useState(null)
    let [formData, setFormData] = useState({ FirstName: "", LastName: "", Email: "", Password: "" })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signUp(formData, history))
        } else {
            dispatch(signIn(formData, history))
        }
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        setPassword((pre) => !pre)
    }
    const handleShowConfirmPassword = () => {
        setConfirmPassword((pre) => !pre)
    }

    const switchMode = () => {
        setIsSignUp((pre) => !pre)
    }

    const login = useGoogleLogin({
        onError: (err) => console.log(err),
        onSuccess: (res) => {
            try {
                setUser(res)
            } catch (error) {
                console.log(error)
            }
        },
    })

    useEffect(
        () => {
            if (User) {
                Axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${User.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${User.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        dispatch(googleLogin({ Email: res.data.email }, history))
                        setUser(res.data)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [User]
    );

    return (
        <Container component="main" maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon></LockOutlinedIcon>
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form onSubmit={handleSubmit} className={classes.form} >
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="FirstName" label="FirstName" handleChange={handleChange} autoFocus half={true} />
                                <Input name="LastName" label="LastName" handleChange={handleChange} autoFocus half={true} />
                            </>
                        )}
                        <Input name="Email" label="Email" handleChange={handleChange} type="email"></Input>
                        <Input name="Password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}></Input>

                        {isSignUp && <Input name='Password' label='Repeat Password' handleChange={handleChange} handleShowPassword={handleShowConfirmPassword} type={confirmPassword ? 'text' : 'password'} />}

                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Grid container justifyContent="center">
                            <GoogleButton
                                onClick={() => login()}
                            />
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item >
                                <Button onClick={() => switchMode()}>
                                    {isSignUp ? `Already have an account : Sign In` : `Don't have an account  : Sign Up`}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form >
            </Paper>
        </Container >
    )
}