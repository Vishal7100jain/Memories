import React, { useEffect } from 'react'
import { Paper, Typography, Divider, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import makestyle from './styles.jsx'
import Skeleton from '../Skeleton/Skeleton.jsx';
import { SearchPostActFun, getPostFromId } from '../../actions/Post.js';

const PostDetails = () => {
    const { post, isLoading } = useSelector((state) => state.Post)
    const SearchPost = useSelector((state) => state.SearchPost)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const classes = makestyle()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getPostFromId(id))
    }, [id])

    useEffect(() => {
        if (post) dispatch(SearchPostActFun({ search: 'none', tags: post.tags }))
    }, [post])

    const recommendedPosts = SearchPost

    return <>
        {isLoading || post.length == 0 ? <Skeleton></Skeleton>
            :
            < Paper raised elevation={8}>
                <div className={classes.card}>
                    <Grid className={classes.section} raised elevation={8}>
                        <Typography variant="h3" component="h2">{post.title}</Typography>

                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>

                        <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>

                        <Typography variant="h6">Created by: {post.creator[0].Name}</Typography>

                        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>

                        <Divider style={{ margin: '20px 0' }} />

                        <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>

                        <Divider style={{ margin: '20px 0' }} />

                        <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>

                        <Divider style={{ margin: '20px 0' }} />
                    </Grid>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                    </div>
                </div>
                {recommendedPosts.length && (
                    <div className={classes.section}>
                        <Typography gutterBottom variant='h5'>You might also like : </Typography>
                        <Divider></Divider>
                        {recommendedPosts.map((post) => {
                            return <div style={{ display: 'flex', flexDirection: "row", margin: '20px', cursor: "pointer" }}>
                                <Link to={`/posts/${post._id}`}>{post.title}</Link>
                            </div>
                        }
                        )}
                    </div>
                )}
            </Paper >
        }
    </>
}

export default PostDetails
