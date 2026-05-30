import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IConnectionLink, IPillar, IPillarLink } from '../../interfaces/mapInterfaces'

// Типизация того, что хранится в состоянии
interface State {
	pillars: IPillar[]
	pillarLinks: IPillarLink[]
	connectionLinks: IConnectionLink[]
	pageSize: number
	page: number
	focusedPillarCoords: [number, number] | null
}

// Объект состояния
const initialState: State = {
	pillars: [],
	pillarLinks: [],
	connectionLinks: [],
	pageSize: 3,
	page: 1,
	focusedPillarCoords: null,
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
		updatePillar(state, action: PayloadAction<IPillar>) {
			const index = state.pillars.findIndex(p => p.id === action.payload.id)
			if (index !== -1) {
				state.pillars[index] = action.payload
			}
		},
		removePillar(state, action: PayloadAction<number>) {
			state.pillars = state.pillars.filter(p => p.id !== action.payload)
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
		setFocusedPillarCoords(state, action: PayloadAction<[number, number] | null>) {
			state.focusedPillarCoords = action.payload
		},
	},
})

export const {
	setPage,
	setPillars,
	addPillars,
	addPillar,
	updatePillar,
	removePillar,
	setPillarLinks,
	setConnectionLinks,
	addConnectionLinks,
	setFocusedPillarCoords,
} = mapSlice.actions
export default mapSlice.reducer
