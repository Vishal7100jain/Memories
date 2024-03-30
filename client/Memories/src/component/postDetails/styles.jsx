import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '100%',
        height: '400px',
        maxHeight: '600px',
    },
    card: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
    },
    section: {
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
        padding: '10px'
    },
    imageSection: {
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    recommendedPosts: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    loadingPaper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
    },
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flexStart',
        width: '500px',
    },
    commentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10px',
        width: '100%', // Changed to 100%
    },

    commentsInnerContainer: {
        display: "flex",
        flexDirection: "column", // Changed to column
        width: '100%', // Changed to 100%
        height: '80px',
        marginBottom: '20px', // Added a fixed height
        overflow: 'scroll', // Changed from scroll to auto

    },

    commentUser: {
        fontWeight: 'bold',
        marginRight: '5px',
    },

    commentText: {
        marginRight: '5px',
    },
    PostTilte: {
        textDecoration: 'none',
        color: 'black',
    },
    recommendedPostsImg: {
        height: '10vw',
        width: '10vw'
    },
    Link: {
        display: 'grid',
        width: '15vw',
        flexDirection: "row",
        margin: '20px',
        padding: '20px 0',
        cursor: "pointer",
        fontSize: 'large',
        textDecoration: 'none'
    }
}));