export interface GetAllNftsByClub {
  appPackageId?: string,
  clubName: string,
  offset: number,
  limit: number,
  name?: string,
  type?: string,
  groupID?: string,
}
