
import { useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography
} from "@material-ui/core";
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';

function BlogDetail() {
    const classes = useStyles();
    const history = useHistory();
    const { state } = useLocation();


    useEffect(() => {
        !(state?._id) && history.push('/blogs-listing')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container justifyContent='center'>
            <Grid xs={12} item container>
                <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
                    <Typography className={classes.mainHeading}>{'Blog Detail'}</Typography>
                </Grid>
                <Grid xs={12} item container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <p className={classes.heading}>Image</p>
                        <div className={classes.imgContainer} style={{ backgroundImage: `url(${state?.image})` }} />
                    </Grid>
                </Grid>
                <Grid item container xs={12} md={12}>
                    <Grid item xs={12}>
                        <p className={classes.heading}>Heading</p>
                        <p className={classes.value}>{state?.heading || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12}>
                        <p className={classes.heading}>Dated: </p>
                        <p className={classes.value}>{moment(state?.date).format('DD-MM-YYYY') || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12}>
                        <p className={classes.heading}>Description</p>
                        <p className={classes.value} dangerouslySetInnerHTML={{ __html: state?.description }} />

                        {/* <p className={classes.value}>{state?.description || 'N/A'}</p> */}
                    </Grid>

                </Grid>
            </Grid>


        </Grid>

    );
}

export default BlogDetail;


const useStyles = makeStyles((theme) => ({
    imgContainer: {
        width: '100%',
        minHeight: 250,
        maxHeight: 400,
        backgroundPosition: 'center',
        marginBottom: '20px',
        marginTop: 15,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#a9a9a9',
        borderRadius: 7,
    },
    progress: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300
    },
    heading: {
        fontSize: 16,
        fontWeight: 'normal',
        margin: 0,
        paddingTop: '20px',
        color: '#969090'

    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: '5px 0px 0px 0px'
    },
    valueBreak: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: '5px 0px 0px 0px',
        wordBreak: 'break-word'
    },
    hideScrollBar: {
        flexWrap: "unset",
        overflowX: "scroll",
        "&::-webkit-scrollbar": {
            display: "none",
        },
    },
    addSpeakerContainer: {
        paddingTop: 25
    },
    colorDiv: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
    },
    colorContainer: {
        margin: '5px 0px 0px 0px',
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
    },
    mainHeading: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "24px",
        lineHeight: "28px",
        color: '#000',
        paddingBottom: '30px'
    },
}));