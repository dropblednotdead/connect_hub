import { IConnectionLink, IPillarLink } from '../interfaces/mapInterfaces'
import { TypeOrganization } from '../interfaces/usersInterfaces'

interface Params {
	type: TypeOrganization
	connectionLinks: IConnectionLink[]
	pillarLink: IPillarLink
	selectedLinks: number[]
}

export const polylineOptions = ({ type, connectionLinks, pillarLink, selectedLinks }: Params) => {
	let color = '#a0a0a0'

	const findedLinks = connectionLinks.find(
		link => link.pole_link === pillarLink.id && link.status !== 1 && link.status !== 3
	)

	if (type === 'магистральный провайдер' && findedLinks) {
		color = '#832590'
	}

	if (type === 'магистральный провайдер' && selectedLinks.some(link => link === pillarLink.id)) {
		color = '#00CFFF'
	}

	return {
		strokeColor: color,
		strokeWidth: 4,
		strokeOpacity: 1,
	}
}
