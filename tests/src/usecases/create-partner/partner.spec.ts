import { CreatePartner } from '@/usecases/create-partner'
import { LoadPartner } from '@/usecases/load-partner'

import { InMemoryPartner } from '../../../doubles/repositories'

describe('Create Partner usecase', () => {
  const inMemoryPartner = new InMemoryPartner([])

  const loadPartner = new LoadPartner(inMemoryPartner)
  const createPartner = new CreatePartner(inMemoryPartner)
	const makesut = () => {
		return {
      loadPartner,
      createPartner,
      inMemoryPartner
    }
	}

  test('should create partner', async () => {
		const sut = makesut()
		const data = {
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

		const result = await sut.createPartner.perform(data)
		expect(result.value).toEqual(data)
	})


	test('should not create partner with existing document', async () => {
		const sut = makesut()
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
		const error: Error = (await sut.createPartner.perform(data))
			.value as Error
		expect(error.name).toEqual('ExistingPartnerError')
	})
})
