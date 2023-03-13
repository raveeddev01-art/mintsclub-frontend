import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getNftDetails,
  getNftActivities,
} from "../../../store/reducers/nftReducer";
import NftActivityTable from "../listingTable/NftActivitiesListing";

function NftDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [nft, setNftDetails] = useState({});
  const [nftActivities, setNftActivities] = useState({});

  const nftDetails = async () => {
    const res = await dispatch(getNftDetails(id));
    const nftActivitiesDetails = await dispatch(getNftActivities(id));
    setNftActivities(nftActivitiesDetails);
    setNftDetails(res);
  };

  useEffect(() => {
    nftDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid xs={12} item container>
        <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
          <Typography className={classes.mainHeading}>
            {"Nft Detail"}
          </Typography>
        </Grid>
        <Grid xs={12} item container spacing={2}>
          <Grid item xs={12} md={6}>
            <p className={classes.heading}>Image</p>
            <div className={classes.imgContainer}>
              <img src={nft?.image} alt="NFT" />
            </div>
          </Grid>
        </Grid>
        <Grid item container xs={12} md={12}>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Name</p>
            <p className={classes.value}>{nft?.name || "N/A"}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Artist Name</p>
            <p className={classes.value}>{nft?.artistName || "N/A"}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Asset Url</p>
            <p className={classes.valueBreak}>{nft?.assetUrl}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Blockchain Type</p>
            <p className={classes.value}>{nft?.blockchainType || "N/A"}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Collection</p>
            <p className={classes.value}>
              {nft?.collectionId?.fullName || "N/A"}
            </p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Current Price</p>
            <p className={classes.value}>
              {nft?.currentPrice ||
                nft?.activeAuction?.perBlockPrice ||
                nft?.activeAuction?.auctionPrice ||
                "N/A"}
            </p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Nonce</p>
            <p className={classes.value}>{nft?.editionNonce || "N/A"}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Active</p>
            <p className={classes.value}>
              {nft?.isActive ? "Active" : "No Active"}
            </p>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Mutable</p>
            <p className={classes.value}>
              {nft?.isMutable === 1 ? "True" : "False"}
            </p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Fee Basis Points</p>
            <p className={classes.value}>{nft?.seller_fee_basis_points || 0}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Primary Sale Happened</p>
            <p className={classes.value}>
              {nft?.primarySaleHappened === 1 ? "True" : "False"}
            </p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Mint</p>
            <p className={classes.valueBreak}>{nft?.mint || "N/A"}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>symbol</p>
            <p className={classes.value}>{nft?.symbol || "N/A"}</p>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Key</p>
            <p className={classes.valueBreak}>{nft?.key || "N/A"}</p>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Edition</p>
            <p className={classes.valueBreak}>{nft?.edition || "N/A"}</p>
          </Grid>

          <Grid item xs={12}>
            <p className={classes.heading}>Description</p>
            <p className={classes.value}>{nft?.description || "N/A"}</p>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
        <Typography className={classes.mainHeading}>
          {"Nft Activities"}
        </Typography>
        {nftActivities?.length && (
          <NftActivityTable tabledata={nftActivities} />
        )}
      </Grid>
    </Grid>
  );
}

export default NftDetail;

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    width: "100%",
    minHeight: 250,
    maxHeight: 400,
    backgroundPosition: "left",
    marginBottom: "20px",
    marginTop: 15,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",

    "& img": {
      maxWidth: 250,
      borderRadius: 7,
    },
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  heading: {
    fontSize: 16,
    fontWeight: "normal",
    margin: 0,
    paddingTop: "20px",
    color: "#969090",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    margin: "5px 0px 0px 0px",
  },
  valueBreak: {
    fontSize: 16,
    fontWeight: "bold",
    margin: "5px 0px 0px 0px",
    wordBreak: "break-word",
  },
  hideScrollBar: {
    flexWrap: "unset",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  addSpeakerContainer: {
    paddingTop: 25,
  },
  colorDiv: {
    width: "36px",
    height: "14px",
    borderRadius: "2px",
  },
  colorContainer: {
    margin: "5px 0px 0px 0px",
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
    color: "#000",
    paddingBottom: "30px",
  },
}));
