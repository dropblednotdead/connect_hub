import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IConnectionLink, IPillar, IPillarLink } from '../../interfaces/mapInterfaces'

// Типизация того, что хранится в состоянии
interface State {
	pillars: IPillar[]
	pillarLinks: IPillarLink[]
	connectionLinks: IConnectionLink[]
	pageSize: number
	page: number
}

// Объект состояния
const initialState: State = {
	pillars: [],
	pillarLinks: [],
	connectionLinks: [],
	pageSize: 3,
	page: 1,
}

// Шаблон из Redux Toolkit Query для создания хранилища с состоянием а также функциями
// изменения этого состояния
export const mapSlice = createSlice({
	name: 'mapSlice',
	initialState,
	reducers: {
		setPillars(state, action: PayloadAction<IPillar[]>) {
			state.pillars = action.payload
		},
		addPillars(state, action: PayloadAction<IPillar[]>) {
			const newPillars = action.payload.filter(
				p => !state.pillars.some(existing => existing.id === p.id)
			)
			state.pillars = [...state.pillars, ...newPillars]
		},
		addPillar(state, action: PayloadAction<IPillar>) {
			state.pillars.push(action.payload)
		},
		setPillarLinks(state, action: PayloadAction<IPillarLink[]>) {
			state.pillarLinks = action.payload
		},
		setConnectionLinks(state, action: PayloadAction<IConnectionLink[]>) {
			state.connectionLinks = action.payload
		},
		addConnectionLinks(state, action: PayloadAction<IConnectionLink>) {
			state.connectionLinks.push(action.payload)
		},
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload
		},
	},
})

export const {
	setPage,
	setPillars,
	addPillars,
	addPillar,
	setPillarLinks,
	setConnectionLinks,
	addConnectionLinks,
} = mapSlice.actions
export default mapSlice.reducer
