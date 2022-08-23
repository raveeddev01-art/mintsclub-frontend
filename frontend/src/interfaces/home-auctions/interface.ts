export interface HomeAuction{
    getLiveAuctions:(qs:any)=>void,
    beforeAuction:()=>void,
    getCreators:()=>void,
    auction:any,
    getCategories:()=>void,
    collectionFlag:boolean,
    categories:Array<object>,
}