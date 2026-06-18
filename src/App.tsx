import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Main from './pages/MainPage/MainPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage'
import MapPage from './pages/MapPage/MapPage'
import ContactsPage from './pages/ContactsPage/ContactsPage'
import RecoverPasswordPage from './pages/RecoverPasswordPage/RecoverPasswordPage'
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import AuthProvider from './components/AuthProvider/AuthProvider'
import AboutUs from './pages/AboutUs/AboutUs'
import RequestsPage from './pages/RequestsPage/RequestsPage'
import SupportPage from './pages/SupportPage/SupportPage'

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
				<Route path='/support' element={<SupportPage />} />
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
				<Route
					path='/requests'
					element={
						<AuthProvider>
							<RequestsPage />
						</AuthProvider>
					}
				/>
				<Route path='/contacts' element={<ContactsPage />} />
				<Route path='/recover' element={<RecoverPasswordPage />} />
				<Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirmPage />} />
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
