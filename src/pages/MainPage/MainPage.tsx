import { Divider, Box, Grid2 } from '@mui/material'
import Title from '../../components/Main/Title/Title'
import Photo from '../../assets/Photo.png'
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
			<Box sx={{ mt: '60px' }}>
				<img style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '20px', display: 'block' }} src={Photo} />
			</Box>
			<ReasonsCreateAccount />
			<AboutUs />
			<Footer />
		</>
	)
}

export default MainPage
