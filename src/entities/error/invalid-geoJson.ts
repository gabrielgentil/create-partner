export class InvalidGeoJsonError extends Error {
	public readonly name = 'InvalidGeoJsonError'
	constructor (value: unknown) {
		super('Invalid geoJson: ' + JSON.stringify(value) + '.')
	}
}