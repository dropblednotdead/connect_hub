import { IPillar } from '../interfaces/mapInterfaces'

export function createGeometryPolyline(
	pillarA: IPillar,
	pillarB: IPillar
): [[number, number], [number, number]] {
	return [
		[+pillarA.longitude, +pillarA.latitude],
		[+pillarB.longitude, +pillarB.latitude],
	]
}
