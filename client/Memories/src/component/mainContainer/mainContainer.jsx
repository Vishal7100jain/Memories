import { Container, Grid, Grow, AppBar, TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import Posts from '../Posts/Posts'
import CreateForm from '../Form/Form'
import makeStyles from './style.jsx'
import { Paper } from '@material-ui/core'
import Paginate from '../pagination.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import { useDispatch } from 'react-redux'
import { SearchPostActFun } from '../../actions/Post.js'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const MainContainer = () => {
    const query = useQuery()
    const classes = makeStyles()
    const page = query.get('post') || 1
    const navigation = useNavigate()
    const searchQuery = query.get("searchQuery")
    const dispatch = useDispatch()
    let [search, setSearch] = useState("")
    let [tags, setTags] = useState([])

    const handleAdd = (tag) => {
        setTags((preTags) => {
            return preTags = [...preTags, tag]
        })
    }

    const handleDelete = (tag) => {
        setTags((preTags) => {
            return preTags = preTags.filter((item) => item !== tag)
        })
    }

    const handleSubmit = (e) => {
        if (e.keyCode === 13) {
            SearchPost()
        }
    }

    const SearchPost = (e) => {
        if (search.trim() || tags.length != 0) {
            dispatch(SearchPostActFun({ postTitle: search, tags }))
            setTags((pre) => pre = [])
            setSearch((pre) => pre = "")
        } else {
            navigation('/')
        }
    }

    return (
        <div>
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={8}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                                <TextField
                                    name='search'
                                    variant='standard'
                                    label='Search Memories'
                                    fullWidth
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleSubmit}
                                />
                                <ChipInput
                                    style={{ margin: '10px 0 ' }}
                                    variant='standard'
                                    color='primary'
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    value={tags}
                                    label='Search Tag'
                                />
                                <Button className={classes.submitButton} variant='contained' onClick={SearchPost} color='primary'>Search</Button>
                            </AppBar>
                            <CreateForm></CreateForm>
                            <Paper elevation={6}>
                                <Paginate></Paginate>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow >
        </div>
    )
}

export default MainContainer

