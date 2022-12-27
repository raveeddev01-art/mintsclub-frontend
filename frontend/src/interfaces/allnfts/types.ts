export type Location = {
	state?: string;
};

type NFT_DETAILS = {
	fileType: string;
	image: string;
};

export type POPULAR_COLLECTION = {
	TotalNfts: number;
	banner: string;
	blockchainType: string;
	categoryId: string;
	description: string;
	featuredImg: string;
	likesCount: any[];
	logo: string;
	name: string;
	nftDetail: NFT_DETAILS[];
	ownerAddress: string;
	profileImage: any[];
	soldCopies: number[];
	userId: string;
	username: string[];
	_id: string;
};
