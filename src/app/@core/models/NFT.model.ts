import { NFTCreator } from "./NFTCreater.model";
import { NFTOwner } from "./NFTOwner.model";

export class NFT {
  itemId?:               string;
  nftContract?:          string;
  groupId:              string;
  tokenId?:              string;
  seller?:               string;
  owner?:                string;
  price?:                string;
  name?:                 string;
  description?:          string;
  type?:                 string;
  forSale:              boolean;
  freezeNft:            boolean;
  metaDataURL?:          string;
  path?:                 string;
  serverCaptureFileUrl: string;
  userId?:               string;
  clubUserId?:           string;
  metaDataCID?:          string;
  ipfsImageUrl?:         string;
  membershipId?:         string;
  numberOfCopies?:       number;
  nftStatus?:            string;
  transactionHashUrl?:   string;
  appPackageId:         string;
  transactionHash?:      string;
  createdAt:            Date;
  updatedAt?:            Date;
  __v?:                  number;
  creator?:             NFTCreator;
  id?:                   string;
  ownerData?:           NFTOwner;
  serverBlurHash?:       string;
}
