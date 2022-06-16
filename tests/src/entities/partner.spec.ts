import { Partner } from '@/entities'

describe('Partner domain entity', () => {
	test('should not add partner with invalid GeoJSON MultiPolygon', () => {
		const data = {
			id: 1,
			tradingName: 'Adega da Cerveja - Pinheiros',
			ownerName: 'Zé da Silva',
			document: '1432132123891/0001',
			coverageArea: {
				type: 'invalid',
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

		const error = Partner.create(data).value as Error

		expect(error.name).toEqual('InvalidGeoJsonError')
		expect(error.message).toEqual(
			'Invalid geoJson: ' +
				JSON.stringify(data.coverageArea) +
				'.'
		)
	})

	test('should not add partner with invalid GeoJSON Point', () => {
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
				type: 'invalid',
				coordinates: [-46.57421, -21.785741],
			},
		}

		const error = Partner.create(data).value as Error

		expect(error.name).toEqual('InvalidGeoJsonError')
		expect(error.message).toEqual(
			'Invalid geoJson: ' +
				JSON.stringify(data.address) +
				'.'
		)
	})
})
