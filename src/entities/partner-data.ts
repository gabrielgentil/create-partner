
interface ICoverageArea {
  type: string
  coordinates: any
}

interface IAddress {
  type: string
  coordinates: Array<number>
}

export interface IPartnerData {
  tradingName: string
  ownerName: string
  document: string
  coverageArea: ICoverageArea
  address: IAddress
}