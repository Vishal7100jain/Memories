import React, { useEffect, useState } from 'react'
import makeStyles from './style'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost } from '../../actions/Post'

const CreateForm = () => {
    const [postData, setPostData] = useState({ creator: "", title: "", message: "", tags: "", selectedFile: "" })
    const classes = makeStyles()
    const dispatch = useDispatch()

    const clear = () => {
        setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPost(postData))
        setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" })
    }

    return (
        <Paper className={classes.paper}>
            <form method='POST' autoComplete='off' noValidate className={classes.root}>
                <Typography variant='h6'>
                    Creating a Memory
                </Typography>
                <TextField name='creator' variant='outlined' value={postData.creator} label="Creator" fullWidth onChange={(e) => setPostData({ ...postData, creator: e.target.value })}></TextField>
                <TextField name='title' variant='outlined' label="title" value={postData.title} fullWidth onChange={(e) => setPostData({ ...postData, title: e.target.value })}></TextField>
                <TextField name='message' variant='outlined' label="message" value={postData.message} fullWidth onChange={(e) => setPostData({ ...postData, message: e.target.value })}></TextField>
                <TextField name='tags' variant='outlined' label="tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })}></TextField>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}></FileBase>
                <Button variant='contained' onClick={handleSubmit} color='primary' size='large' type='button' fullWidth className={classes.buttonSubmit}>
                    Submit
                </Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth className={classes.buttonSubmit}>
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default CreateForm
