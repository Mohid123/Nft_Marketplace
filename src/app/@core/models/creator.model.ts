export interface Creator {
  coverImageURL:       string;
  coverBlurHash:       string;
  profileImageURL:     string;
  profileBlurHash:     string;
  displayName:         string;
  description:         string;
  appPackageId:        string;
  stripeSecretKey:     string;
  availableNftCount:   number;
  revenueCount:        number;
  pendingForSaleCount: number;
  soldCount:           number;
  groupCount:          number;
  createdAt:           Date;
  updatedAt:           Date;
  id:                  string;
}

