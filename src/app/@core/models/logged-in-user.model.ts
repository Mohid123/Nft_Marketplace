export interface LoggedInUser {
  clubUserId:       string;
  appPackageId:     string;
  stripeCustomerId: string;
  ownedItemsCount:  number;
  groupsCount:      number;
  spent:            number;
  createdAt:        Date;
  updatedAt:        Date;
  __v:              number;
  id:               string;
}
