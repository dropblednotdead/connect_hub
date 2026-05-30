import { Divider } from '@mui/material'

// Компонент с линией во всю ширину
const DividerCustom = () => {
	return (
		<Divider
			sx={{
				width: '100%',
				backgroundColor: 'black',
				borderWidth: '1px',
				my: 4,
			}}
		/>
	)
}

export default DividerCustom
