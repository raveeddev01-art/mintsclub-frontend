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