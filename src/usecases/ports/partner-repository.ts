import { IPartnerData } from "@/entities";

export interface PartnerRepository {
  add (partnerdata: IPartnerData): Promise<IPartnerData>
  findPartnerById (partnerId: string): Promise<IPartnerData[]>
  findPartnerByLongLat (lang: string, lat: string): Promise<IPartnerData[]>
}