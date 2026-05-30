import axios from 'axios'
import { BASE_URL } from '../constants/constants'

// Это настройка кастомного Axios-инстанса
// Он устанавливает базовый URL и отключает передачу кук
// В каждый запрос автоматически добавляет токен из localStorage
// Это нужно для авторизации пользователя без ручного добавления заголовков каждый раз

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	withCredentials: false,
})

axiosInstance.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Token ${token}`
	}
	return config
})

export default axiosInstance
