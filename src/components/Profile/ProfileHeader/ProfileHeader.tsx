import { Box, Button, Typography, useTheme } from '@mui/material'
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded'
import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux'
import { clearUser } from '../../../store/slice/userSlice'
import { setAuth } from '../../../store/slice/authSlice'
import { useNavigate } from 'react-router-dom'

// типизация параметров ProfileHeader
interface Props {
	isSuperUser: boolean
}

const ProfileHeader = ({ isSuperUser }: Props) => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	// достаём имя нашей организации из хранилища Redux Toolkit
	const organizationName = useAppSelector(
		state => state.userSlice.user?.user_info?.organization.name
	)

	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	// если есть имя организации, то name равен ему, иначе если ты супер юзер, то ты администрация
	// иначе если ты не подтверждён, то названия нету
	const name = organizationName ? organizationName : isSuperUser ? 'Администрация' : ''

	// функция навигации из React Router Dom
	const navigate = useNavigate()

	// функция выхода
	const handleLogout = () => {
		// зануляем объект user в Redux
		dispatch(clearUser())
		// флаг авторизации делаем равным false
		dispatch(setAuth(false))
		// удаляем из хранилища браузера токен
		localStorage.removeItem('token')
		// делаем редирект на стр логина
		navigate('/login')
	}

	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// 1 Grid2 занимает все 12 столбцов
	// 2 и 3 Grid2 имеют size 3 и 9, это означает, что один занимает 3 столбца, а второй 9

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				gap: '15px',
				mx: { xs: -3, md: -8 }
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					py: '40px',
					pr: '30px',
					pl: { xs: 3, md: 8 },
					backgroundColor: 'rgba(131, 37, 144, 1)',
					borderRadius: { xs: '35px', sm: '0 35px 35px 0' },
					color: 'white'
				}}
			>
				<Typography variant='h4' sx={{ fontSize: { xs: '20px', md: '28px' } }}>
					{name}
				</Typography>
			</Box>

			<Button
				onClick={handleLogout}
				sx={{
					flexGrow: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					padding: { xs: '20px 40px', sm: '40px 50px' },
					backgroundColor: '#D590DF',
					borderRadius: { xs: '35px', sm: '35px 0 0 35px' },
					color: 'white',
					textTransform: 'none',
					'&:hover': {
						backgroundColor: '#C47CCF'
					}
				}}
			>
				<Typography component='span' sx={{ fontSize: '20px', textDecoration: 'underline' }}>Выйти</Typography>
				<TrendingFlatRoundedIcon sx={{ ml: 1, fontSize: '28px' }} />
			</Button>
		</Box>
	)
}

export default ProfileHeader
