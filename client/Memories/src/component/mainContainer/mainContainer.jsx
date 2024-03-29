import React, { lazy, useState } from 'react'
import { Container, Grid, AppBar, TextField, Button, CircularProgress } from '@material-ui/core'
import Posts from '../Posts/Posts'
import CreateForm from '../Form/Form'
import makeStyles from './style.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import { useDispatch } from 'react-redux'
import { SearchPostActFun } from '../../actions/Post.js'

const MainContainer = () => {
    const classes = makeStyles()
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])

    const handleAdd = (tag) => {
        setTags((preTags) => [...preTags, tag])
    }

    const handleDelete = (tag) => {
        setTags((preTags) => preTags.filter((item) => item !== tag))
    }

    const handleSubmit = () => {
        if (search.trim() || tags.length !== 0) {
            setLoading(true);
            dispatch(SearchPostActFun({ postTitle: search, tags }))
            setTags([])
            setSearch("")
        } else {
            navigation('/')
        }
    }

    return (
        <div>
            <Container style={{ margin: '0', maxWidth: "100%" }}>
                <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={9}>
                        <Posts loading={loading} setLoadingForSeachPost={setLoading} />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={3} md={12}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField name='search' variant='standard' label='Search Memories' fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.keyCode === 13 && handleSubmit()} />
                            <ChipInput style={{ margin: '10px 0 ' }} variant='standard' color='primary' onAdd={handleAdd} onDelete={handleDelete} value={tags} label='Search Tag' />
                            <Button className={classes.submitButton} variant='contained' onClick={handleSubmit} color='primary'>Search</Button>
                        </AppBar>
                        <CreateForm></CreateForm>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default MainContainer
