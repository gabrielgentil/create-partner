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
    return this._data
  }
  async findPartnerByLongLat(lang: string, lat: string): Promise<IPartnerData[]> {
    return this._data
  }
  
}