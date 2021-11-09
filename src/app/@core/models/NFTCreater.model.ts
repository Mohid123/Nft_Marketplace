export interface NFTCreator {
  coverImageURL:       string;
  coverBlurHash:       string;
  profileImageURL:     string;
  profileBlurHash:     string;
  displayName:         string;
  description:         string;
  appPackageId:        string;
  availableNftCount:   number;
  revenueCount:        number;
  pendingForSaleCount: number;
  soldCount:           number;
  groupCount:          number;
  createdAt:           Date;
  updatedAt:           Date;
  __v:                 number;
  id:                  string;
}
