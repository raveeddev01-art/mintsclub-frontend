
import { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography
} from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { getCollectionDetail } from '../../../store/reducers/collectionReducer';
import { useDispatch } from 'react-redux'

function CollectionDetail() {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [collection, setCollection] = useState({})
    const communityLinks = collection?._id ? JSON.parse(collection?.communityLinks) : []


    const nftDetails = async () => {
        let res = await dispatch(getCollectionDetail(id));
        setCollection(res)
    }

    useEffect(() => {
        nftDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container justifyContent='center'>
            <Grid xs={12} item container>
                <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
                    <Typography className={classes.mainHeading}>{'Collection Detail'}</Typography>
                </Grid>
                <Grid xs={12} item container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <p className={classes.heading}>Image</p>
                        <div className={classes.imgContainer}>
                          <img src={collection?.avatar} alt="User" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <p className={classes.heading}>Cover Image</p>
                        <div className={classes.imgContainer}>
                          <img src={collection?.cover} alt="User" />
                        </div>
                    </Grid>

                </Grid>
                <Grid item container xs={12} md={12}>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Name</p>
                        <p className={classes.value}>{collection?.fullName || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Verified</p>
                        <p className={classes.value}>{collection?.isVerified ? 'Verified' : 'Not Verified'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Url</p>
                        <p className={classes.value}>{collection?.url || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>User Name</p>
                        <p className={classes.value}>{collection?.userId?.fullName || 'N/A'}</p>
                    </Grid>

                    {
                        communityLinks?.map(item => <Grid item xs={12} md={6} lg={4}>
                            <p className={classes.heading}>{item?.name}</p>
                            <p className={classes.value}>{item?.value || 'N/A'}</p>
                        </Grid>)
                    }

                    <Grid item xs={12}>
                        <p className={classes.heading}>Description</p>
                        <p className={classes.value}>{collection?.description || 'N/A'}</p>
                    </Grid>

                </Grid>
            </Grid>


        </Grid>

    );
}

export default CollectionDetail;


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

        "& img": {
            maxWidth: 250,
            borderRadius: 7,
        },
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