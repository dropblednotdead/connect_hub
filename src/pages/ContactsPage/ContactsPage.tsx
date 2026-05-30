import { Box, Grid2, Typography, useTheme } from '@mui/material'
import DividerCustom from '../../components/ui/DividerCustom'
import planetSVG from '../../assets/planet.svg'
import styles from './styles.module.css'

const ContactsPage = () => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// 1 Grid2 занимает все 12 столбцов
	// 2 и 3 Grid2 имеют size 3 и 9, это означает, что один занимает 3 столбца, а второй 9

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	// DividerCustom это наш дочерний компонент

	return (
		<Grid2 container>
			<Grid2 size={12} sx={{ display: 'flex', alignItems: 'end', mt: '120px' }}>
				<Typography variant='h3' sx={{ fontSize: { xs: '26px', md: '46px' } }}>
					КОНТАКТЫ
				</Typography>
			</Grid2>

			<Grid2 size={{ md: 3, xs: 0 }}></Grid2>
			<Grid2 size={{ md: 5, xs: 12 }} sx={{ mt: 5 }}>
				<Typography sx={{ fontSize: '18px', mb: 2, color: theme.palette.secondary.main }}>
					Адрес
				</Typography>
				<Typography sx={{ mb: 6, fontSize: '18px' }}>
					г. Нижний Новгород, площадь Минина и Пожарского,{' '}
				</Typography>

				<Typography sx={{ mb: 2, fontSize: '18px', color: theme.palette.secondary.main }}>
					Телефон обратной связи
				</Typography>
				<Typography sx={{ mb: 6, fontSize: '18px' }}>+7 (999) 752-52-52</Typography>

				<Typography sx={{ mb: 2, fontSize: '18px', color: theme.palette.secondary.main }}>
					Эл. почта
				</Typography>
				<Typography sx={{ mb: 2, fontSize: '18px' }}>connect-hub@info.comX-XX-XX</Typography>
			</Grid2>

			<Grid2 size={4}>
				<img src={planetSVG} className={styles.planetImg} />
			</Grid2>

			<Grid2 size={12} sx={{ mt: 25 }}>
				<DividerCustom />

				<Box
					sx={{
						mt: 5,
						mb: 3,
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Typography>Политика коденфициальности</Typography>
					<Typography>Cookies</Typography>
				</Box>
			</Grid2>
		</Grid2>
	)
}

export default ContactsPage
