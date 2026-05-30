import activePoint from '../assets/activePoint.svg'
import notActivePoint from '../assets/notActivePoint.svg'
import { TypeOrganization } from '../interfaces/usersInterfaces'

interface Params {
	type: TypeOrganization
	pillarOwner: string
	nameOrg: string
}

export const placemarkOptions = ({ type, pillarOwner, nameOrg }: Params) => ({
	iconLayout: 'default#image',
	iconImageHref:
		type === 'магистральный провайдер' || pillarOwner === nameOrg ? activePoint : notActivePoint,
	iconImageSize: [30, 30],
	iconImageOffset: [-15, -30],
	openBalloonOnClick: true,
	balloonPanelMaxMapArea: 0,
})
