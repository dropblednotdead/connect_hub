import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { AxiosError, AxiosRequestConfig } from 'axios'
import axiosInstance from './axiosInstance'

type axiosBaseQueryResponse = BaseQueryFn<
	{
		url: string
		method: AxiosRequestConfig['method']
		data?: AxiosRequestConfig['data']
		params?: AxiosRequestConfig['params']
	},
	unknown,
	unknown
>

// Это базовая конструкция, которая создаёт запросы
// с помощью Axios и оборачивает их в формат, понятный Redux Toolkit Query.
// Она позволяет подключить кастомную логику запросов к RTK Query
// вместо стандартного fetch и использовать Axios для удобной работы с API.

export const axiosBaseQuery = (): axiosBaseQueryResponse => {
	return async ({ url, method, data, params }) => {
		try {
			const result = await axiosInstance({ url, method, data, params })
			return { data: result.data }
		} catch (axiosError) {
			const err = axiosError as AxiosError
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			}
		}
	}
}
