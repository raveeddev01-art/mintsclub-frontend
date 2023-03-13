import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../../store/reducers/userReducer";
import { getUserNft } from "../../../store/reducers/nftReducer";
import NftListingTable from "../listingTable/NftListingTable";

function UserDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [filer, setFilter] = useState({});
  const [userNft, setUserNft] = useState([]);

  const userDetails = async () => {
    const res = await dispatch(getUserDetails(id));
    const userNft = await dispatch(getUserNft(id, filer));
    setUser(res);
    setUserNft(userNft.docs);
  };

  useEffect(() => {
    userDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid xs={12} item container>
        <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
          <Typography className={classes.mainHeading}>
            {"User Detail"}
          </Typography>
        </Grid>
        <Grid xs={12} item container spacing={2}>
          <Grid item xs={12} md={6}>
            <p className={classes.heading}>Image</p>

            <div className={classes.imgContainer}>
              <img src={user?.avatar} alt="User" />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <p className={classes.heading}>Cover Image</p>
            <div className={classes.imgContainer}>
              <img src={user?.cover} alt="Cover" />
            </div>
          </Grid>
        </Grid>
        <Grid item container xs={12} md={12}>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Name</p>
            <p className={classes.value}>{user?.fullName || "N/A"}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Verified</p>
            <p className={classes.value}>
              {user?.isVerified ? "Verified" : "Not Verified"}
            </p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Blocked</p>
            <p className={classes.value}>{user?.isBlocked ? "YES" : "NO"}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Url</p>
            <p className={classes.value}>{user?.url || "N/A"}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Ip Address</p>
            <p className={classes.value}>{user?.ipAddress || "N/A"}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <p className={classes.heading}>Wallet Address</p>
            <p className={classes.valueBreak}>{user?.walletAddress || "N/A"}</p>
          </Grid>

          <Grid item xs={12}>
            <p className={classes.heading}>Description</p>
            <p className={classes.value}>{user?.description || "N/A"}</p>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
          <Typography className={classes.mainHeading}>
            {"Wallet Details"}
          </Typography>
          {userNft && (
            <NftListingTable
              page={1}
              limit={userNft?.length}
              tabledata={userNft}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserDetail;

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    width: "100%",
    minHeight: 250,
    maxHeight: 400,
    backgroundPosition: "center",
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
    padding: "0px 10px 0px 0px",
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
