import { Divider, Box, Grid2 } from '@mui/material'
import Title from '../../components/Main/Title/Title'
import Photo from '../../assets/Photo1.jpg'
import Rect434 from '../../assets/Rectangle 434.png'
import styles from './styles.module.css'
import ReasonsCreateAccount from '../../components/Main/ReasonsCreateAccount/ReasonsCreateAccount'
import AboutUs from '../../components/Main/AboutUs/AboutUs'
import Footer from '../../components/Main/Footer/Footer'
import RegistrationBlock from '../../components/Main/RegistrationBlock/RegistrationBlock'

const MainPage = () => {
	// Здесь все компоненты (блоки) нашей главной страницы
	// Divider это компонент из MaterialUI, который рисует нам линию
	return (
		<>
			<Title />
			<Divider sx={{ mt: '10px' }}></Divider>
			<RegistrationBlock />
			<Grid2 container spacing={2.5} sx={{ mt: '60px' }}>
				<Grid2 size={{ xs: 12, md: 8 }}>
					<img style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '20px', display: 'block' }} src={Photo} />
				</Grid2>
				<Grid2 size={{ xs: 12, md: 4 }}>
					<img style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '20px', display: 'block' }} src={Rect434} />
				</Grid2>
			</Grid2>
			<ReasonsCreateAccount />
			<AboutUs />
			<Footer />
		</>
	)
}

export default MainPage
