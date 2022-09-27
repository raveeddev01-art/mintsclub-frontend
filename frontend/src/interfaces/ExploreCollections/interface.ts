export interface ExploreCollectionInt {
  getCategories: () => void;
  collection: any;
  mycollections: any;
  beforeCategory: () => void;
  getCollections: (qs: any | null) => void;
  beforeCollection: () => void;
  setLoader?: any;
  userId: string;
  popular: boolean;
  all?: boolean;
  connectedAddress: string;
}
