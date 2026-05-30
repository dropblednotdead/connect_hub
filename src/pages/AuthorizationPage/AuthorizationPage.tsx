import { Grid2, Typography } from '@mui/material'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import AuthorizationForm from '../../components/Authorization/AuthorizationForm/AuthorizationForm'

const AuthorizationPage = () => {
	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// 1 Grid2 занимает все 12 столбцов
	// 2 и 3 Grid2 имеют size 3 и 9, это означает, что один занимает 3 столбца, а второй 9

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	// AuthorizationForm это наш дочерний компонент

	return (
		<Grid2 container sx={{ mb: 10 }}>
			<Grid2 size={12} sx={{ display: 'flex', alignItems: 'end', mt: '120px' }}>
				<Typography variant='h3' sx={{ fontSize: { xs: '26px', md: '46px' } }}>
					ВОЙТИ
				</Typography>
				<ArrowOutwardRoundedIcon
					sx={{ marginLeft: 1, fontSize: { xs: '40px', md: '65px', lg: '65px' } }}
				/>
			</Grid2>

			<Grid2 size={{ md: 3, xs: 0 }}></Grid2>
			<Grid2 size={{ md: 5, xs: 12 }} sx={{ mt: 5 }}>
				<Typography sx={{ mb: 2 }}>Благодарим за выбор нас!</Typography>
				<Typography>
					Это позволит вам сохранить контроль над вашей связью и всегда быть в курсе последних
					обновлений.
				</Typography>

				<AuthorizationForm />
			</Grid2>
		</Grid2>
	)
}

export default AuthorizationPage
