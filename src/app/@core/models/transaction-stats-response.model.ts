import { TransactionStatsWallet } from './transaction-stats-wallet.model';
import { TransactionStats } from './transaction-stats.model';

export interface TransactionStatsResponse {
  wallet: TransactionStatsWallet;
  stats:  TransactionStats;
}
