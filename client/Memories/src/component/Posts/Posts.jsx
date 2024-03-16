import React, { useEffect } from 'react'
import makeStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../actions/Post.js'
import { CircularProgress, Grid } from '@material-ui/core'
import { Post } from './Post/post.jsx'

const Posts = () => {
    const { Posts } = useSelector((state) => state.Post)
    const dispatch = useDispatch()
    const classes = makeStyles()

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    return (
        <div className={classes.card}>
            {!Posts.length ? <CircularProgress /> :
                (<Grid className={classes.card} container alignItems='stretch' spacing={3} >
                    {Posts.map((item) => {
                        <Grid item key={item._id} xs={12} sm={6}>
                            {/* {console.log(item)} */}
                            <Post post={item}></Post>
                        </Grid>
                    })}
                </Grid>)
            }
        </div>
    )
}

export default Posts
