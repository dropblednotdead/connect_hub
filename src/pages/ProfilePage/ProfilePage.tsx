import { Box } from '@mui/material'
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader'
import ProfileTitle from '../../components/Profile/ProfileTitle/ProfileTitle'
import DividerCustom from '../../components/ui/DividerCustom'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux'
import ProfileRequestsBackbone from '../../components/Profile/ProfileRequestsBackbone/ProfileRequestsBackbone'
import ProfileRequestsElectricGrid from '../../components/Profile/ProfileRequestsElectricGrid/ProfileRequestsElectricGrid'
import ProfileRequestsAdmin from '../../components/Profile/ProfileRequestsAdmin/ProfileRequestsAdmin'
import { useGetOrganizationsQuery } from '../../api/authApi'
import { setOrganizations } from '../../store/slice/profileSlice'
import { useEffect } from 'react'

const ProfilePage = () => {
	// Здесь мы из хранилища Redux Toolkit достаём тип организации
	const type = useAppSelector(state => state.userSlice.user?.user_info?.type)

	// Здесь мы из хранилища Redux Toolkit достаём статус подтверждённости заказа
	const acceptStatus = useAppSelector(state => state.userSlice.user?.user_info?.accept_status)

	// Здесь мы из хранилища Redux Toolkit достаём флаг супер юзер ли пользователь
	const isSuperUser = useAppSelector(state => state.userSlice.user?.is_superuser)

	// Здесь мы из хранилища Redux Toolkit достаём организации
	const organizations = useAppSelector(state => state.profileSlice.organizations)
	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	// Здесь мы делаем запрос за организациями, в ответе получаем данные и флаг загрузки
	const { data: dataOrgs, isLoading: isLoadingOrgs } = useGetOrganizationsQuery()

	useEffect(() => {
		// если у нас данные есть и в хранилище Redux их нету и загрузка завершена
		if (dataOrgs && organizations.length === 0 && !isLoadingOrgs) {
			// сохраняем полученные организации в хранилище Redux
			dispatch(setOrganizations(dataOrgs))
		}
	}, [dataOrgs, isLoadingOrgs])

	// Box это тоже аналог div, но который лучше подходит для адаптивности
	return (
		<Box sx={{ mb: 10, mt: 2 }}>
			<ProfileHeader isSuperUser={isSuperUser!} />
			<ProfileTitle type={type!} acceptStatus={acceptStatus} isSuperUser={isSuperUser!} />

			{/* Если ты магистральный провайдер и аккаунт подтверждён, то ты видишь это */}
			{type === 'магистральный провайдер' && acceptStatus && (
				<ProfileRequestsBackbone type={type} />
			)}

			{/* Если ты электросетевая компания и аккаунт подтверждён, то ты видишь это */}
			{type === 'электросетевая компания' && !isLoadingOrgs && acceptStatus && (
				<ProfileRequestsElectricGrid organizations={organizations} type={type} />
			)}

			{/* Если ты супер юзер, то ты видишь это */}
			{isSuperUser && <ProfileRequestsAdmin />}
			{/* Если аккаунт не подтвержён видишь просто линию */}
			{(isSuperUser || acceptStatus) && <DividerCustom />}
		</Box>
	)
}

export default ProfilePage
