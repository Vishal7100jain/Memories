import { Container, Grid, Grow } from '@material-ui/core'
import React from 'react'
import Posts from '../Posts/Posts'
import CreateForm from '../Form/Form'
import makeStyles from './style'
const MainContainer = () => {
    const classes = makeStyles()
    return (
        <div>
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={8}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <CreateForm></CreateForm>
                        </Grid>
                    </Grid>
                </Container>
            </Grow >
        </div>
    )
}

export default MainContainer

