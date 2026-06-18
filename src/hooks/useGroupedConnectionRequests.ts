import { useEffect, useMemo, useState } from 'react'
import {
	useGetConnectionLinksQuery,
	useGetPillarLinksQuery,
	useGetPillarsQuery,
} from '../api/mapApi'
import { useAppDispatch, useAppSelector } from './react-redux'
import { setConnectionLinks, setPillarLinks, setPillars } from '../store/slice/mapSlice'
import { IPillar } from '../interfaces/mapInterfaces'

export interface GroupedRequestPillarItem {
	linkId: number
	ans: 'pole_a_answer' | 'pole_b_answer'
	pillar: IPillar
}

export interface GroupedConnectionRequest {
	connectionId: number
	createdAt: string | null
	providerId: number
	status: number
	resolutionStatus: number | boolean | string | null
	pillars: GroupedRequestPillarItem[]
}

interface Response {
	isLoading: boolean
	groupedRequests: GroupedConnectionRequest[]
	refetchConnectionLinks: () => void
}

const useGroupedConnectionRequests = (historyMode: boolean): Response => {
	const orgName = useAppSelector(state => state.userSlice.user?.user_info?.organization.name)
	const [allIsLoading, setAllIsLoading] = useState(true)
	const dispatch = useAppDispatch()

	const pillarLinks = useAppSelector(state => state.mapSlice.pillarLinks)
	const connectionLinks = useAppSelector(state => state.mapSlice.connectionLinks)

	const { data: dataPillarLinks, isLoading: isLoadingPillarLinks } = useGetPillarLinksQuery()
	const { data: dataPillars, isLoading: isLoadingPillars } = useGetPillarsQuery({})
	const {
		data: dataConnectionLinks,
		isLoading: isLoadingConnectionLinks,
		refetch,
	} = useGetConnectionLinksQuery()

	const pillars = (dataPillars as IPillar[]) || []

	useEffect(() => {
		if (!isLoadingPillarLinks && dataPillarLinks) {
			dispatch(setPillarLinks(dataPillarLinks))
		}
		if (!isLoadingConnectionLinks && dataConnectionLinks) {
			dispatch(setConnectionLinks(dataConnectionLinks.connection_links))
		}
	}, [dataPillarLinks, dataConnectionLinks, dispatch])

	useEffect(() => {
		if (!isLoadingPillars && !isLoadingPillarLinks && !isLoadingConnectionLinks) {
			setAllIsLoading(false)
		}
	}, [isLoadingPillars, isLoadingPillarLinks, isLoadingConnectionLinks])

	const groupedRequests = useMemo(() => {
		const groups = new Map<number, GroupedConnectionRequest>()

		pillarLinks.forEach(link => {
			const a = pillars.find(p => p.id === link.pole_a.id && p.owner.name === orgName)
			const b = pillars.find(p => p.id === link.pole_b.id && p.owner.name === orgName)

			if (!a && !b) return

			const cLinks = connectionLinks.filter(cl => cl.pole_link === link.id)
			
			cLinks.forEach(cLink => {
				if (!cLink.connection) return 

				let includeA = false
				let includeB = false
				let aResolved = cLink.pole_a_answer !== null
				let bResolved = cLink.pole_b_answer !== null

				if (a) {
					if (historyMode ? aResolved : !aResolved) {
						includeA = true
					}
				}
				if (b) {
					if (historyMode ? bResolved : !bResolved) {
						includeB = true
					}
				}

				if (!includeA && !includeB) return

				const connId = cLink.connection.id
				if (!groups.has(connId)) {
					groups.set(connId, {
						connectionId: connId,
						createdAt: cLink.connection.created_at,
						providerId: cLink.connection.provider,
						status: cLink.connection.status,
						resolutionStatus: historyMode ? (includeA ? cLink.pole_a_answer : cLink.pole_b_answer) : null,
						pillars: []
					})
				}

				const group = groups.get(connId)!
				if (includeA && !group.pillars.some(p => p.linkId === cLink.id && p.ans === 'pole_a_answer')) {
					group.pillars.push({
						linkId: cLink.id,
						ans: 'pole_a_answer',
						pillar: a!
					})
				}
				if (includeB && !group.pillars.some(p => p.linkId === cLink.id && p.ans === 'pole_b_answer')) {
					group.pillars.push({
						linkId: cLink.id,
						ans: 'pole_b_answer',
						pillar: b!
					})
				}
			})
		})

		// сортируем заявки по дате (по убыванию) если нужно, 
        // но оставим пока как есть
		return Array.from(groups.values()).sort((a, b) => b.connectionId - a.connectionId)
	}, [pillarLinks, pillars, connectionLinks, orgName, historyMode])

	return {
		isLoading: allIsLoading,
		groupedRequests,
		refetchConnectionLinks: refetch,
	}
}

export default useGroupedConnectionRequests
