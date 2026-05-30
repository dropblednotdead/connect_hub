import { createApi } from '@reduxjs/toolkit/query/react'
import {
	IConnectionLink,
	IPillar,
	IPillarLink,
	IAddPillar,
	ResponseGetPillars,
} from '../interfaces/mapInterfaces'
import { axiosBaseQuery } from './axiosBaseQuery'

// это базовый шаблон конструктора Redux Toolkit Query

export const mapApi = createApi({
	reducerPath: 'mapApi',
	baseQuery: axiosBaseQuery(),
	endpoints: builder => ({
		/* Это запрос на получение всех опор */
		getPillars: builder.query<ResponseGetPillars, { page?: number; pageSize?: number }>({
			query: ({ pageSize, page }) => {
				const queryPath = `${pageSize ? 'size=' + pageSize : ''}&${page ? 'page=' + page : ''} `
				return {
					url: `/poles/?${queryPath}`,
					method: 'GET',
				}
			},
		}),
		/* Это запрос на получение линий */
		getPillarLinks: builder.query<IPillarLink[], void>({
			query: () => ({
				url: '/pole_links',
				method: 'GET',
			}),
		}),
		/* Это запрос на получение подключённых линий */
		getConnectionLinks: builder.query<{ connection_links: IConnectionLink[] }, void>({
			query: () => ({
				url: '/connection_links',
				method: 'GET',
			}),
		}),
		/* Это запрос на добавление опоры */
		addPillar: builder.mutation<IPillar, IAddPillar>({
			query: body => ({
				url: '/poles/',
				method: 'POST',
				data: body,
			}),
		}),
	}),
})

export const {
	useGetPillarsQuery,
	useGetPillarLinksQuery,
	useGetConnectionLinksQuery,
	useAddPillarMutation,
} = mapApi
