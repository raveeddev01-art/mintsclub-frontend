
import { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography
} from "@material-ui/core";
import { useDispatch } from 'react-redux'
import {  useParams } from 'react-router-dom';
import { getSwappingDetails } from '../../../store/reducers/swappingRevenueReducer';

function SwappingDetail() {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch()

    const [swapping, setSwapping] = useState({})


    const swappingDetails = async () => {
        let res = await dispatch(getSwappingDetails(id));
        setSwapping(res)
    }

    useEffect(() => {
        swappingDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container justifyContent='center'>
            <Grid xs={12} item container>
                <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
                    <Typography className={classes.mainHeading}>{'Swapping Detail'}</Typography>
                </Grid>
                
                <Grid item container xs={12} md={12}>
                    
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>User</p>
                        <p className={classes.valueBreak}>{swapping?.userId?.fullName || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Blockchain</p>
                        <p className={classes.value}>{swapping?.blockchain || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Paid Amount</p>
                        <p className={classes.valueBreak}>{swapping?.paidAmount || 0}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Paid Currency</p>
                        <p className={classes.value}>{swapping?.paidCurrency || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Send Amount</p>
                        <p className={classes.value}>{swapping?.sendAmount || 0}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Send paidCurrency</p>
                        <p className={classes.value}>{swapping?.sendCurrency || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <p className={classes.heading}>Admin Wallet</p>
                        <p className={classes.valueBreak}>{swapping?.adminWalletAddress || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <p className={classes.heading}>User Wallet</p>
                        <p className={classes.valueBreak}>{swapping?.userWalletAddress || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <p className={classes.heading}>Txn Hash Paid</p>
                        <p className={classes.valueBreak}>{swapping?.txnHashPaidAmount || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <p className={classes.heading}>Txn Hash Send</p>
                        <p className={classes.valueBreak}>{swapping?.txnHashSendAmount || 'N/A'}</p>
                    </Grid>

                </Grid>
            </Grid>


        </Grid>

    );
}

export default SwappingDetail;


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
        wordBreak: 'break-word',
        padding: '0px 10px 0px 0px'
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