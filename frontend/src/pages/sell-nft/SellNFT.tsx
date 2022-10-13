import React, { useState, useEffect, useContext } from "react";
import "./SellNFT.scss";
import { ENV } from "../../config/config";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { decimalNumberValidator } from "../../utils/functions";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  openNFTForBidding,
  putonsale,
  setApprovalForAll,
  validateNetwork,
  createVoucher,
} from "../../utils/web3";
import { toast } from "react-toastify";
import FullPageLoader from "../../Components/FullPageLoader/FullPageLoader";
import useVideoPlayer from "../../Components/TestVideoCard/Components/UseVideoPlayer";
import ApprovalModal from "../../Components/Modals/ApprovalModal/ApprovalModal";
import Banner from "../../Components/Banner/Banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg.png";
import OwnCollectionToday from "../../Components/OwnCollectionToday/OwnCollectionToday";
import { useHistory } from "react-router";
import { sellNFTBanner } from "../../utils/exportData";
import { useGetNFTbyId } from "../../hooks/AllNFTs";
import { useInsertData, useEditData } from "../../hooks/Common";
import errorHandler from "../../context/errorHandler/ErrorHandlerContext";
import FileView from "./components/FileView";
import NFTDetail from "./components/NFTDetail";
import FixedPriceListing from "./components/FixedPriceListing";
import AuctionListing from "./components/AuctionListing";
import Buttons from "./components/Buttons";
const { dateRangeInitialSettings } = ENV;
const SellNFT = (props: any) => {
  const [activeBtn, setActiveBtn] = useState<any>(0);
  const [sellingMethod, setSellingMethod] = useState<number>(1); // 1 = Fixed Price, 2 = Timed Auction
  const [fixedPriceConfig, setFixedPriceConfig] = useState<any>({
    price: {
      currency: ENV.currency,
      amount: "",
    },
  });
  const [timedAuctionConfig, setTimedAuctionConfig] = useState<any>({
    startPrice: {
      currency: ENV.currency,
      amount: "",
    },
    duration: {
      startDate: moment(),
      endDate: moment().add(6, "months"),
      startTime: moment(new Date()).format("HH:mm"),
      endTime: "23:59",
    },
  });

  const [nftDetail, setNftDetail] = useState<any>("");
  const [loader, setLoader] = useState<boolean>(true); // NFT loader
  const location: any = useLocation();
  const [copies, setCopies] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [approvalStatus, setApprovalStatus] = useState<string>("not-approved");
  const [address, setAddress] = useState<string>(props.connectedAddress);
  const [copiesError, setCopiesError] = useState<boolean>(false);
  const [contentLoader, setContentLoader] = useState<boolean>(true);
  const { setError } = useContext(errorHandler);
  const history = useHistory();
  let nftId = props.match.params.id;

  const videoElement = React.useRef(null);
  const { playerState, togglePlay } = useVideoPlayer(videoElement);
  //Get NFT
  const onSuccessNFT = (data: any) => {
    if (data.data.success) {
      if (copies === "") {
        setLoader(false);
        setNftDetail(data?.data?.data);
      }
    } else {
      setError(data.data.message);
    }
  };
  const { isLoading: isLoadingNFT } = useGetNFTbyId(nftId, onSuccessNFT);

  //Create Activity
  const onInsertData = () => {};
  const { mutate: insertActivity } = useInsertData(
    "activity/create",
    onInsertData
  );

  const { isLoading: isInsertingAuction, mutate: insertAuction } =
    useInsertData("auctions/create", () => {
      toast.success("Auction created successfully");
      history.push(`/userprofile`);
    });

	//Edit Profile

  const { mutate: updateProfile } = useEditData(
    "users/updateProfile",
    () => console.log(),
    () => console.log()
  );

  useEffect(() => {
    if (address === "") {
      setAddress(props.connectedAddress);
    }
    if (
      props.connectedAddress !== "" &&
      address !== "" &&
      ENV.getUserKeys("address")?.address?.toUpperCase() !==
        props.connectedAddress.toUpperCase()
    ) {
      toast.info("Please login with new connected account");
      return history.push({
        pathname: `/connect-wallet`,
        state: `/sellnft`,
      });
    }
  }, [props.connectedAddress]);

	const onChange = (e: any) => {
		const { name, value } = e.target;

		let data = null;

		if (sellingMethod === 1) {
			data = fixedPriceConfig;
		} else {
			data = timedAuctionConfig;
		}

    const keys = name.split(".");

		if (keys && keys[2]) {
			data[keys[1]][keys[2]] = value;
		} else if (keys && keys[1]) data[keys[1]] = value;

    if (sellingMethod === 1) {
      setFixedPriceConfig({ ...data });
    } else {
      setTimedAuctionConfig({ ...data });
    }
  };
  //onSubmit
  const submit = async (e: any) => {
    e.preventDefault();
    if (copies > nftDetail.copies) {
      if (Number(nftDetail.copies) === 1) {
        toast.info(`Copies should be equal to ${nftDetail.copies}`);
      } else {
        toast.info(
          `Copies should be less than or equal to ${nftDetail.copies}`
        );
      }
      return "";
    }
    if (await validateNetwork()) {
      if (!nftDetail?.user?.isApproved) {
        setShow(true);
        return "";
      }

      let price: any = "";
      let payload: object = {};

			const timedConfig = { ...timedAuctionConfig };

			const fixedConfig = { ...fixedPriceConfig };
			const { _id, ownerId } = nftDetail;

      let activityPayload = {
        nftId: _id,
        ownerId,
        fromAddress: props.connectedAddress,
        activityType: "List",
      };

      if (sellingMethod === 2) {
        if (Number(timedConfig.startPrice.amount) === 0) {
          toast.error("Price should be greater then 0");
          return "";
        }
        let timedAuctionStartTime = new Date(timedConfig.duration.startDate);
        let timedAuctionEndTime = new Date(timedConfig.duration.endDate);
        //calculate end time
        timedConfig.duration.endDate = calclateStartOrEndTime(
          timedAuctionEndTime,
          timedConfig.duration.endTime
        );

				//calculate start time
				timedConfig.duration.startDate = calclateStartOrEndTime(
					timedAuctionStartTime,
					timedConfig.duration.startTime
				);

        //Deleting unused data from payload
        let auctionConfig = timedConfig;
        delete auctionConfig.duration.startTime;
        delete auctionConfig.duration.endTime;
        delete auctionConfig.method;
        price = Number(auctionConfig.startPrice.amount);
        auctionConfig.startPrice.amount = Number(
          auctionConfig.startPrice.amount
        );
        payload = {
          nftId: location.state._id,
          userId: ENV.getUserKeys("_id")._id,
          sellingMethod,
          sellingConfig: JSON.stringify(auctionConfig),
          copiesForAuction: copies,
        };
      } else {
        price = Number(fixedConfig.price.amount);
        if (price === 0) {
          toast.error("Price should be greater then 0");
          return "";
        }
        payload = {
          nftId: location.state._id,
          sellingMethod,
          sellingConfig: JSON.stringify(fixedConfig),
          copiesForAuction: copies,
        };
      }

			setLoader(true);

      if (sellingMethod === 2) {
        openBidding(timedAuctionConfig, payload, activityPayload, price);
      } else {
        openForSale(activityPayload, payload, fixedConfig, price);
      }
    } else {
      toast.error("Please Connect Your Metamask With Ethereum Goerli Network");
    }
  };

	//Open for Bidding/Auction

	const openBidding = async (
		timedAuctionConfig: any,
		payload: any,
		activityPayload: any,
		price: any
	) => {
		const formData = new FormData();
		try {
			const auctionEndDate = timedAuctionConfig.duration.endDate;
			const auctionStartDate = timedAuctionConfig.duration.startDate;

			const biddingTime = new Date(auctionEndDate).getTime();
			const startTime = new Date(auctionStartDate).getTime();

			const result = await openNFTForBidding(
				biddingTime,
				startTime,
				nftDetail?.tokenId,
				copies
			);
			if (result) {
				activityPayload.price = price;
				payload.sellId = Number(result);
				for (const key in payload) formData.append(key, payload[key]);
				insertActivity(activityPayload);
				insertAuction(payload);
			}
		} catch (err: any) {
			setLoader(false);
			toast.error(err);
		}
	};
	//Open for fixed price
	const openForSale = async (
		activityPayload: any,
		payload: any,
		fixedConfig: any,
		price: any
	) => {
		const formData = new FormData();
		try {
			let res = null;
			if (nftDetail?.lazyMinted) {
				res = await createVoucher(
					nftDetail.tokenId,
					copies,
					nftDetail.metaData,
					price
				);
				if (!res.success) {
					setLoader(false);
					toast.error(res.data.message);
					return false;
				}
			} else {
				res = await putonsale(
					nftDetail.tokenId,
					copies,
					fixedConfig.price.amount
				);
			}

      if (res) {
        activityPayload.price = price;
        payload.sellId = Number(nftDetail.lazyMinted ? nftDetail.tokenId : res);
        if (nftDetail.lazyMinted) {
          payload.signature = res.data;
        }
        for (const key in payload) formData.append(key, payload[key]);
        insertActivity(activityPayload);
        insertAuction(formData);
      }
    } catch (err: any) {
      console.log(err, "error");
      setLoader(false);
      toast.error(err);
    }
  };
  const calclateStartOrEndTime = (auctionConfig: any, startOrEndTime: any) => {
    let time = auctionConfig.toString();
    time = time.slice(0, 15) + " " + startOrEndTime + ":00" + time.slice(24);
    return time;
  };
  const handleDateChange = (e: any, picker: any) => {
    const { name } = e.target;
    const { startDate, endDate } = picker;

		// set start date
		onChange({
			target: {
				name: `${name}.startDate`,
				value: startDate,
			},
		});

		// set end date
		onChange({
			target: {
				name: `${name}.endDate`,
				value: endDate,
			},
		});
	};

	//Approve account

  const approveAccount = async () => {
    setApprovalStatus("pending");
    var formData: any = new FormData();
    formData.append("isApproved", true);
    formData.append("userId", nftDetail.user._id);
    try {
      let accApproved = await setApprovalForAll(setApprovalStatus);
      if (accApproved) {
        let updatedNFTDetail = { ...nftDetail };
        updatedNFTDetail.user.isApproved = true;
        setNftDetail(updatedNFTDetail);
        updateProfile(formData);
        setApprovalStatus("approved");
        toast.success("Your Account is Approved!.");
        return "";
      }
    } catch (err) {
      setApprovalStatus("not-approved");
      return "";
    }
  };

  const { image, name, description, remainingCopies, fileType } = nftDetail;
  return (
    <>
      <Banner
        subHeading={sellNFTBanner.subHeading}
        heading={sellNFTBanner.heading}
        content={sellNFTBanner.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />
      {isLoadingNFT || isInsertingAuction || (loader && <FullPageLoader />)}
      <section className="padding-wrapper sell-nft new-nft-detail ">
        <div className="container">
          <div className="row g-4 g-xl-5">
            <div className="col-12">
              <div className="row g-4">
                <FileView
                  info={{
                    fileType,
                    contentLoader,
                    image,
                    setContentLoader,
                    videoElement,
                    togglePlay,
                    playerState,
                  }}
                />
                <NFTDetail
                  info={{ name, remainingCopies, nftDetail, description }}
                />
              </div>
            </div>
            <Buttons
              data={{
                activeBtn,
                setActiveBtn,
                setSellingMethod,
                setCopies,
                setCopiesError,
                nftDetail,
              }}
            />
            {activeBtn === 0 ? (
              <FixedPriceListing
                data={{
                  submit,
                  onChange,
                  decimalNumberValidator,
                  fixedPriceConfig,
                  copiesError,
                  remainingCopies,
                  setCopiesError,
                  copies,
                  setCopies,
                }}
              />
            ) : (
              <AuctionListing
                data={{
                  submit,
                  onChange,
                  decimalNumberValidator,
                  timedAuctionConfig,
                  remainingCopies,
                  copiesError,
                  nftDetail,
                  setCopiesError,
                  copies,
                  setCopies,
                  dateRangeInitialSettings,
                  handleDateChange,
                }}
              />
            )}
          </div>
        </div>
        <ApprovalModal
          show={show}
          approveAccount={approveAccount}
          approvalStatus={approvalStatus}
          onHide={async () => setShow(false)}
          address={props.connectedAddress}
        />
      </section>
      <OwnCollectionToday />
    </>
  );
};

const mapStateToProps = (state: any) => ({
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(SellNFT);
