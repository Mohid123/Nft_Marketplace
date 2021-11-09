export interface NFTEvent {
  nftId:          string;
  eventType:      string;
  price:          string;
  from:           string;
  to:             string;
  userId:         string;
  clubUserId:     string;
  appPackageId:   string;
  tokenId:        string;
  transactionUrl: string;
  createdAt:      Date;
  updatedAt:      Date;
  __v:            number;
  id:             string;
}
