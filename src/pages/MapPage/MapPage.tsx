import { Divider } from '@mui/material'
import Title from '../../components/Main/Title/Title'
import MapComponent from '../../components/MapComponent/MapComponent'
import SubInformation from '../../components/MapComponent/SubInformation/SubInformation'
import Footer from '../../components/Main/Footer/Footer'
import { Box } from '@mui/material'
import DividerCustom from '../../components/ui/DividerCustom'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux'
import {
	useGetConnectionLinksQuery,
	useGetPillarLinksQuery,
	useGetPillarsQuery,
} from '../../api/mapApi'
import { useEffect } from 'react'
import { setConnectionLinks, setPillarLinks, setFocusedPillarCoords } from '../../store/slice/mapSlice'
import PillarsList from '../../components/MapComponent/PillarsList/PillarsList'
import { IPillar } from '../../interfaces/mapInterfaces'
import { useLocation } from 'react-router-dom'

const MapPage = () => {
	// Достаём тип организации, если он есть из хранилища Redux Toolkit
	const type = useAppSelector(state => state.userSlice.user?.user_info?.type)

	// Достаём линии, подключённые линии, из хранилища Redux Toolkit
	const pillarLinks = useAppSelector(state => state.mapSlice.pillarLinks)
	const connectionLinks = useAppSelector(state => state.mapSlice.connectionLinks)

	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая делает запрос за получением столбов.
	// В качестве ответа мы получаем флаг загрузки данных и данные
	const { data: dataPillars, refetch: refetchPillars } = useGetPillarsQuery({})

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая делает запрос за получением столбов.
	// В качестве ответа мы получаем флаг загрузки данных и данные
	const { data: dataPillarLinks, isLoading: isLoadingPillarLinks } = useGetPillarLinksQuery()

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая делает запрос за получением столбов.
	// В качестве ответа мы получаем флаг загрузки данных, данные, и функцию перезапроса
	const {
		data: dataConnectionLinks,
		isLoading: isLoadingConnectionLinks,
		refetch,
	} = useGetConnectionLinksQuery()

	const location = useLocation()

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search)
		const lat = searchParams.get('lat')
		const lng = searchParams.get('lng')
		if (lat && lng) {
			dispatch(setFocusedPillarCoords([parseFloat(lng), parseFloat(lat)]))
		}
	}, [location.search, dispatch])

	useEffect(() => {
		// Если загрузка закончена и данные линий есть, устанавливаем их в хранилище Redux Toolkit
		if (!isLoadingPillarLinks && dataPillarLinks) {
			dispatch(setPillarLinks(dataPillarLinks))
		}
	}, [dataPillarLinks, isLoadingPillarLinks])

	useEffect(() => {
		// Если загрузка закончена и данные подключённых линий есть, устанавливаем их в хранилище Redux
		// Toolkit
		if (!isLoadingConnectionLinks && dataConnectionLinks) {
			dispatch(setConnectionLinks(dataConnectionLinks.connection_links))
		}
	}, [dataConnectionLinks, isLoadingPillarLinks])

	/* Divider это компонент из MaterialUI, содержащий линию */
	// Title, SubInformation, Footer, DividerCustom - наши дочерние компоненты
	return (
		<>
			{(type !== 'электросетевая компания' && type !== 'магистральный провайдер') && (
				<>
					<Title />
					<Divider sx={{ mt: 3 }}></Divider>
				</>
			)}
			{/* Если идёт загрузка линий или загрузка подключённых линий то отбражаем заголовок */}
			{(isLoadingPillarLinks || isLoadingConnectionLinks) && <h1>Данные загружаются...</h1>}
			{/* Иначе отрисовываем нашу карту */}
			{!isLoadingPillarLinks && !isLoadingConnectionLinks && dataPillars && (
				<Box sx={{ backgroundColor: '#F5F2F5', p: 3, borderRadius: 3, mb: 4, mt: 4 }}>
					<SubInformation type={type} />
					<MapComponent
						pillars={dataPillars as IPillar[]}
						pillarLinks={pillarLinks}
						connectionLinks={connectionLinks}
						type={type!}
						refetchConnectionLinks={refetch}
						refetchPillars={refetchPillars}
					/>
				</Box>
			)}

			<Box sx={{ backgroundColor: '#F5F2F5', py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 }, borderRadius: 3, mb: 4 }}>
				<PillarsList />
			</Box>

			<Box sx={{ backgroundColor: '#F5F2F5', p: 3, borderRadius: 3 }}>
				<Footer />
			</Box>
		</>
	)
}

export default MapPage
