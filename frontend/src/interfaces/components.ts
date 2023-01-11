/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
export interface AuctionCardInterface {
	ownerName: string;
	userId: string;
	bidsProfile: any[];
	item: any;
	cardBg?: string;
	key: number;
	connectedAddress: string;
	ownerId?: string;
	index?: number;
	blockchainType?: string;
}
export interface BannerInterface {
	subHeading?: string;
	heading?: string;
	content?: string;
	createdby?: string;
	bgImg?: string;
	bannerImg?: string;
	bg?: boolean;
	nftDetail?: any;
	btns?: boolean;
	onEdit?: () => void;
	onDelete?: () => void;
}

export interface TableInterface {
	titles: any[];
	data: any[];
	lowestNftPrice: number;
	exchangeRate: number;
	status: string;
	show?: boolean;
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
	data: any;
	owner: any;
	likedNfts: any[] | null;
	index?: number;
	path: string;
	connectedAddress: string;
}
export interface ApprovalModalInt {
	approvalStatus: string;
	approveAccount: () => {};
	show: boolean;
	onHide: () => {};
	address: string;
}
export interface BidModalInt {
	onChange: (e: any) => any;
	decimalnumbervalidator: (e: any) => any;
	handlemodalsubmit: () => {};
	calculatepricepercantage: () => any;
	onHide: () => {};
	balance: any;
	blockchaintype: string;
	price: any;
	show: boolean;
}
export interface Buy {
	blockchainType: string;
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
	show: boolean;
	modal: number;
	setModal: any;
}
export interface Levels {
	show: boolean;
	levels: any[];
	nftInfo: any;
	handlers: any;
}

export interface BreadcrumbInt {
	title1?: any;
	title2?: any;
	title3?: any;
	title1Handler?: () => any;
}

export interface PropertiesInt {
	show: boolean;
	properties: any[];
	nftInfo: any;
	handlers: any;
}

export interface StatsInt {
	show: boolean;
	stats: any[];
	nftInfo: any;
	handlers: any;
}
export interface AuctionAudioInt {
	src: string;
	onLoadCallback: () => any;
	onClick: () => any;
	loader: boolean;
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
	userId?: string;
	blockchainType: string;
}

export interface HeroInt {
	getLiveAuctions?: (qs: any) => any;
	beforeAuction?: () => any;
	auction: any;
}
export interface HeroCardInt {
	data: any;
	connectedAddress: string;
	status: string;
}
export interface footerInt {}

export interface listingInt {
	collections?: any[];
	disabled?: boolean;
	menuData?: any[] | undefined;
	handleNftFilter?: (item?: any) => any | undefined;
	setMenuFilter?: (item: any) => any | undefined;
	filterationLoader: boolean;
	setFilterationLoader: (item: any) => any;
	nfts: any[];
	loader: boolean;
	statusData?: any;
	likedNfts: any[] | null;
	nftPagination: any;
	fetchData: (filter: any) => any;
	path: string;
	getPaginatedData?: () => any;
	UserProfile?: any | undefined;
	initialKeyword?: any;
	collectionDetail?: any;
	totalItems?: any;
	refetchNFTs?: () => any;
	setNfts?: any;
}

export interface CollectionSubLoaderInt {
	image: string;
}

export interface VideoCardInterface {
	CardImg: string;
	handleLikesTogleApi: (_id: string, status: string, likeCount: any) => any;
	id: string;
	name: string;
	price: any;
	likesCount: number;
	likedNfts: any;
	ownerId: string;
	sellingMethod: any;
	userProfile: string;
	auctionStartDate: Date;
	auctionEndDate: Date;
	copies: any;
	remainingCopies: any;
	ownerName: string;
	blockchainType: string;
}
export interface LevelsInfoInterface {
	name: string;
	value: any;
	i?: any;
	nft?: any;
	handlers?: any;
	index: number;
}

export interface PropertiesInfoInterface {
	name: string;
	type: any;
	nft: any;
	handlers: any;
	index: number;
}

export interface StatsInfoInterface {
	name: string;
	value: any;
	nft?: any;
	handlers?: any;
	index: number;
}
export interface UploadInterface {
	Images: any;
	onFileChange: (e?: any, event?: string) => any;
	imageURL: any;
	onDrop: (e: any) => any;
	dragOver: (e: any) => any;
	dragEnter: (e: any) => any;
	dragLeave: (e: any) => any;
	videoURL: any;
	audioSrc: any;
	clearData: any;
}

export interface ConnectWallModal {
	showModal: boolean;
	setShowModal: (e: any) => any;
}

export interface SideNftListInterface {
	showSideList: boolean;
	setShowSideList: (e: any) => any;
}

export interface CreateNftInterface {
	props: any;
	state: any;
	toast: any;
	validator: any;
	capitalize: any;
	handleBtnDisable: any;
	setLoader: any;
	blockchainType: string;
	connectedAddress: string;
	setError: any;
}

export interface CHAINS_INTERFACE {
	ethereum: string;
	solana: string;
	polygon: string;
	binance: string;
	algorand: string;
}
