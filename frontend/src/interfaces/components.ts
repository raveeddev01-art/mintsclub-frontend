export interface AuctionCardInterface {
    ownerName:string,
    userId:string,
    bidsProfile:any[],
    item:any,
    cardBg?:string,
    key:number,
    connectedAddress:string,
    ownerId?:string,
    index?:number
}
export interface BannerInterface {
    subHeading?:string,
    heading?:string,
    content?:string,
    bgImg?:string,
    bannerImg?:string,
}
export interface TableInterface {
  titles: any[];
  data: any[];
  lowestNftPrice: number;
  exchangeRate: number;
  status: string;
}
export interface AudioInterface {
  src: string;
  onLoadCallback: () => {};
  loader: boolean;
  fileType: string;
}

export interface CardSliderInt {
  data: any[];
  homeAuctions: any[];
  settings: any;
}
export interface NFTCardInt {
    data:any,
    owner:any,
    likedNfts:any[]|null,
    index:number,
    path:string,
    connectedAddress:string,
    handleLikesTogleApi:(_id:string,status:string,likeCount:any)=>{}
}
export interface ApprovalModalInt {
  approvalStatus: string;
  approveAccount: () => {};
  show: boolean;
  onHide: () => {};
  address: string;
}
export interface BidModalInt {
  onChange: (e: any) => {};
  decimalNumberValidator: (e: any) => any;
  handleModalSubmit: () => {};
  calculatePricePercantage: () => any;
  onHide: () => {};
  balance: any;
  price: any;
  show: boolean;
}
export interface Buy {
  name: string;
  image: string;
  price: any;
  exchangeRate: number;
  tokenId: any;
  buyNow: () => any;
  confirmed: any;
  transactionHash: string;
  transactionSuccess: string;
  onHide: () => any;
  disabled: boolean;
  balance: number;
  fileType: string;
}
export interface Levels {
  show: boolean;
  onHide: () => any;
  levels: any[];
  addMoreValues: (status: string) => any;
  handleChange: (i: number, e: any, status: string) => any;
  removeFormFields: (i: number, status: string) => any;
  onSave: (status: string) => any;
}

export interface BreadcrumbInt {
  title1: any;
  title2: any;
  title3: any;
  title1Handler: () => any;
}

export interface PropertiesInt {
  show: boolean;
  onHide: () => any;
  addMoreValues: (status: string) => any;
  handleChange: (i: any, e: any, status: string) => any;
  removeFormFields: (i: any, status: string) => any;
  properties: any[];
  onSave: (status: string) => any;
}

export interface StatsInt {
  show: boolean;
  onHide: () => any;
  addMoreValues: (status: string) => any;
  handleChange: (i: any, e: any, status: string) => any;
  removeFormFields: (i: any, status: string) => any;
  onSave: (status: string) => any;
  stats: any[];
}
export interface AuctionAudioInt {
    src:string,
    onLoadCallback:()=>any,
    loader:boolean
}

export interface CollectionCardInt {
  CardImg: string;
  Subimg1: string;
  Subimg2: string;
  Subimg3: string;
  name: string;
  id: string;
  collection: any;
  userName: string;
  NFTCount: number;
  profileImage: string;
  ownerAddress?: string;
  connectedAddress?: string;
}

export interface HeroInt {
  getLiveAuctions: (qs: any) => any;
  beforeAuction: () => any;
  auction: any;
}
export interface HeroCardInt {
  data: any;
  connectedAddress: string;
  status: string;
}
export interface footerInt {
    subscribeAuth:boolean,
    error:any,
    emptyError:()=>any,
    beforeFooter:()=>any,
    subscribeUser:(email:any)=>any,

}


export interface listingInt {
    collections?:any[],
    disabled?:boolean,
    menuData?:any[]|undefined,
    handleNftFilter?:(item?:any)=>any|undefined,
    setMenuFilter?:(item:any)=>any|undefined,
    filterationLoader:boolean,
    setFilterationLoader:(item:any)=>any,
    nfts:any[],
    loader:boolean,
    likedNfts:any[]|null,
    nftPagination:any,
    handleLikesTogleApi:(_id:string,status:string,likeCount:any)=>any,
    fetchData:(filter:any)=>any,
    path:string,
    getPaginatedData?:()=>any,
    UserProfile?:any|undefined,
    initialKeyword?:any,
    collectionDetail?:any,
    totalItems?:any
}
