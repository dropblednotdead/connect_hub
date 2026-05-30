import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'
import { UserData } from '../interfaces/usersInterfaces'
import { IOrganization, RequestRegistration } from '../interfaces/authInterfaces'

// это базовый шаблон конструктора Redux Toolkit Query

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: axiosBaseQuery(),
	endpoints: builder => ({
		/* Это запрос на вход в аккаунт */
		login: builder.mutation<{ auth_token: string }, { username: string; password: string }>({
			query: body => ({
				url: '/auth/token/login',
				method: 'POST',
				data: body,
			}),
		}),
		/* Это запрос на выход из аккаунта */
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/auth/token/logout',
				method: 'POST',
			}),
		}),
		/* Это запрос на регистрацию */
		registration: builder.mutation<void, RequestRegistration>({
			query: body => ({
				url: '/auth/users/',
				method: 'POST',
				data: body,
			}),
		}),
		/* Это запрос на проверку авторизованности */
		authMe: builder.query<UserData, void>({
			query: () => ({
				url: '/auth/users/me',
				method: 'GET',
			}),
		}),
		/* Это запрос на получение всех организаций */
		getOrganizations: builder.query<IOrganization[], void>({
			query: () => ({
				url: '/organizations',
				method: 'GET',
			}),
		}),
		/* Это запрос на получение организации */
		getOrganizationById: builder.query<IOrganization, number>({
			query: id => ({
				url: `/organizations/${id}`,
				method: 'GET',
			}),
		}),
	}),
})

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegistrationMutation,
	useAuthMeQuery,
	useLazyAuthMeQuery,
	useGetOrganizationsQuery,
	useLazyGetOrganizationByIdQuery,
} = authApi
