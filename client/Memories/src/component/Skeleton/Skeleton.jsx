import React from 'react';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        position: 'relative',
    },
    overlay: {
        backgroundColor: '#cccccc',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '8px',
        animation: '$pulse 1.5s infinite',
    },
    details: {
        width: '80%',
        margin: '10px',
        height: '15px',
        backgroundColor: 'black',
        borderRadius: '4px',
    },
    cardActions: {
        justifyContent: 'center',
    },
    '@keyframes pulse': {
        '0%': {
            opacity: .8,
        },
        '50%': {
            opacity: 0.5,
        },
        '100%': {
            opacity: .8,
        },
    },
}));

const Skeleton = () => {
    const classes = useStyles();

    return (
        <div style={{ border: '1px solid #e5e5e5', padding: '16px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
            <Card className={classes.card}>
                <img style={{ height: '100%', width: '100%' }} src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" alt="" />

                <div className={classes.overlay}></div>
                <div className={classes.details} style={{ margin: "10px auto" }}></div>
                <div className={classes.details} style={{ margin: "10px auto" }}>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: '10px' }}>
                    <div className={classes.details} style={{ width: "25%", height: "5vh" }}>
                    </div>
                    <div className={classes.details} style={{ width: "25%", height: "5vh" }}>
                    </div>
                </div>
            </Card >
        </div>
    );
}

export default Skeleton;
