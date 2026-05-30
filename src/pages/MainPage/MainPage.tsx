import { Divider } from '@mui/material'
import Title from '../../components/Main/Title/Title'
import Photo from '../../assets/Photo1.jpg'
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
			<img className={styles.photo} src={Photo} />
			<ReasonsCreateAccount />
			<AboutUs />
			<Footer />
		</>
	)
}

export default MainPage
