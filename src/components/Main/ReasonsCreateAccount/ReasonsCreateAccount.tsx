import { Box, Grid2, Stack, Typography, useTheme } from '@mui/material'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import { NavLink } from 'react-router-dom'
import planetSVG from '../../../assets/planet.svg'
import styles from './styles.module.css'

const ReasonsCreateAccount = () => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// Grid2 с атрибутом container это обёртка контейнер, которая задаёт определённые стили
	// для всей грид сетки

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	return (
		<Grid2 container sx={{ mt: { xs: 15, lg: 25 } }}>
			<Grid2 size={{ lg: 6, md: 6, xs: 12 }}>
				<Typography
					sx={{ fontFamily: '"ActayWide", sans-serif', fontSize: { xs: '32px', md: '46px' } }}
					variant='h2'
				>
					ЗАЧЕМ ВАМ ЗАВОДИТЬ АККАУНТ?
				</Typography>
			</Grid2>
			<Grid2 size={6}></Grid2>
			<Grid2 size={{ lg: 3.5, md: 3.5, xs: 0 }}></Grid2>
			<Grid2 size={{ lg: 4.8, md: 4.8, xs: 12 }}>
				<Typography sx={{ mt: 3, fontSize: { xs: '20px', lg: '18px' } }}>
					Если вы цените комфорт и удобство в использовании наших услуг, то мы предлагаем вам{' '}
					<NavLink to='/registration' style={{ color: theme.palette.primary.main }}>
						пройти регистрацию
					</NavLink>{' '}
					на нашем сайте.
				</Typography>
				<Stack
					gap={4}
					sx={{
						mt: 5,
						borderLeftWidth: '2px',
						borderLeftColor: theme.palette.secondary.main,
						borderLeftStyle: 'solid',
						paddingLeft: '10px',
					}}
				>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						Отслеживанние состояния и поиск оптимальных опор
					</Typography>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						Отправка заявки на подключение к опорам в один клик!
					</Typography>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						Устранение нелегальных подключений к опорам
					</Typography>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						Публикация актуальной информации для поиска новых провайдеров
					</Typography>
				</Stack>

				<Box sx={{ mt: '50px', display: 'flex' }}>
					<NavLink to='/registration'>
						<Typography variant='h6' sx={{ fontSize: { xs: '22px', md: '32px', lg: '24px' } }}>
							ЗАРЕГИСТРИРОВАТЬСЯ
						</Typography>
					</NavLink>
					<ArrowOutwardRoundedIcon sx={{ marginLeft: 1, fontSize: { lg: 30, md: 40, xs: 30 } }} />
				</Box>
			</Grid2>

			<img src={planetSVG} className={styles.planetImg} />
		</Grid2>
	)
}

export default ReasonsCreateAccount
