import React from 'react'
import { IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppSelector } from '../../hooks/react-redux'
import { NavLink } from 'react-router-dom'

export default function BurgerMenu() {
	// Достаём статус авторизованности из хранилища Redux Toolkit
	const isAuth = useAppSelector(state => state.authSlice.isAuth)
	// Делаем локальное состояние открытости закрытости "бургер меню"
	const [open, setOpen] = React.useState(false)

	// функция изменения открытости закрытости "бургер меню"
	const toggleDrawer = (val: any) => () => {
		setOpen(val)
	}

	// Элементы, которые будут в "бургер меню" и их маршруты
	const menuItems = [
		{ label: 'Главная', to: isAuth ? '/map' : '/' },
		{ label: 'О нас', to: '/aboutUs' },
		{ label: 'Контакты', to: '/contacts' },
		{ label: !isAuth ? 'Войти' : 'Профиль', to: !isAuth ? '/login' : '/profile' },
	]

	// Box это тоже аналог div, но который лучше подходит для адаптивности
	// List, ListItem - встроенные в MaterialUI компоненты, которые отображают наше меню
	return (
		<>
			{/* Это главная кнопка в виде 3 полосок. Отображается, когда "бургер меню" закрыто */}
			<IconButton
				onClick={toggleDrawer(true)}
				sx={{
					display: { md: 'none', xs: 'block' },
					position: 'absolute',
					top: 16,
					right: 16,
					bgcolor: 'transparent',
					'&:hover': { bgcolor: 'transparent' },
				}}
				aria-label='menu'
			>
				<MenuIcon />
			</IconButton>

			{/* Это само меню. Отображается, когда открыто */}
			<Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
				<Box
					sx={{ width: 250 }}
					role='presentation'
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
				>
					{/* Идём по массиву и выводим элементы меню */}
					<List>
						{menuItems.map(({ label, to }) => (
							<ListItem
								key={to}
								component={NavLink}
								to={to}
								// чтобы при клике "бургер меню" закрылось
								onClick={toggleDrawer(false)}
								sx={{
									'&.active > .MuiListItemText-root > span': {
										fontWeight: 'bold',
									},
								}}
							>
								<ListItemText primary={label} />
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
		</>
	)
}
