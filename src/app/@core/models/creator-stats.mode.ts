import { Stats } from "./stats.model";

export interface CreatorStats {
  club?: string;
  monthlyStats: Stats[];
  yearlyStats:  Stats;
}
