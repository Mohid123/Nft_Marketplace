import { LoggedInUser } from './logged-in-user.model';
import { NftJwtToken } from './nft-jwt-token.model';
import { NodechainUser } from './nodechain-user.model';
import { User } from './user.model';

export interface SignInResponse {
  user:         User;
  loggedInUser: LoggedInUser;
  nftJwtToken:  NftJwtToken;
  nodeChainUser: NodechainUser;
}
