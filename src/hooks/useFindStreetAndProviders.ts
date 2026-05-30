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
	endStreet: string
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
		const startStreet = `${pl.pole_a.street} ${pl.pole_a.building}${pl.pole_a.index ?? ''}`
		const endStreet = `${pl.pole_b.street} ${pl.pole_b.building}${pl.pole_b.index ?? ''}`

		items.push({
			connectionId: conn.id,
			startStreet,
			endStreet,
		})
	}

	return items
}
