import { Checkbox, FormControlLabel, useTheme } from '@mui/material'

// типизация параметров СonsentСheckbox
interface Props {
	value: boolean
	onBlur: (e: React.FocusEvent<any>) => void
	onChange: (e: React.ChangeEvent<any>) => void
}

// компонент с чекбоксом
const СonsentСheckbox = ({ value, onBlur, onChange }: Props) => {
	const theme = useTheme()

	return (
		<FormControlLabel
			value={value}
			onBlur={onBlur}
			onChange={onChange}
			name='checkbox'
			sx={{ color: theme.palette.secondary.main }}
			control={<Checkbox sx={{ marginLeft: 1 }} />}
			label='Согласие на обработку персональных данных'
		/>
	)
}

export default СonsentСheckbox
