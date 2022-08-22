export interface AuctionCardInterface {
    ownerName:string,
    userId:string,
    bidsProfile:any[],
    item:any,
    cardBg:string,
    key:number,
    connectedAddress:string,
}
export interface BannerInterface {
    subHeading:string,
    heading:string,
    content:string,
    bgImg:string,
    bannerImg:string,
}
export interface TableInterface {
    titles:any[],
    data:any[],
    lowestNftPrice:number,
    exchangeRate:number,
    status:string,
}
export interface AudioInterface {
    src:string,
    onLoadCallback:()=>{},
    loader:boolean,
    fileType:string,
}

export interface CardSliderInt {
    data:any[],
    homeAuctions:any[],
    settings:any
}
export interface NFTCardInt {
    data:any,
    owner:any,
    likedNfts:any[],
    path:string,
    connectedAddress:string,
    handleLikesTogleApi:(_id:string,status:string,likeCount:any)=>{}
}
export interface ApprovalModalInt {
    approvalStatus:string,
    approveAccount:()=>{},
    show:boolean,
    onHide:()=>{},
    address:string,
}
export interface BidModalInt {
    onChange:(e:any)=>{},
    decimalNumberValidator:(e:any)=>any,
    handleModalSubmit:()=>{},
    calculatePricePercantage:()=>any,
    onHide:()=>{},
    balance:any,
    price:any,
    show:boolean,
}
export interface Buy {
    name:string,
    image:string,
    price:any,
    exchangeRate:number,
    tokenId:any,
    buyNow:()=>any,
    confirmed:any,
    transactionHash:string,
    transactionSuccess:string,
    onHide:()=>any
    disabled:boolean,
    balance:number,
    fileType:string,
}
export interface Levels {
    show:boolean,
    onHide:()=>any,
    levels:any[],
    addMoreValues:(status:string)=>any,
    handleChange:(i:number,e:any,status:string)=>any,
    removeFormFields:(i:number,status:string)=>any,
    onSave:(status:string)=>any
}

export interface BreadcrumbInt {
    title1:any,
    title2:any,
    title3:any,
    title1Handler:()=>any
}