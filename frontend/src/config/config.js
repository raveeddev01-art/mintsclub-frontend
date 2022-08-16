require("dotenv").config();
const CryptoJS = require("crypto-js");
const dataEncryptionKey = "kalsaOOLLaASASAFFSSEE";
const moment = require("moment");

export const ENV = {
  // blockchain variables
  mintsClubContractAddress: process.env.REACT_APP_MintsClub_CONTRACT_ADDRESS,
  web3ProviderAddress: process.env.REACT_APP_WEB3_PROVIDER_ADDRESS,
  ariswapContractAddress: process.env.REACT_APP_ARISWAP_CONTRACT_ADDRESS,
  pinataJWT:process.env.REACT_APP_PINATA_JWT,
  // process variables
  url: process.env.REACT_APP_BASE_URL,
  adminUrl: process.env.REACT_APP_ADMIN_BASE_URL,
  // url:"https://v2-mintsclubapi.invo.zone/v1/front/",
  chainId:4,
  assetUrl: process.env.REACT_APP_BASE_URL,
  currency: process.env.REACT_APP_CURRENCY,
  appName: process.env.REACT_APP_NAME,
  requiredChainName: process.env.REACT_APP_REQUIRED_CHAIN_NAME,
  //Social media
  twitterLink: process.env.REACT_APP_TWITTER_LINK,
  discordLink: process.env.REACT_APP_DISCORD_LINK,
  telegramLink: process.env.REACT_APP_TELEGRAM_LINK,
  redditLink: process.env.REACT_APP_REDDIT_LINK,
  // tawkto
  tawkToPropertyId: process.env.REACT_APP_TAWK_TO_PROPERTY_ID,
  tawkToKey: process.env.REACT_APP_TAWK_TO_KEY,
  gaTrackerId:process.env.REACT_APP_GATRACKER_ID,
  currencies: [
    {
      name: "Ethereum",
      symbol: "ETH",
      icon: "/img/ethereum.svg",
    },
  ],
  serviceFee: 2.5,

  // Headers
  Authorization: `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
  x_auth_token: process.env.REACT_APP_X_AUTH_TOKEN,

  // default images placeholders
  globalPlaceholderImage: "/img/placeholder.png",
  collectionFeaturedImg: "https://via.placeholder.com/600x450/8e8e8e/ccc.png",
  userDefaultImg: "https://via.placeholder.com/600x600/8e8e8e/ccc.png",
  categoryDefaultImg: "https://via.placeholder.com/600x450/8e8e8e/ccc.png",

  //set user in local storage
  encryptUserData: function (data) {
    let userData = localStorage.getItem("encuse");
    if (userData && !data.accessToken) {
      let bytes = CryptoJS.AES.decrypt(userData, dataEncryptionKey);
      let originalData = bytes.toString(CryptoJS.enc.Utf8);
      originalData = JSON.parse(originalData);
      if (originalData && originalData.accessToken) {
        data.accessToken = originalData.accessToken;
      }
    }
    data = JSON.stringify(data);
    let encryptedUser = CryptoJS.AES.encrypt(
      data,
      dataEncryptionKey
    ).toString();
    localStorage.setItem("encuse", encryptedUser);
    return true;
  },

  //return required keys
  getUserKeys: function (keys = null) {
    let userData = localStorage.getItem("encuse");
    if (userData) {
      var bytes = CryptoJS.AES.decrypt(userData, dataEncryptionKey);
      var originalData = bytes.toString(CryptoJS.enc.Utf8);
      originalData = JSON.parse(originalData);
      let user = {};
      if (keys) {
        keys = keys.split(" ");
        for (let key in keys) {
          let keyV = keys[key];
          user[keyV] = originalData[keyV];
        }
      } else {
        user = originalData;
      }
      return user;
    }
    return {};
  },

  //Object to query string
  objectToQueryString: function (body) {
    const qs = Object.keys(body)
      .map((key) => `${key}=${body[key]}`)
      .join("&");
    return qs;
  },

  //validate image types
  isValidImageType: function (file) {
    if (file && file.type) {
      const acceptableTypes = [
        "image/png",
        "image/x-png",
        "image/jpeg",
        "image/jpg",
      ];
      return acceptableTypes.includes(file.type.toLowerCase());
    }
  },

  //slick configurations
  slickSettings: {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          margin: 15,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
  popularCollectionsSettings: {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 556,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },

  auctionCollectionsSettings: {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 556,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },

  heroSettings: {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  },

  dateRangeInitialSettings: {
    startDate: moment(),
    endDate: moment().add(6, "months").toDate(),
    minDate: moment(),
    maxDate: moment().add(6, "months").toDate(),
    ranges: {
      "1 Day": [moment().toDate(), moment().add(1, "days").toDate()],
      "3 Days": [moment().toDate(), moment().add(3, "days").toDate()],
      "1 Week": [moment().toDate(), moment().add(6, "days").toDate()],
    },
  },

  countDownRenderer: ({ days, hours, minutes, seconds }) => {
    return (
      <div
        className="countdown-container d-flex justify-content-center mx-auto mb-2"
        style={{ width: "85%" }}
      >
        <div className="countdown-wrapper m-1">
          <div className="countdown-heading">D</div>
          <div className="countdown-wrapper-time">{days}</div>
        </div>
        <div className="countdown-wrapper m-1">
          <div className="countdown-heading">H</div>
          <div className="countdown-wrapper-time">{hours}</div>
        </div>
        <div className="countdown-wrapper m-1">
          <div className="countdown-heading">M</div>
          <div className="countdown-wrapper-time">{minutes}</div>
        </div>
        <div className="countdown-wrapper m-1">
          <div className="countdown-heading">S</div>
          <div className="countdown-wrapper-time">{seconds}</div>
        </div>
      </div>
    );
  },
};
