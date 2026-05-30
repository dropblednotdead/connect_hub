import { useEffect } from 'react'
import { useGetConnectionQuery } from '../../../api/profileApi'
import { useAppDispatch } from '../../../hooks/react-redux'
import useGroupedConnectionRequests from '../../../hooks/useGroupedConnectionRequests'
import { TypeOrganization } from '../../../interfaces/usersInterfaces'
import { setConnection } from '../../../store/slice/profileSlice'
import DividerCustom from '../../ui/DividerCustom'
import { IOrganization } from '../../../interfaces/authInterfaces'
import { Box, Typography } from '@mui/material'
import ProfileHistoryGroupItem from './ProfileHistoryGroupItem'

interface Props {
	type: TypeOrganization
	organizations: IOrganization[]
}

const ProfileRequestsElectricGrid = ({ type, organizations }: Props) => {
	const dispatch = useAppDispatch()
	const { isLoading, groupedRequests } = useGroupedConnectionRequests(true)
	const { data: dataConnects, isLoading: isLoadingConnects } = useGetConnectionQuery()

	useEffect(() => {
		if (dataConnects && !isLoadingConnects) {
			dispatch(setConnection(dataConnects.connections))
		}
	}, [dataConnects, isLoadingConnects, dispatch])

	return (
		<section>
			{isLoading && <h1>Загрузка данных...</h1>}
            {!isLoading && (
				<Box sx={{ backgroundColor: '#F5F2F5', py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 }, borderRadius: 3, mb: 4, mt: 4 }}>
					<Typography variant='h3' sx={{ fontSize: { xs: '2rem', md: '36px' }, mb: 3 }}>
						ИСТОРИЯ ЗАПРОСОВ
					</Typography>
					<DividerCustom />
					
					{groupedRequests.length === 0 ? (
						<Typography sx={{ mt: 3, fontSize: '20px' }}>У вас пока нет обработанных заявок.</Typography>
					) : (
						groupedRequests.map(group => {
							const orgName = organizations.find(org => org.id === group.providerId)?.name || 'Неизвестная организация'
							
							return (
								<Box key={group.connectionId} sx={{ mt: 3, mb: 3 }}>
									<ProfileHistoryGroupItem 
										group={group} 
										orgName={orgName} 
									/>
									<DividerCustom />
								</Box>
							)
						})
					)}
				</Box>
            )}
		</section>
	)
}

export default ProfileRequestsElectricGrid
