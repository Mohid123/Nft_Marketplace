import { CreditCard } from "../credit-card.mode";

export interface BuyNFT {
  card:        CreditCard;
  payment:     string;
  description: string;
  userId:      string;
  nftId:       string;
  clubUserId:  string;
}
export interface BuySubscription {
  tokenQuantity: number;
  stripeDto: {
    card: CreditCard;
  };
}
