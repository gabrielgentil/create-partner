import { IPartnerData } from "@/entities";
import { PartnerRepository } from "@/usecases/ports";

export class InMemoryPartner implements PartnerRepository {
  private readonly _data: IPartnerData[]

  constructor (data: IPartnerData[]) {
    this._data = data
  }

  async add(partnerdata: IPartnerData): Promise<IPartnerData> {
    this._data.push(partnerdata)

    return partnerdata
  }
  async findPartnerById(partnerId: string): Promise<IPartnerData[]> {
    const found = this._data.find((partner) => partner.document === partnerId)

    return (found || undefined) as any
   
  }
  async findPartnerByLongLat(coordinates: Array<number>): Promise<IPartnerData[]> {
    const found = this._data.find((partner) => JSON.stringify(partner.address.coordinates) === JSON.stringify(coordinates))

    return (found || undefined) as any
  }  
}