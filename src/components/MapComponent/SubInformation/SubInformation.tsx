import { Grid2, Typography } from '@mui/material'
import PlanetSVG from '../../../assets/planet.svg'
import PlaceIcon from '@mui/icons-material/Place'

interface Props {
	type?: string
}

const SubInformation = ({ type }: Props) => {
	return (
		<Grid2 container sx={{ mt: 6 }}>
			<Grid2
				size={{ lg: 3, xs: 0 }}
				sx={{ display: 'flex', alignSelf: 'center', justifyContent: 'center' }}
			>
				{(type !== 'электросетевая компания' && type !== 'магистральный провайдер') && <img src={PlanetSVG} style={{ width: '35%' }} />}
			</Grid2>
			<Grid2 size={{ lg: 6, xs: 12 }}>
				{(type !== 'электросетевая компания' && type !== 'магистральный провайдер') && (
					<Typography sx={{ fontSize: { xs: 18, lg: 20 } }}>
						Мы обладаем богатым опытом и профессиональными знаниями в области электросетевой
						инфраструктуры. Мы используем современное оборудование и методы, которые позволяют нам
						эффективно решать самые сложные задачи.
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ lg: 3, xs: 0 }}></Grid2>

			<Grid2 size={{ lg: 7, xs: 12 }} sx={{ mt: { xs: 0, lg: 0 }, display: 'flex', alignItems: 'flex-start' }}>
				<img src={PlanetSVG} style={{ width: '100px', marginRight: '20px' }} alt="planet" />
				<Typography variant='h3' sx={{ fontSize: { xs: '2rem', md: '46px' } }}>
					СМОТРИТЕ ОПОРЫ НА КАРТЕ
				</Typography>
			</Grid2>
			<Grid2
				size={{ lg: 5, xs: 12 }}
				sx={{
					mt: { xs: 3, md: 3, lg: 0 },
					display: 'flex',
					justifyContent: { lg: 'flex-end', xs: 'start' },
					alignItems: 'center',
				}}
			>
				<PlaceIcon sx={{ fontSize: 50, color: 'purple' }} />
				<Typography sx={{ fontSize: '1.3rem', marginLeft: 1 }}>г. Нижний Новгород</Typography>
			</Grid2>
		</Grid2>
	)
}

export default SubInformation
