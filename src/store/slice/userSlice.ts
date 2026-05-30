import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '../../interfaces/usersInterfaces'

// Типизация того, что хранится в состоянии
interface State {
	user: UserData | null
}

// Объект состояния
const initialState: State = {
	user: {
		id: null,
		email: '',
		username: '',
		user_info: null,
		is_superuser: false,
	},
}

// Шаблон из Redux Toolkit Query для создания хранилища с состоянием а также функциями
// изменения этого состояния
const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserData>) {
			state.user = action.payload
		},
		clearUser(state) {
			state.user = null
		},
	},
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
