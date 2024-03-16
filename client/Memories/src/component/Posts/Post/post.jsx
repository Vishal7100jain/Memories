import makeStyles from './style'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useState } from 'react'

export const Post = ({ post, deletePost }) => {
    let [like, setLike] = useState(post.likeCount)
    function handleLike() {
        setLike((pre) => {
            return pre += 1
        })
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
                    <Typography variant='h6'>{post.creator}</Typography>
                    <Typography variant='body2'>{moment(post.created).fromNow()}</Typography>
                </div>

                <div className={classes.overlay2} >
                    <Button style={{ color: "white" }} size='small' onClick={() => { }}>
                        <MoreHorizIcon fontSize='default'></MoreHorizIcon>
                    </Button>
                </div>

                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>

                <CardContent>
                    <Typography className={classes.title} variant='h5' gutterBottom>{post.message}</Typography>
                </CardContent>

                <CardActions className={classes.cardActions}>
                    <Button size='small' color='primary' onClick={() => handleLike()}>
                        <ThumbUpAltIcon fontSize='default'></ThumbUpAltIcon>
                        Like
                        {post.likeCount}
                    </Button>
                    <Button size='small' color='primary' onClick={() => handleDelete()}>
                        <DeleteIcon fontSize='default'></DeleteIcon>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </ >
    )
}