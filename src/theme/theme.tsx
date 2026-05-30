import { createTheme } from '@mui/material'

// Объект темы из MaterialUI
// содержит кастомные шрифты и цвета

export const theme = createTheme({
	typography: {
		h1: {
			fontFamily: 'ActayWide, sans-serif',
		},
		h2: {
			fontFamily: 'ActayWide, sans-serif',
		},
		h3: {
			fontFamily: 'ActayWide, sans-serif',
		},
		h4: {
			fontFamily: 'ActayWide, sans-serif',
		},
		h5: {
			fontFamily: 'ActayWide, sans-serif',
		},
		h6: {
			fontFamily: 'ActayWide, sans-serif',
		},
		body1: {
			fontFamily: 'Cygre, serif',
		},
		body2: {
			fontFamily: 'Cygre, serif',
		},
	},
	palette: {
		primary: {
			main: '#832590',
		},
		secondary: {
			main: '#ADADAD',
		},
	},
})
