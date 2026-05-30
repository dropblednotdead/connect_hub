import { Box, Typography } from '@mui/material'
import DividerCustom from '../../components/ui/DividerCustom'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux'
import { useGetOrganizationsQuery } from '../../api/authApi'
import { setOrganizations } from '../../store/slice/profileSlice'
import { useEffect } from 'react'
import RequestsList from '../../components/Requests/RequestsList/RequestsList'
import Footer from '../../components/Main/Footer/Footer'

const RequestsPage = () => {
	const type = useAppSelector(state => state.userSlice.user?.user_info?.type)
	const acceptStatus = useAppSelector(state => state.userSlice.user?.user_info?.accept_status)
	const organizations = useAppSelector(state => state.profileSlice.organizations)
	const dispatch = useAppDispatch()
	
	const { data: dataOrgs, isLoading: isLoadingOrgs } = useGetOrganizationsQuery()

	useEffect(() => {
		if (dataOrgs && organizations.length === 0 && !isLoadingOrgs) {
			dispatch(setOrganizations(dataOrgs))
		}
	}, [dataOrgs, isLoadingOrgs, dispatch, organizations.length])

	if (type !== 'электросетевая компания' || acceptStatus !== 'Принято') {
		return <Box sx={{ mt: 5 }}><Typography variant="h4">У вас нет доступа к этой странице.</Typography></Box>
	}

	return (
		<>
			<Box sx={{ backgroundColor: '#F5F2F5', py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 }, borderRadius: 3, mb: 4, mt: 4 }}>
				<Typography variant='h3' sx={{ fontSize: { xs: '2rem', md: '36px' }, mb: 3 }}>
					ЗАПРОСЫ НА ПОДСОЕДИНЕНИЕ
				</Typography>
				<DividerCustom />
				
				{!isLoadingOrgs && (
					<RequestsList organizations={organizations} />
				)}
			</Box>

			<Box sx={{ backgroundColor: '#F5F2F5', p: 3, borderRadius: 3, mb: 4 }}>
				<Footer />
			</Box>
		</>
	)
}

export default RequestsPage
