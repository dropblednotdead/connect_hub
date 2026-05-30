import { TypeOrganization } from '../../../interfaces/usersInterfaces'
import DividerCustom from '../../ui/DividerCustom'
import ProfileRequest from '../ProfileRequest/ProfileRequest'
import { useFindStreetAndProviders } from '../../../hooks/useFindStreetAndProviders'
import { setConnectionLinks, setPillarLinks } from '../../../store/slice/mapSlice'
import { setConnection } from '../../../store/slice/profileSlice'
import { useEffect } from 'react'
import { useGetConnectionLinksQuery, useGetPillarLinksQuery } from '../../../api/mapApi'
import { useGetConnectionQuery } from '../../../api/profileApi'
import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux'
import { Box, Typography } from '@mui/material'

// типизация параметров ProfileRequestsBackbone
interface Props {
	type: TypeOrganization
}

// принимает тип
const ProfileRequestsBackbone = ({ type }: Props) => {
	// Достаём из хранилища Redux подключения, линии, подключённые линии
	const connections = useAppSelector(state => state.profileSlice.connections)
	const pillarLinks = useAppSelector(state => state.mapSlice.pillarLinks)
	const connectionLinks = useAppSelector(state => state.mapSlice.connectionLinks)

	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	// Вызываем функции из библиотеки Redux Toolkit Query, которые делает запросы
	// за получением линий, подключённых линий и подключений.
	// В качестве ответа мы получаем флаги загрузки данных и данные
	const { data: dataConnects, isLoading: isLoadingConnects } = useGetConnectionQuery()
	const { data: dataPillarLinks, isLoading: isLoadingPillarLinks } = useGetPillarLinksQuery()
	const { data: dataConnectionLinks, isLoading: isLoadingConnectionLinks } =
		useGetConnectionLinksQuery()

	useEffect(() => {
		// Если подключения есть и загрузка прошла
		if (dataConnects && !isLoadingConnects) {
			// устанавливаем их в хранилище Redux
			dispatch(setConnection(dataConnects.connections))
		}

		// Если линии есть и загрузка прошла
		if (dataPillarLinks && !isLoadingPillarLinks) {
			// устанавливаем их в хранилище Redux
			dispatch(setPillarLinks(dataPillarLinks))
		}

		// Если подключённые линии есть и загрузка прошла
		if (dataConnectionLinks && !isLoadingConnectionLinks) {
			// устанавливаем их в хранилище Redux
			dispatch(setConnectionLinks(dataConnectionLinks.connection_links))
		}
	}, [dataConnects, dataConnectionLinks, dataPillarLinks])

	if (isLoadingConnectionLinks || isLoadingConnects || isLoadingPillarLinks) {
		return <h1>Данные загружаются</h1>
	}
	// вызываем свою кастомную функцию, которая отдаёт нам подключения, улицы, и флаг загрузки
	const items = useFindStreetAndProviders({ connections, connectionLinks, pillarLinks })

	{
		/* Идём по массиву и отрисовываем наши подключения */
	}
	return (
		<section>
			<Box sx={{ backgroundColor: '#F5F2F5', py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 }, borderRadius: 3, mb: 4, mt: 4 }}>
				<Typography variant='h3' sx={{ fontSize: { xs: '2rem', md: '36px' }, mb: 3 }}>
					ИСТОРИЯ ЗАПРОСОВ
				</Typography>
				<DividerCustom />
				
				{connections.length === 0 ? (
					<Typography sx={{ mt: 3, fontSize: '20px' }}>У вас пока нет обработанных заявок.</Typography>
				) : (
					connections.map(connection => {
						const pair = items.find(i => i.connectionId === connection.id)
						const start = pair?.startStreet ?? ''
						const startCoords = pair?.startCoords ?? ''
						const end = pair?.endStreet ?? ''
						const endCoords = pair?.endCoords ?? ''
						const date = pair?.date ?? ''

						return (
							<Box key={connection.id} sx={{ mt: 3, mb: 3 }}>
								<ProfileRequest
									street={[start.toUpperCase(), end.toUpperCase()]}
									coords={[startCoords, endCoords]}
									date={date}
									status={connection.status}
									type={type!}
									currentNameOrganization={pair?.owners ?? []}
								/>
								<DividerCustom />
							</Box>
						)
					})
				)}
			</Box>
		</section>
	)
}

export default ProfileRequestsBackbone
