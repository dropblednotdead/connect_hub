import { Box, Typography } from '@mui/material'
import useGroupedConnectionRequests from '../../../hooks/useGroupedConnectionRequests'
import { IOrganization } from '../../../interfaces/authInterfaces'
import DividerCustom from '../../ui/DividerCustom'
import RequestGroupItem from './RequestGroupItem'

interface Props {
	organizations: IOrganization[]
}

const RequestsList = ({ organizations }: Props) => {
	const { isLoading, groupedRequests, refetchConnectionLinks } = useGroupedConnectionRequests(false)

	if (isLoading) return <h1>Загрузка данных...</h1>

	if (groupedRequests.length === 0) {
		return <Typography sx={{ mt: 3, fontSize: '20px' }}>Нет активных заявок.</Typography>
	}

	return (
		<Box>
			{groupedRequests.map(group => {
				const orgName = organizations.find(org => org.id === group.providerId)?.name || 'Неизвестная организация'
				
				return (
					<Box key={group.connectionId} sx={{ mt: 3, mb: 3 }}>
						<RequestGroupItem 
							group={group} 
							orgName={orgName} 
							refetchConnectionLinks={refetchConnectionLinks} 
						/>
						<DividerCustom />
					</Box>
				)
			})}
		</Box>
	)
}

export default RequestsList
