import React, { useEffect } from 'react'
import { Paper, Typography, Divider, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import makestyle from './styles.jsx'
import Skeleton from '../Skeleton/Skeleton.jsx';
import { recommendedPostsSearchFun, getPostFromId } from '../../actions/Post.js';
import CommentSection from './CommentSection.jsx';

const PostDetails = () => {
    const { recommendedPosts, post, isLoading } = useSelector((state) => state.Post)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const classes = makestyle()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getPostFromId(id))
    }, [id])

    useEffect(() => {
        if (post) dispatch(recommendedPostsSearchFun({ search: 'none', tags: post.tags }))
    }, [post])


    return <>
        {isLoading || post.length == 0 ? <Skeleton></Skeleton>
            :
            < Paper raised elevation={8} style={{ paddingBottom: '10px' }}>
                <div >
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
                            <CommentSection post={post}></CommentSection>
                        </Grid>
                        <div className={classes.imageSection}>
                            <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                        </div>
                    </div>
                    {recommendedPosts.length &&
                        <div className={classes.section}>
                            <Typography style={{ marginBottom: '1rem' }} variant='h5'>You might also like : </Typography>
                            <div style={{ display: 'flex' }}>
                                {recommendedPosts.map((item) => {
                                    return <Link to={`/posts/${item._id}`} key={item._id} className={classes.Link}>
                                        <img className={classes.recommendedPostsImg} src={item.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={item.title} />
                                        <Typography className={classes.PostTilte}>Like : {item.likeCount}</Typography>
                                        <Typography className={classes.PostTilte}>{item.title}</Typography>
                                    </Link>
                                }
                                )}
                            </div>
                        </div>
                    }
                </div>
            </Paper >
        }
    </>
}

export default PostDetails
