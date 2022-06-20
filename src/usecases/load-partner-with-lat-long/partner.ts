import { PartnerRepository, UseCase } from '@/usecases/ports'
import { IPartnerData } from '@/entities'

export class LoadPartnerLatLong implements UseCase {
	private readonly partnerRepository: PartnerRepository

	constructor(partnerRepository: PartnerRepository) {
		this.partnerRepository = partnerRepository
	}

	async perform(coordinates: Array<number>): Promise<IPartnerData[]> {
		return this.partnerRepository.findPartnerByLongLat(coordinates)
	}
}
