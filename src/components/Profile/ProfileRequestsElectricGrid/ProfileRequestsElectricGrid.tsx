import { useEffect } from 'react'
import { useGetConnectionQuery } from '../../../api/profileApi'
import { useAppDispatch } from '../../../hooks/react-redux'
import useFindRequestPillars from '../../../hooks/useFindRequestPillars'
import { TypeOrganization } from '../../../interfaces/usersInterfaces'
import { setConnection } from '../../../store/slice/profileSlice'
import DividerCustom from '../../ui/DividerCustom'
import ProfileRequest from '../ProfileRequest/ProfileRequest'
import { IOrganization } from '../../../interfaces/authInterfaces'

interface Props {
	type: TypeOrganization
	organizations: IOrganization[]
}

const ProfileRequestsElectricGrid = ({ type, organizations }: Props) => {
	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	// вызываем свою кастомную функцию, которая отдаёт нам запрошенные столбы
	// перезапрос за столбами, и флаг загрузки
	const { isLoading, requestPillars, refetchConnectionLinks } = useFindRequestPillars()

	// Здесь мы делаем запрос за подключениями, в ответе получаем данные и флаг загрузки
	const { data: dataConnects, isLoading: isLoadingConnects } = useGetConnectionQuery()

	useEffect(() => {
		// Если подключения есть и загрузка прошла
		if (dataConnects && !isLoadingConnects) {
			// устанавливаем их в хранилище Redux
			dispatch(setConnection(dataConnects.connections))
		}
	}, [dataConnects, isLoadingConnects])

	return (
		<section>
			{/* Если загрузка, то показываем заголовок */}
			{isLoading && <h1>Загрузка данных...</h1>}

			{/* Идём по массиву и отрисовываем наши запросы */}
			{!isLoading &&
				requestPillars.map(requestPillar => {
					// находим имя организации которая делает запрос
					const nameOrg = organizations.find(org => {
						return dataConnects?.connections.some(connect => connect.provider === org.id)
					})?.name

					// это строка которая содержит Улицу, дом и индекс дома если он есть
					// `${requestPillar?.pillar.street}, ${requestPillar?.pillar.building}${requestPillar?.pillar.
					// index ? requestPillar?.pillar.index : ''}`
					return (
						<article key={requestPillar?.id}>
							<DividerCustom />
							<ProfileRequest
								street={`${requestPillar?.pillar.street}, ${requestPillar?.pillar.building}${
									requestPillar?.pillar.index ? requestPillar?.pillar.index : ''
								}`}
								type={type!}
								currentNameOrganization={nameOrg!}
								pillarId={requestPillar?.id}
								answer={requestPillar?.ans}
								refetchConnectionLinks={refetchConnectionLinks}
							/>
						</article>
					)
				})}
		</section>
	)
}

export default ProfileRequestsElectricGrid
