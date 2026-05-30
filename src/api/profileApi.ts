import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'
import {
	IConnection,
	RequestApproveConnection,
	RequestSendConnection,
	ResponseApproveConnection,
	ResponseSendConnection,
} from '../interfaces/profileInterfaces'

// это базовый шаблон конструктора Redux Toolkit Query

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: axiosBaseQuery(),
	endpoints: builder => ({
		/* Это запрос на получение всех подключений */
		getConnection: builder.query<{ connections: IConnection[] }, void>({
			query: () => ({
				url: '/connection',
				method: 'GET',
			}),
			keepUnusedDataFor: 0,
		}),
		/* Это запрос на отправку запроса на подключение */
		sendConnectionRequest: builder.mutation<ResponseSendConnection, RequestSendConnection>({
			query: body => ({
				url: '/connection/',
				method: 'POST',
				data: body,
			}),
		}),
		/* Это запрос на отправку подтверждения подключения */
		approveConnectionRequest: builder.mutation<ResponseApproveConnection, RequestApproveConnection>(
			{
				query: body => ({
					url: `connection_links/${body.id}/`,
					method: 'PATCH',
					data: {
						...(body.answer === 'pole_a_answer' ? { pole_a_answer: true } : {}),
						...(body.answer === 'pole_b_answer' ? { pole_b_answer: true } : {}),
					},
				}),
			}
		),
	}),
})

export const {
	useGetConnectionQuery,
	useSendConnectionRequestMutation,
	useApproveConnectionRequestMutation,
} = profileApi
