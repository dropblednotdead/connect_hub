import { Grid2, Typography } from '@mui/material'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import RecoverForm from '../../components/RecoverPassword/RecoverForm/RecoverForm'

const RecoverPasswordPage = () => {
	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// 1 Grid2 занимает все 12 столбцов
	// 2 и 3 Grid2 имеют size 3 и 9, это означает, что один занимает 3 столбца, а второй 9

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	// RecoverForm это наш дочерний компонент

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
					ВОССТАНОВИТЬ ПАРОЛЬ
				</Typography>
				<ArrowOutwardRoundedIcon
					sx={{ marginLeft: 1, fontSize: { xs: '40px', md: '65px', lg: '65px' } }}
				/>
			</Grid2>

			<Grid2 size={{ lg: 4, xs: 0 }}></Grid2>
			<Grid2 size={{ md: 3, xs: 0 }}></Grid2>
			<Grid2 size={{ md: 5, xs: 12 }} sx={{ mt: 5 }}>
				<Typography sx={{ mb: 2 }}>
					Укажите эл. почту, на которую зарегистрирован аккаунт, мы вышлем Ваши логин и пароль
				</Typography>

				<RecoverForm />
			</Grid2>
		</Grid2>
	)
}

export default RecoverPasswordPage
