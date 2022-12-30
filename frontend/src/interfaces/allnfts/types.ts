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

type COLLECTION = {
	_id: string;
	name: string;
	logo: string;
	banner: string;
};

type PROCESSED_FILES = {
	total: number;
};

export type PENDING_BATCH = {
	message: string;
	blockchainType: string;
	categoryId: string;
	collectionId: COLLECTION;
	createdAt: string;
	fileName: string;
	processedFiles: PROCESSED_FILES;
	status: string;
	updatedAt: string;
	userId: string;
};

export type STATUS_TYPE = {
	completed: string;
	pending: string;
	processing: string;
	failed: string;
};
