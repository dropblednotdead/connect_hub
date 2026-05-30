import { Box } from '@mui/material'

// Компонент с линией во всю ширину
const DividerCustom = () => {
	return (
		<Box
			sx={{
				width: '100%',
				borderBottom: '1px solid #141414',
				my: 4,
			}}
		/>
	)
}

export default DividerCustom
