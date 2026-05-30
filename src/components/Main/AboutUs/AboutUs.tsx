import { Grid2, Typography } from '@mui/material'
import Photo2 from '../../../assets/Photo2.jpg'
import styles from './styles.module.css'
import CustomizedAccordions from './Accordion/Accordion'

const AboutUs = () => {
	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// Grid2 с атрибутом container это обёртка контейнер, которая задаёт определённые стили
	// для всей грид сетки

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу

	// Компонент CustomizedAccordions это наш дочерний компонент
	return (
		<Grid2 container sx={{ mt: { xs: 15, lg: 25 } }}>
			<Grid2 size={12}>
				<Typography
					sx={{
						fontFamily: '"ActayWide", sans-serif',
						fontSize: { xs: '32px', md: '46px' },
					}}
					variant='h2'
				>
					О НАС
				</Typography>
			</Grid2>

			<Grid2 size={{ lg: 3, xs: 0 }}></Grid2>
			<Grid2 size={{ lg: 7, xs: 12 }}>
				<Typography sx={{ mt: 3, fontSize: { xs: '20px', lg: '18px' } }}>
					Мы обладаем богатым опытом и профессиональными знаниями в области электросетевой
					инфраструктуры. Мы используем современное оборудование и методы, которые позволяют нам
					эффективно решать самые сложные задачи.
				</Typography>
			</Grid2>
			<Grid2 size={{ lg: 2, xs: 0 }}></Grid2>

			<Grid2 size={{ lg: 3, xs: 0 }}></Grid2>
			<Grid2 size={{ lg: 9, xs: 12 }}>
				<img src={Photo2} className={styles.photo} />
			</Grid2>

			<Grid2 size={{ lg: 3, xs: 0 }}></Grid2>
			<Grid2 size={{ lg: 9, xs: 12 }}>
				<CustomizedAccordions />
			</Grid2>
		</Grid2>
	)
}

export default AboutUs
