import DividerCustom from '../../ui/DividerCustom'
import { CustomButton } from '../../ui/Button'
import { Typography, Box } from '@mui/material'
import { useGetPillarsQuery } from '../../../api/mapApi'
import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux'
import Supports from '../Supports/Supports'
import { addPillars, setPage, setPillars } from '../../../store/slice/mapSlice'
import { useEffect } from 'react'
import { PaginatePillars } from '../../../interfaces/mapInterfaces'

const PillarsList = () => {
	const page = useAppSelector(state => state.mapSlice.page)
	const pageSize = useAppSelector(state => state.mapSlice.pageSize)

	// Достаём столбы, линии, подключённые линии, из хранилища Redux Toolkit
	const pillars = useAppSelector(state => state.mapSlice.pillars)
	const ownerName = useAppSelector(state => state.userSlice.user?.user_info?.organization.name)
	const type = useAppSelector(state => state.userSlice.user?.user_info?.type)
	const pillarLinks = useAppSelector(state => state.mapSlice.pillarLinks)

	const { data: dataPillars, isLoading: isLoadingPillars } = useGetPillarsQuery({ page, pageSize })

	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (dataPillars && !isLoadingPillars) {
			if (page === 1) {
				dispatch(setPillars((dataPillars as PaginatePillars).results)) // замена
			} else {
				dispatch(addPillars((dataPillars as PaginatePillars).results)) // добавление
			}
		}
	}, [dataPillars, isLoadingPillars, page])

	// Делаем страницу снова первой, чтобы потом, при новом заходе заново подгружать файлы
	useEffect(() => {
		return () => {
			dispatch(setPage(1))
		}
	}, [])

	const getPillarConnectionsCount = (pillarId: number) => {
		return pillarLinks.filter(pl => pl.pole_a.id === pillarId || pl.pole_b.id === pillarId).length
	}

	const displayedPillars = type === 'электросетевая компания' 
		? pillars.filter(p => p.owner.name === ownerName) 
		: type === 'магистральный провайдер'
			? pillars.filter(p => getPillarConnectionsCount(p.id) < p.max_connections)
			: pillars

	return (
		<section>
			{type === 'электросетевая компания' && (
				<>
					<Typography variant='h3' sx={{ mb: 3, fontSize: { xs: '2rem', md: '36px' } }}>
						ВАШИ ОПОРЫ
					</Typography>
					<DividerCustom />
				</>
			)}
			{type === 'магистральный провайдер' && (
				<>
					<Typography variant='h3' sx={{ mb: 3, fontSize: { xs: '2rem', md: '36px' } }}>
						РЕКОМЕНДУЕМЫЕ ОПОРЫ
					</Typography>
					<DividerCustom />
				</>
			)}
			{/* Если загрузка столбов есть, то отрисовываем заголовок */}
			{isLoadingPillars && <h1>Данные загружаются...</h1>}
			{/* Иначе идём по массиву и отрисовываем наши столбы */}
			{!isLoadingPillars &&
				dataPillars &&
				displayedPillars.map((pillar, idx) => (
					<article key={`${pillar.id}-${idx}`}>
						<Supports
							key={`supports-${pillar.id}-${idx}`}
							id={pillar.id}
							pillar={pillar}
							name={`${pillar.street}, ${pillar.building}${pillar.index || ''}`}
							location={`${pillar.longitude} ${pillar.latitude}`}
							max_connections={pillar.max_connections}
						/>
						<DividerCustom key={`divider-${pillar.id}-${idx}`} />
					</article>
				))}
			{!isLoadingPillars && dataPillars && (dataPillars as PaginatePillars).next && (
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 2 }}>
					<CustomButton
						onClick={() => dispatch(setPage(page + 1))}
						sx={{
							width: { lg: '41.6%', xs: '100%' },
							padding: '25px 20px',
							fontWeight: 'medium',
							mt: { lg: 0, xs: 2 },
							borderRadius: '50px',
							fontSize: '18px',
						}}
					>
						ЗАГРУЗИТЬ ОПОРЫ
					</CustomButton>
				</Box>
			)}
		</section>
	)
}

export default PillarsList
