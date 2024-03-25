import makeStyles from './style'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Paper } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { PostToUpdate, like } from '../../../actions/Post'
import { useEffect, useRef, useState } from 'react'

export const Post = ({ post, deletePost }) => {
    let dispatch = useDispatch()
    const user = useSelector((state) => state.Auth)
    let [render, setRender] = useState(false)
    const isInitialRender = useRef(true);

    function handleLike() {
        dispatch(like(post._id))
    }


    useEffect(() => {
        // Skip the effect on the initial render
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        // Run the effect only when the user changes
        setRender(prev => !prev);
    }, [user]);


    const handleEdit = () => {
        dispatch(PostToUpdate(post._id))
    }

    const handleDelete = () => {
        deletePost(post._id)
    }

    const classes = makeStyles()
    return (
        <>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>

                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.creator[0].Name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {user && (user.userId === post.creator[0]._id) && <>
                    <div className={classes.overlay2} >
                        <Button style={{ color: "white" }} size='small' onClick={() => handleEdit()}>
                            <MoreHorizIcon fontSize='default'></MoreHorizIcon>
                        </Button>
                    </div>
                </>}

                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>

                <Typography className={classes.title} variant='h5'>{post.title}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
                </CardContent>

                <CardActions className={classes.cardActions}>
                    {user ? <Button size='small' color='primary' onClick={() => handleLike()}>
                        <ThumbUpAltIcon fontSize='default'></ThumbUpAltIcon>
                        Like &nbsp;
                        {post.likeCount}
                    </Button>
                        :
                        <Button size='small' disabled color='primary' onClick={() => handleLike()}>
                            <ThumbUpAltIcon fontSize='default'></ThumbUpAltIcon>
                            Like &nbsp;
                            {post.likeCount}
                        </Button>
                    }
                    {user && (user.userId === post.creator[0]._id) ?
                        <>
                            <Button Button size='small' color='primary' onClick={() => handleDelete()}>
                                <DeleteIcon fontSize='default'></DeleteIcon>
                                &nbsp; Delete
                            </Button>
                        </>
                        :
                        <Paper variant='h6'>Post By : {post.creator[0].Name.toUpperCase()}</Paper>
                    }
                </CardActions>
            </Card >
        </ >
    )
}