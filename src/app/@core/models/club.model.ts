export interface Club {
  coverImageURL:       string;
  coverBlurHash:       string;
  profileImageURL:     string;
  profileBlurHash:     string;
  displayName:         string;
  description:         string;
  appPackageId:        string;
  stripeSecretKey:     string;
  walletAddress:       string;
  availableNftCount:   number;
  revenueCount:        number;
  pendingForSaleCount: number;
  soldCount:           number;
  groupCount:          number;
  totalNdct:           number;
  spentNdct:           number;
  spentAmount:         number;
  isWithoutApp:        boolean;
  createdAt:           Date;
  updatedAt:           Date;
  __v:                 number;
  redirectUrl:         string;
  id:                  string;
}
