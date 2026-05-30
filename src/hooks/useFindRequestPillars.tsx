import { useEffect, useMemo, useState } from 'react'
import {
	useGetConnectionLinksQuery,
	useGetPillarLinksQuery,
	useGetPillarsQuery,
} from '../api/mapApi'
import { useAppDispatch, useAppSelector } from './react-redux'
import { setConnectionLinks, setPillarLinks, setPillars } from '../store/slice/mapSlice'
import { IPillar } from '../interfaces/mapInterfaces'

// Типизация ответа хука useFindRequestPillars
interface Response {
	isLoading: boolean
	requestPillars: {
		id: number | undefined
		ans: 'pole_a_answer' | 'pole_b_answer'
		pillar: any
		nameOrg: string
	}[]
	refetchConnectionLinks: () => void
}

const useFindRequestPillars = (): Response => {
	// Достаём имя нашей организации из Redux
	const orgName = useAppSelector(state => state.userSlice.user?.user_info?.organization.name)

	// Делаем локальное состояние загруженности всего
	const [allIsLoading, setAllIsLoading] = useState(true)

	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	// Достаём из хранилища Redux опоры, линии, подключённые линии
	const pillars = useAppSelector(state => state.mapSlice.pillars)
	const pillarLinks = useAppSelector(state => state.mapSlice.pillarLinks)
	const connectionLinks = useAppSelector(state => state.mapSlice.connectionLinks)

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая делает запрос за получением линий.
	// В качестве ответа мы получаем флаг загрузки данных и данные
	const { data: dataPillarLinks, isLoading: isLoadingPillarLinks } = useGetPillarLinksQuery()

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая делает запрос за получением опор.
	// В качестве ответа мы получаем флаг загрузки данных и данные
	const { data: dataPillars, isLoading: isLoadingPillars } = useGetPillarsQuery({})

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая делает запрос за получением подключённых
	// линий. В качестве ответа мы получаем флаг загрузки данных и данные
	const {
		data: dataConnectionLinks,
		isLoading: isLoadingConnectionLinks,
		refetch,
	} = useGetConnectionLinksQuery()

	useEffect(() => {
		// Если опоры есть и загрузка прошла
		if (!isLoadingPillars && dataPillars) {
			// устанавливаем их в хранилище Redux
			dispatch(setPillars(dataPillars as IPillar[]))
		}

		// Если линии есть и загрузка прошла
		if (!isLoadingPillarLinks && dataPillarLinks) {
			// устанавливаем их в хранилище Redux
			dispatch(setPillarLinks(dataPillarLinks))
		}

		// Если подключённые линии есть и загрузка прошла
		if (!isLoadingConnectionLinks && dataConnectionLinks) {
			// устанавливаем их в хранилище Redux
			dispatch(setConnectionLinks(dataConnectionLinks.connection_links))
		}
	}, [dataPillars, dataPillarLinks, dataConnectionLinks])

	useEffect(() => {
		// если все загрузки равны false, то локальное состоние загрузки мы тоже false делаем
		if (!isLoadingPillars && !isLoadingPillarLinks && !isLoadingConnectionLinks) {
			setAllIsLoading(false)
		}
	}, [isLoadingPillars, isLoadingPillarLinks, isLoadingConnectionLinks])

	// Ищем подключённые линии, которые находятся в статусе ожидания
	const findLinks = useMemo(() => {
		return pillarLinks.filter(link =>
			connectionLinks.some(
				connectLink => connectLink.pole_link === link.id && connectLink.status !== 2
			)
		)
	}, [pillarLinks, connectionLinks])

	// создаём массив запросов на опоры
	const requestPillars = useMemo(() => {
		// проходимся по массиву
		return findLinks.flatMap(findLink => {
			// среди опор ищем ту, которая в подключённой линии является pole_a
			const a = pillars.find(
				pillar => pillar.id === findLink.pole_a.id && pillar.owner.name === orgName
			)
			// среди опор ищем ту, которая в подключённой линии является pole_b
			const b = pillars.find(
				pillar => pillar.id === findLink.pole_b.id && pillar.owner.name === orgName
			)

			// из всех подключённых линий, мы находим нашу (которая является подключённой линией
			// со статусом "Ожидание")
			const findConnectionLink = connectionLinks.find(link => link.pole_link === findLink.id)

			// создаёмся пустой ответ который равен пустому массиву
			// через : {} это идёт типизация
			const res: {
				id: number | undefined
				ans: 'pole_a_answer' | 'pole_b_answer'
				pillar: any
				nameOrg: string
			}[] = []

			// если опора a найдена, то
			if (a) {
				// если ответ по этой опоре ещё не дан
				if (!findConnectionLink?.pole_a_answer) {
					// то записываем нашу опору в массив res
					res.push({
						id: findConnectionLink?.id,
						ans: 'pole_a_answer',
						pillar: a,
						nameOrg: a.owner.name,
					})
				}
			}
			// если опора b найдена, то
			if (b) {
				// если ответ по этой опоре ещё не дан
				if (!findConnectionLink?.pole_b_answer) {
					// то записываем нашу опору в массив res
					res.push({
						id: findConnectionLink?.id,
						ans: 'pole_b_answer',
						pillar: b,
						nameOrg: b.owner.name,
					})
				}
			}

			return res
		})
	}, [findLinks, pillars])

	// возвращаем данные
	return {
		isLoading: allIsLoading,
		requestPillars,
		refetchConnectionLinks: refetch,
	}
}

export default useFindRequestPillars
