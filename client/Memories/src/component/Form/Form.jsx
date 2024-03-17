import React, { useEffect, useState } from 'react'
import makeStyles from './style'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { UpdatePost, createPost } from '../../actions/Post'
import { PostIdAction } from '../../store/Post'

const CreateForm = () => {
    const [postData, setPostData] = useState({ creator: "", title: "", message: "", tags: "", selectedFile: "" })
    const classes = makeStyles()
    const dispatch = useDispatch()
    const PostToUpdate = useSelector((state) => state.PostId)
    const clear = () => {
        setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" })
    }

    useEffect(() => {
        if (PostToUpdate.length != 0) {
            setPostData(PostToUpdate)
        }
    }, [PostToUpdate])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (PostToUpdate.length == 0) {
            dispatch(createPost(postData))
        } else {
            dispatch(UpdatePost(postData))
            dispatch(PostIdAction.setPostId(""))
        }

        clear()
    }

    return (
        <Paper className={classes.paper}>
            <form method='POST' autoComplete='off' noValidate className={classes.root}>
                <Typography variant='h5' align='center'>
                    {PostToUpdate.length == 0 ? 'Create' : "Update"} a Memory
                </Typography>
                <TextField name='creator' variant='outlined' value={postData.creator} label="Creator" fullWidth onChange={(e) => setPostData({ ...postData, creator: e.target.value })}></TextField>
                <TextField name='title' variant='outlined' label="Title" value={postData.title} fullWidth onChange={(e) => setPostData({ ...postData, title: e.target.value })}></TextField>
                <TextField name='message' variant='outlined' label="Message" value={postData.message} fullWidth onChange={(e) => setPostData({ ...postData, message: e.target.value })}></TextField>
                <TextField name='tags' variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}></TextField>
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
