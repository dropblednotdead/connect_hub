import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import mapSlice from './slice/mapSlice'
import userSlice from './slice/userSlice'
import profileSlice from './slice/profileSlice'
import { mapApi } from '../api/mapApi'
import { authApi } from '../api/authApi'
import { profileApi } from '../api/profileApi'

export const store = configureStore({
	reducer: {
		authSlice,
		mapSlice,
		userSlice,
		profileSlice,
		[authApi.reducerPath]: authApi.reducer,
		[mapApi.reducerPath]: mapApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([authApi.middleware, mapApi.middleware, profileApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
