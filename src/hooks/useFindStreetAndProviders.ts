import { IConnectionLink, IPillarLink } from '../interfaces/mapInterfaces'
import { IConnection } from '../interfaces/profileInterfaces'

interface Props {
	connections: IConnection[]
	connectionLinks: IConnectionLink[]
	pillarLinks: IPillarLink[]
}

export interface StreetPair {
	connectionId: number
	startStreet: string
	startCoords: string
	endStreet: string
	endCoords: string
	date: string
	owners: string[]
}

/**
 * Для каждого connection находит свой connectionLink,
 * потом из него pillarLink и возвращает пару улиц.
 */
export function useFindStreetAndProviders({
	connections,
	connectionLinks,
	pillarLinks,
}: Props): StreetPair[] {
	// Результат
	const items: StreetPair[] = []

	// Проходим по каждой заявке
	for (const conn of connections) {
		// Находим её connectionLink (должен быть ровно один)
		const cl = connectionLinks.find(link => link.connection.id === conn.id)
		if (!cl) continue

		// Затем находим pillarLink по pole_link
		const pl = pillarLinks.find(pl => pl.id === cl.pole_link)
		if (!pl) continue

		// Формируем строки
		const startStreet = `${pl.pole_a.street}, ${pl.pole_a.building}${pl.pole_a.index ?? ''}`
		const startCoords = `${pl.pole_a.longitude} ${pl.pole_a.latitude}`
		const endStreet = `${pl.pole_b.street}, ${pl.pole_b.building}${pl.pole_b.index ?? ''}`
		const endCoords = `${pl.pole_b.longitude} ${pl.pole_b.latitude}`
		
		// Format date DD.MM.YYYY
		const dateStr = conn.created_at ? new Date(conn.created_at).toLocaleDateString('ru-RU') : 'Неизвестная дата'
		
		const owners = [pl.pole_a.owner.name, pl.pole_b.owner.name]

		items.push({
			connectionId: conn.id,
			startStreet,
			startCoords,
			endStreet,
			endCoords,
			date: dateStr,
			owners,
		})
	}

	return items
}
