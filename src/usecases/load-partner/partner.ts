import { PartnerRepository, UseCase } from '@/usecases/ports'
import { IPartnerData } from '@/entities'

export class LoadPartner implements UseCase {
	private readonly partnerRepository: PartnerRepository

	constructor(partnerRepository: PartnerRepository) {
		this.partnerRepository = partnerRepository
	}

	async perform(request: string): Promise<IPartnerData[]> {
		return this.partnerRepository.findPartnerById(request)
	}
}
