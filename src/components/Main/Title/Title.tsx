import { Grid2, Typography } from '@mui/material'

const Title = () => {
	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// 1 Grid2 занимает все 12 столбцов
	// 2 и 3 Grid2 имеют size 3 и 9, это означает, что один занимает 3 столбца, а второй 9

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	return (
		<Grid2 container sx={{ mt: '120px' }}>
			<Grid2 size={12}>
				<Typography variant='h1' sx={{ fontSize: { xs: '2.2rem', md: '3rem', lg: '4.5rem' } }}>
					МЫ СЛЕДИМ ЗА КАЖДОЙ НИТЬЮ —
				</Typography>
			</Grid2>

			<Grid2 size={3}></Grid2>
			<Grid2 size={9}>
				<Typography
					variant='h2'
					sx={{ mt: 1, fontSize: { xs: '1.2rem', md: '1.7rem', lg: '3rem' } }}
				>
					ВАША СВЯЗЬ ВСЕГДА В ПОРЯДКЕ!
				</Typography>
			</Grid2>
		</Grid2>
	)
}

export default Title
