import { Group } from "./group.model";

export interface ResponseGroupsByClub {
  totalCount: number;
  data?:       Group[];
}
