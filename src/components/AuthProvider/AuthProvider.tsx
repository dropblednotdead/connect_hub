import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/react-redux'
import { useEffect } from 'react'

// это типизация входных параметров в наш AuthProvider
interface Props {
	children: React.ReactNode
}

// В качестве аргумента мы принимаем специальный проп children
// это означает, что этот компонент, можно использовать только как обёртку компонент
// и внутри него должен быть обязательно минимум 1 тег
const AuthProvider = ({ children }: Props) => {
	// Достаём флаг авторизации из хранилища Redux Toolkit
	const isAuth = useAppSelector(state => state.authSlice.isAuth)

	// Достаём функции навигации из React Router Dom
	const navigate = useNavigate()

	useEffect(() => {
		// Если флаг авторизованности false, то делаем редирект на стр логина
		if (!isAuth) navigate('/login')
	}, [isAuth, navigate])

	// При первой отрисовки, если isAuth = false, то тогда мы ничего не возвращаем
	if (!isAuth) return null

	// Иначе мы возвращаем наши дочерние элементы, которые мы обернули
	return children
}

export default AuthProvider
