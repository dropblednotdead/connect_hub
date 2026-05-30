import { Grid2, Typography, useTheme } from '@mui/material'
import photo from '../../../assets/Rectangle 433 (1) 1.png'

const Title = () => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()
	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// 1 Grid2 занимает все 12 столбцов
	// 2 и 3 Grid2 имеют size 3 и 9, это означает, что один занимает 3 столбца, а второй 9

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	return (
		<Grid2 container sx={{ mt: '120px' }}>
			<Grid2 size={8}>
				<Typography variant='h1' sx={{ fontSize: { xs: '2.2rem', md: '3rem', lg: '4.5rem' } }}>
					ОТ ПЕРВЫХ КИЛОМЕТРОВ —
				</Typography>
			</Grid2>

			<Grid2 size={4}></Grid2>

			<Grid2 size={3}></Grid2>
			<Grid2 size={9}>
				<Typography
					variant='h2'
					sx={{ mt: 1, fontSize: { xs: '1.2rem', md: '1.7rem', lg: '3rem' } }}
				>
					К ТЫСЯЧАМ ПОД КОНТРОЛЕМ:
				</Typography>
			</Grid2>

			<Grid2 size={3}></Grid2>
			<Grid2 size={9}>
				<Typography
					variant='h2'
					sx={{
						mt: 1,
						fontSize: { xs: '1.2rem', md: '1.7rem', lg: '2rem' },
						color: theme.palette.secondary.main,
					}}
				>
					КАК МЫ СТРОИМ НАДЁЖНЫЕ СЕТИ
				</Typography>
			</Grid2>

			<Grid2 size={12} sx={{ my: 5 }}>
				<img src={photo} style={{ width: '100%' }} />
			</Grid2>
		</Grid2>
	)
}

export default Title
