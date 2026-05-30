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
			{connections.map(connection => {
				const pair = items.find(i => i.connectionId === connection.id)
				const start = pair?.startStreet ?? ''
				const end = pair?.endStreet ?? ''

				return (
					<article key={connection.id}>
						<DividerCustom />
						<ProfileRequest
							// передаём массив из двух строк
							street={[start, end]}
							status={connection.status}
							type={type!}
							currentNameOrganization={''}
						/>
					</article>
				)
			})}
		</section>
	)
}

export default ProfileRequestsBackbone
