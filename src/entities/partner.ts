const gjv = require('geojson-validation')

import { IPartnerData } from './partner-data'
import { Either, right, left } from '@/shared'
import { InvalidGeoJsonError } from '@/entities/error'

export class Partner {
	public readonly partner: IPartnerData

	constructor(partner: IPartnerData) {
		this.partner = partner
	}

	public static create(
		partner: IPartnerData
	): Either<InvalidGeoJsonError, Partner> {
		const validateGeoJsonMultiPolygon =
			Partner.validateGeoJsonMultiPolygon(
				partner.coverageArea
			)

		if (!validateGeoJsonMultiPolygon) {
			return left(
				new InvalidGeoJsonError(
					partner.coverageArea
				)
			)
		}

		const validateGeoJsonPoint = Partner.validateGeoJsonPoint(
			partner.address
		)

		if (!validateGeoJsonPoint) {
			return left(
				new InvalidGeoJsonError(partner.address)
			)
		}

		return right(new Partner(partner))
	}

	static validateGeoJsonMultiPolygon(
		geoJsonMultiPolygon: any
	): Boolean {
		if (gjv.valid(geoJsonMultiPolygon)) {
			return true
		}

		return false
	}

	static validateGeoJsonPoint(geoJsonPoint: any): Boolean {
		if (gjv.valid(geoJsonPoint)) {
			return true
		}

		return false
	}
}
