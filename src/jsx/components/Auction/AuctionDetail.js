
import { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography
} from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getAuctionDetails } from '../../../store/reducers/auctionsReducer';

function AuctionDetail() {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [auction, setAuction] = useState({})


    const auctionDetails = async () => {
        let res = await dispatch(getAuctionDetails(id));
        setAuction(res)
    }

    useEffect(() => {
        auctionDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container justifyContent='center'>
            <Grid xs={12} item container>
                <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
                    <Typography className={classes.mainHeading}>{'Auction Detail'}</Typography>
                </Grid>
                
                <Grid item container xs={12} md={12}>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Auction Type</p>
                        <p className={classes.value}>{auction?.auctionType || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>status</p>
                        <p className={classes.value}>{auction?.status}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Blockchain Type</p>
                        <p className={classes.value}>{auction?.blockchainType || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Royalty Fee</p>
                        <p className={classes.value}>{auction?.royaltyFee || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>{auction?.auctionType === 'fractional' ? 'Block price' :  `Auction price`}</p>
                        <p className={classes.value}>{auction?.auctionType === 'fractional' ? auction?.perBlockPrice : (auction.auctionPrice || 0)}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Multiple Commercial Purposes</p>
                        <p className={classes.value}>{auction?.physicalReproduction?.MultipleCommercialPurposes ? 'True' : 'False'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Commercial Purpose</p>
                        <p className={classes.value}>{auction?.physicalReproduction?.oneCommercialPurposes ? 'True' : 'False'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>No Reproduction</p>
                        <p className={classes.value}>{auction?.physicalReproduction?.noReproduction ? 'True' : 'False'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Private Purposes</p>
                        <p className={classes.value}>{auction?.physicalReproduction?.privatePurposes ? 'True' : 'False'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>View Count</p>
                        <p className={classes.value}>{auction?.viewCount || 0}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                        <p className={classes.heading}>Mint</p>
                        <p className={classes.value}>{auction?.mint || 'N/A'}</p>
                    </Grid>

                    

                </Grid>
            </Grid>


        </Grid>

    );
}

export default AuctionDetail;


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