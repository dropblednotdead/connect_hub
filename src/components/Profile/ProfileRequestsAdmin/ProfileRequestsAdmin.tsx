import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux'
import { setOrganizations } from '../../../store/slice/profileSlice'
import ProfileRequest from '../ProfileRequest/ProfileRequest'
import DividerCustom from '../../ui/DividerCustom'
import { useGetOrganizationsQuery } from '../../../api/authApi'
import { useFindStreetAndProviders } from '../../../hooks/useFindStreetAndProviders'

const ProfileRequestsAdmin = () => {
	// Здесь мы из хранилища Redux Toolkit достаём организации
	const organizations = useAppSelector(state => state.profileSlice.organizations)
	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	// здесь мы вызываем свою кастомную функцию, которая отдаёт нам подключения
	// улицы, магистральщика и сетевика и флаг загрузки
	const { connections, streets, owners, isLoading } = useFindStreetAndProviders()

	// Здесь мы делаем запрос за организациями, в ответе получаем данные и флаг загрузки
	const { data: dataOrgs, isLoading: isLoadingOrgs } = useGetOrganizationsQuery()

	useEffect(() => {
		// если у нас данные есть и в хранилище Redux их нету и загрузка завершена
		if (dataOrgs && !isLoadingOrgs && organizations.length === 0) {
			// сохраняем полученные организации в хранилище Redux
			dispatch(setOrganizations(dataOrgs))
		}
	}, [dataOrgs, isLoadingOrgs])

	return (
		<section>
			{/* Если загрузки, то показываем заголовок */}
			{(isLoading || isLoadingOrgs) && <h1>Загрузка данных...</h1>}

			{/* Иначе идём по массиву и выводим наши запросы */}
			{!isLoading &&
				!isLoadingOrgs &&
				organizations.length !== 0 &&
				connections.map(connect => {
					return (
						<article key={connect.id}>
							<DividerCustom />
							<ProfileRequest
								street={streets}
								currentNameOrganization={owners}
								status={connect.status}
							/>
						</article>
					)
				})}
		</section>
	)
}

export default ProfileRequestsAdmin
