import { CreditCard } from "../credit-card.mode";

export interface BuyNFT {
  card:        CreditCard;
  payment:     string;
  description: string;
  userId:      string;
  nftId:       string;
  clubUserId:  string;
}
