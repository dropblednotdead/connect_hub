import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Main from './pages/MainPage/MainPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage'
import MapPage from './pages/MapPage/MapPage'
import ContactsPage from './pages/ContactsPage/ContactsPage'
import RecoverPasswordPage from './pages/RecoverPasswordPage/RecoverPasswordPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import AuthProvider from './components/AuthProvider/AuthProvider'
import AboutUs from './pages/AboutUs/AboutUs'

// Routes - это просто компонент обёртка, для того, чтобы мы могли указывать много маршрутов
// Route - это компонент, который в element принимает компонент, который будет отрисовываться
// а в path принимает путь.
// index вместо path означает, что по умолчанию маршрут соответствует тому же пути, что и обёртка Route
// с нашим лейаутом (то есть компонент main будет отрисовываться также по маршруту /)

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Main />} />
				<Route path='/aboutUs' element={<AboutUs />} />
				<Route path='/registration' element={<RegistrationPage />} />
				<Route path='/login' element={<AuthorizationPage />} />
				<Route
					path='/map'
					element={
						// AuthProvider это обёртка, которая делает наш маршрут защищённым от неавторизованных
						// пользователей
						<AuthProvider>
							<MapPage />
						</AuthProvider>
					}
				/>
				<Route path='/contacts' element={<ContactsPage />} />
				<Route path='/recover' element={<RecoverPasswordPage />} />
				<Route
					path='/profile'
					element={
						// AuthProvider это обёртка, которая делает наш маршрут защищённым от неавторизованных
						// пользователей
						<AuthProvider>
							<ProfilePage />
						</AuthProvider>
					}
				/>
			</Route>
		</Routes>
	)
}

export default App
