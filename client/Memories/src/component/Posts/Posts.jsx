import React, { useEffect, useState } from 'react'
import makeStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { DeletePost, fetchData } from '../../actions/Post.js'
import { CircularProgress, Grid } from '@material-ui/core'
import { Post } from './Post/post.jsx'

const Posts = () => {
    const { Posts } = useSelector((state) => state.Post)
    const dispatch = useDispatch()
    let [data, setData] = useState(false)
    const classes = makeStyles()

    const HandleDeletePost = (e) => {
        dispatch(DeletePost(e))
        setData((pre) => !pre)
    }

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    return (
        <div className={classes.mainContainer}>
            {!Posts.length ? <CircularProgress /> :
                (<Grid className={classes.card} container alignItems='stretch' spacing={3} >
                    {Posts.map((item) => {
                        return <Grid key={item._id} item sm={6} xs={12}>
                            <Post post={item} EditPost={(e) => handleEditPost(e)} deletePost={(e) => HandleDeletePost(e)} />
                        </Grid>
                    })}
                </Grid>)
            }
        </div>
    )
}

export default Posts
