
import { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography
} from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getPaymentDetail } from '../../../store/reducers/paymentReducer';

function TaxPaymentDetail() {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [taxPayment, setTaxPaymentDetail] = useState({})


    const taxPaymentDetails = async () => {
        let res = await dispatch(getPaymentDetail(id));
        setTaxPaymentDetail(res)
    }

    useEffect(() => {
        taxPaymentDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container justifyContent='center'>
            <Grid xs={12} item container>
                <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
                    <Typography className={classes.mainHeading}>{'Tax Payment Detail'}</Typography>
                </Grid>
                
                <Grid item container xs={12} md={12}>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Amount</p>
                        <p className={classes.value}>{taxPayment?.amount || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>User</p>
                        <p className={classes.value}>{taxPayment?.userId?.fullName || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Chat with User</p>
                        <p className={classes.value}>{taxPayment?.chatWithUserId?.fullName || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Payment Currency</p>
                        <p className={classes.value}>{taxPayment?.paymentCurrency || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Payment Type</p>
                        <p className={classes.value}>{taxPayment?.paymentType || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Nft</p>
                        <p className={classes.value}>{taxPayment?.nftId?.name || 'N/A'}</p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Nft Type</p>
                        <p className={classes.value}>{taxPayment?.nftId?.nftType || 'N/A'}</p>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Nft Artist</p>
                        <p className={classes.value}>{taxPayment?.nftId?.artistName || 'N/A'}</p>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <p className={classes.heading}>Nft Active</p>
                        <p className={classes.value}>{taxPayment?.nftId?.isActive ? 'Active' : 'Not Active'}</p>
                    </Grid>

                    <Grid item xs={12}>
                        <p className={classes.heading}>Transaction Signature</p>
                        <p className={classes.valueBreak}>{taxPayment?.transactionSignature || 'N/A'}</p>
                    </Grid>

                </Grid>
            </Grid>


        </Grid>

    );
}

export default TaxPaymentDetail;


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