import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IConnection } from '../../interfaces/profileInterfaces'
import { IOrganization } from '../../interfaces/authInterfaces'

// Типизация того, что хранится в состоянии
interface State {
	connections: IConnection[]
	organizations: IOrganization[]
}

// Объект состояния
const initialState: State = {
	connections: [],
	organizations: [],
}

// Шаблон из Redux Toolkit Query для создания хранилища с состоянием а также функциями
// изменения этого состояния
export const profileSlice = createSlice({
	name: 'profileSlice',
	initialState,
	reducers: {
		setConnection(state, action: PayloadAction<IConnection[]>) {
			state.connections = action.payload
		},
		addConnection(state, action: PayloadAction<IConnection>) {
			state.connections.push(action.payload)
		},
		setOrganizations(state, action: PayloadAction<IOrganization[]>) {
			state.organizations = action.payload
		},
	},
})

export const { setConnection, addConnection, setOrganizations } = profileSlice.actions
export default profileSlice.reducer
