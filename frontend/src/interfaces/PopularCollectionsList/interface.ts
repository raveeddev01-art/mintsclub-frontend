export interface PopularCollectionlistInt {
  getPopularCollections: (qs: any) => void;
  getCategories: () => void;
  category: any;
  getPopularAuth: boolean;
  beforePopularCollection: () => void;
  popularCollections: any;
  userId?: string;
  setLoader?: (state: boolean) => any;
  beforeCategory: () => void;
  popular?: boolean;
  finalCollectionListing: any;
  all: any;
  collection: any;
  connectedAddress: string;
}
