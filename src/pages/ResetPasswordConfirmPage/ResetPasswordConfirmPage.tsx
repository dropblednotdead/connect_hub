import { Grid2, Typography } from '@mui/material'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import ResetPasswordConfirmForm from '../../components/RecoverPassword/ResetPasswordConfirmForm/ResetPasswordConfirmForm'

const ResetPasswordConfirmPage = () => {
	return (
		<Grid2 container sx={{ mb: 10 }}>
			<Grid2
				size={{ lg: 8, xs: 12 }}
				sx={{ display: 'flex', alignItems: { xs: 'center', md: 'end' }, mt: '120px' }}
			>
				<Typography
					variant='h3'
					sx={{ display: 'inline-block', fontSize: { xs: '26px', md: '46px' } }}
				>
					ВВЕДИТЕ НОВЫЙ ПАРОЛЬ
				</Typography>
				<ArrowOutwardRoundedIcon
					sx={{ marginLeft: 1, fontSize: { xs: '40px', md: '65px', lg: '65px' } }}
				/>
			</Grid2>

			<Grid2 size={{ lg: 4, xs: 0 }}></Grid2>
			<Grid2 size={{ md: 3, xs: 0 }}></Grid2>
			<Grid2 size={{ md: 5, xs: 12 }} sx={{ mt: 5 }}>
				<Typography sx={{ mb: 2 }}>
					Придумайте новый надежный пароль для вашего аккаунта.
				</Typography>

				<ResetPasswordConfirmForm />
			</Grid2>
		</Grid2>
	)
}

export default ResetPasswordConfirmPage
