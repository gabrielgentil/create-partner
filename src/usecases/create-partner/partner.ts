import { Either, right, left } from '@/shared'
import { UseCase } from '@/usecases/ports'
import { PartnerRepository } from '@/usecases/ports'
import { ExistingPartnerError } from '@/usecases/create-partner/error'
import { IPartnerData, Partner } from '@/entities'
import { InvalidGeoJsonError } from '@/entities/error'

export class CreatePartner implements UseCase {
	private readonly partnerRepository: PartnerRepository

	constructor(partnerRepository: PartnerRepository) {
		this.partnerRepository = partnerRepository
	}

	async perform(
		request: IPartnerData
	): Promise<Either<ExistingPartnerError | InvalidGeoJsonError, IPartnerData>> {
		const partnerOrError = Partner.create(request)

		if (partnerOrError.isLeft()) {
			return left(partnerOrError.value)
		}

		const partnerExists =
			await this.partnerRepository.findPartnerById(
				request.document
			)

		if (partnerExists) {
			return left(new ExistingPartnerError())
		}

		return right(await this.partnerRepository.add(request))
	}
}
