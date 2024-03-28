import React, { useEffect, useState } from 'react'
import makeStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { DeletePost, fetchData } from '../../actions/Post.js'
import { CircularProgress, Grid } from '@material-ui/core'
import { Post } from './Post/post.jsx'
import Skeleton from '../Skeleton/Skeleton.jsx'

const Posts = ({ loading, setLoadingForSeachPost }) => { // Receive loading state as a prop
    const { Posts } = useSelector((state) => state.Post)
    const SearchPost = useSelector((state) => state.SearchPost)
    const dispatch = useDispatch()
    const [data, setData] = useState(false)
    const user = localStorage.getItem("Profile")
    console.log(user)
    const classes = makeStyles()
    const [isLoading, setLoading] = useState(true)

    const HandleDeletePost = (e) => {
        dispatch(DeletePost(e))
        setData(!data)
    }

    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchData())
            setLoading(false)
        }

        loadData()
    }, [dispatch])


    useEffect(() => {
        setData(!data)
        setLoadingForSeachPost(false)
    }, [SearchPost, Posts, user])

    return (
        <div className={classes.mainContainer}>
            {loading || isLoading ? (
                <Skeleton />
            ) : (
                <Grid className={classes.card} container alignItems='stretch' spacing={3}>
                    {SearchPost.length === 0 ?
                        Posts.map((item) => (
                            <Grid key={item._id} item sm={12} lg={4} xs={12} md={6}>
                                <Post post={item} user={user} deletePost={(e) => HandleDeletePost(e)} />
                            </Grid>
                        )) :
                        SearchPost.map((item) => (
                            <Grid key={item._id} item sm={12} lg={4} xs={12} md={6}>
                                <Post post={item} deletePost={(e) => HandleDeletePost(e)} />
                            </Grid>
                        ))
                    }
                </Grid>
            )}
        </div>
    )
}

export default Posts
