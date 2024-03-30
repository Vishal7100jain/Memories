import React, { useRef, useState } from "react";
import { Typography, TextField, Button, Grid } from '@material-ui/core'
import { useDispatch, } from "react-redux";
import useStyle from './styles'
import { PostComment } from "../../actions/Post";



const CommentSection = ({ post }) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const CommentRef = useRef()
    let [comment, setComment] = useState("")

    const handleSubmit = (e) => {
        dispatch(PostComment(post._id, comment))
        setComment("")
        CommentRef.current.scrollINtoView({ behavior: "smooth" })
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <Grid spacing={2} container>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h5">Comments</Typography>
                        <div className={classes.commentsInnerContainer}>
                            {post.comment && post.comment.map((c, i) => {
                                return <div key={i} className={classes.commentContainer}>
                                    <div className={classes.commentUser}>{c.owner[0].Name} : </div>
                                    <div className={classes.commentText}>{c.comment}</div>
                                </div>
                            })}
                        </div>
                        <div ref={CommentRef} />
                    </Grid>
                    <Grid xs={6} item style={{ width: '75%' }}>
                        <Typography gutterBottom variant='h5'>Write a Comment</Typography>
                        <TextField value={comment} style={{ marginBottom: '15px' }} onChange={(e) => setComment(e.target.value)} fullWidth label="Comment" id="Comment" />
                        <Button variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>Comment</Button>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}

export default CommentSection
