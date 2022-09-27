export interface PopularCollectionInt {
  getPopularCollections: (qs: any) => void;
  getCategories: () => void;
  category: any;
  getPopularAuth: boolean;
  beforePopularCollection: () => void;
  connectedAddress: string;
  popularCollections: any;
}
