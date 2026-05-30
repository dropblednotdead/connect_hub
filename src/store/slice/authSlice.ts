import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Типизация того, что хранится в состоянии
interface State {
	isInitialized: boolean
	isAuth: boolean
}

// Объект состояния
const initialState: State = {
	isInitialized: false,
	isAuth: false,
}

// Шаблон из Redux Toolkit Query для создания хранилища с состоянием а также функциями
// изменения этого состояния
export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		},
		setInitialized(state, action: PayloadAction<boolean>) {
			state.isInitialized = action.payload
		},
	},
})

export const { setAuth, setInitialized } = authSlice.actions
export default authSlice.reducer
