export interface AddGroup {
  id?: string,
  name: string,
  appPackageId: string,
  description: string,
  coverImageUrl: string,
  coverBlurHash?: string,
  path?: string,
  itemsCount?: number
}
