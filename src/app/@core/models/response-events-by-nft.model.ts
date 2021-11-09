import { NFTEvent } from "./nft-event.model";

export interface ResponseEventByNFT {
  totalCount: number;
  data:       NFTEvent[];
}
