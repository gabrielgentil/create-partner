import { CreatePartner } from '@/usecases/create-partner'
import { LoadPartner } from '@/usecases/load-partner'

import { InMemoryPartner } from '../../../doubles/repositories'

describe('Load Partner usecase', () => {
	const inMemoryPartner = new InMemoryPartner([])
	const loadPartner = new LoadPartner(inMemoryPartner)
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

	test('should not load partner with invalid document', async () => {
		const sut = makesut()

		const result = await sut.loadPartner.perform(
			'1432132123891/0002'
		)

		expect(result).toBeUndefined()
	})

	test('should load partner with document', async () => {
		const sut = makesut()

		const result = await sut.loadPartner.perform(
			'1432132123891/0001'
		)

		expect(result).toEqual(data)
	})
})
