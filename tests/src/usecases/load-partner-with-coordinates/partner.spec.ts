import { CreatePartner } from '@/usecases/create-partner'
import { LoadPartnerLatLong } from '@/usecases/load-partner-with-lat-long'

import { InMemoryPartner } from '../../../doubles/repositories'

describe('Load Partner with coordinates usecase', () => {
	const inMemoryPartner = new InMemoryPartner([])
	const loadPartner = new LoadPartnerLatLong(inMemoryPartner)
	const createPartner = new CreatePartner(new InMemoryPartner([]))
	const makesut = () => {
		return {
			loadPartner,
			createPartner,
			inMemoryPartner,
		}
	}
	const data = {
		id: 1,
		tradingName: 'Adega da Cerveja - Pinheiros',
		ownerName: 'Zé da Silva',
		document: '1432132123891/0001',
		coverageArea: {
			type: 'MultiPolygon',
			coordinates: [
				[
					[
						[30, 20],
						[45, 40],
						[10, 40],
						[30, 20],
					],
				],
				[
					[
						[15, 5],
						[40, 10],
						[10, 20],
						[5, 10],
						[15, 5],
					],
				],
			],
		},
		address: {
			type: 'Point',
			coordinates: [-46.57421, -21.785741],
		},
	}

	beforeEach(async () => {
		const sut = makesut()

		await sut.inMemoryPartner.add(data)
	})

	test('should not load partner with invalid coordinates', async () => {
		const sut = makesut()

		const result = await sut.loadPartner.perform([-46.57421, -21.78574])

		expect(result).toBeUndefined()
	})

	test('should load partner with coordinates', async () => {
		const sut = makesut()

		const result = await sut.loadPartner.perform([-46.57421, -21.785741])

		expect(result).toEqual(data)
	})
})
