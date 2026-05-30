import { Grid2, Typography } from '@mui/material'
import { theme } from '../../../theme/theme'

const History = () => {
	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// 1 Grid2 занимает все 12 столбцов
	// 2 и 3 Grid2 имеют size 3 и 9, это означает, что один занимает 3 столбца, а второй 9

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу

	return (
		<Grid2 container sx={{ mt: '50px' }}>
			<Grid2 size={6}>
				<Typography
					variant='h1'
					sx={{
						color: theme.palette.secondary.main,
						fontSize: { xs: '2.2rem', md: '3rem', lg: '3rem' },
					}}
				>
					ИСТОРИЯ НАШЕЙ КОМПАНИИ
				</Typography>
			</Grid2>

			<Grid2 size={6}></Grid2>

			<Grid2 size={3}></Grid2>
			<Grid2 size={9} sx={{ mt: 3 }}>
				<Typography variant='body1' sx={{ mt: 1, fontSize: { xs: '18px', lg: '20px' } }}>
					<span style={{ fontWeight: 'bold' }}>ConnectHub</span> появилась на стыке инженерной
					точности и стремления к инновациям. С 2012 года мы строим будущее, в{' '}
					<span style={{ fontStyle: 'italic', color: theme.palette.primary.main }}>
						котором качество связи — не случайность
					</span>
					, а результат точной диагностики и постоянного контроля. Наша миссия — обеспечить
					стабильность оптоволоконных сетей с помощью передовых технологий мониторинга, предугадывая
					неполадки до того, как они станут проблемой. Мы начинали с небольшого коллектива
					энтузиастов, а сегодня нас знают как одного из лидеров в области интеллектуального
					мониторинга оптоволоконной инфраструктуры.
				</Typography>
			</Grid2>
		</Grid2>
	)
}

export default History
