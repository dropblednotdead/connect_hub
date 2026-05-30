import { Grid2, Typography, useTheme } from '@mui/material'

const Statistics = () => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// 1 Grid2 занимает все 12 столбцов
	// 2 и 3 Grid2 имеют size 3 и 9, это означает, что один занимает 3 столбца, а второй 9

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу

	return (
		<>
			<Grid2 container sx={{ mt: '120px', alignItems: 'center', borderBottom: '1px solid black' }}>
				<Grid2 size={3} sx={{ pb: 2 }}>
					<Typography
						variant='h1'
						sx={{
							fontSize: { xs: '2.2rem', md: '5rem', lg: '6.5rem' },
						}}
					>
						1200
					</Typography>
				</Grid2>

				<Grid2 size={5} sx={{ pl: 1, pb: 2 }}>
					<Typography
						variant='body1'
						sx={{
							fontSize: { xs: '14px', sm: '1.5rem' },
						}}
					>
						1 200 км волокон ежедневно под нашим контролем
					</Typography>
				</Grid2>

				<Grid2
					size={4}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						pb: 2,
						pl: 3,
						borderLeft: '1px solid black',
					}}
				>
					<Typography
						variant='h1'
						sx={{
							color: theme.palette.secondary.main,
							fontSize: { xs: '2rem', md: '3rem', lg: '5rem' },
						}}
					>
						13 лет
					</Typography>

					<Typography
						variant='body1'
						sx={{
							color: theme.palette.secondary.main,
							fontSize: { xs: '11px', sm: '1.2rem' },
						}}
					>
						на рынке телекоммуникаций и сетевой диагностики
					</Typography>
				</Grid2>
			</Grid2>

			<Grid2 container sx={{ mb: '50px', borderBottom: '1px solid black' }}>
				<Grid2
					size={4}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						py: 3,
						px: 2,
					}}
				>
					<Typography
						variant='h1'
						sx={{
							color: theme.palette.secondary.main,
							fontSize: { xs: '2rem', md: '3rem', lg: '5rem' },
						}}
					>
						500+
					</Typography>

					<Typography
						variant='body1'
						sx={{
							color: theme.palette.secondary.main,
							fontSize: { xs: '14px', sm: '1.2rem' },
						}}
					>
						успешных проектов по всей стране
					</Typography>
				</Grid2>

				<Grid2
					size={4}
					sx={{
						px: { sm: 4, xs: 1 },
						py: 3,
						borderLeft: '1px solid black',
						borderRight: '1px solid black',
					}}
				>
					<Typography
						variant='h1'
						sx={{
							color: theme.palette.secondary.main,
							fontSize: { xs: '2rem', md: '3rem', lg: '5rem' },
						}}
					>
						99,8%
					</Typography>

					<Typography
						variant='body1'
						sx={{
							color: theme.palette.secondary.main,
							fontSize: { xs: '12px', sm: '1.2rem' },
						}}
					>
						клиентов продлевают сотрудничество с нами после первого года
					</Typography>
				</Grid2>

				<Grid2 size={4} sx={{ px: 3, py: 3 }}>
					<Typography
						variant='h1'
						sx={{
							color: theme.palette.secondary.main,
							fontSize: { xs: '2rem', md: '3rem', lg: '5rem' },
						}}
					>
						97%
					</Typography>

					<Typography
						variant='body1'
						sx={{
							color: theme.palette.secondary.main,
							fontSize: { xs: '14px', sm: '1.2rem' },
						}}
					>
						заявленных сбоев локализуются в течение первых 15 минут
					</Typography>
				</Grid2>
			</Grid2>
		</>
	)
}

export default Statistics
