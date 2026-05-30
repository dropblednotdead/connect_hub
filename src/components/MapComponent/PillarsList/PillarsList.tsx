import DividerCustom from '../../ui/DividerCustom'
import { CustomButton } from '../../ui/Button'
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

	return (
		<section>
			{/* Если загрузка столбов есть, то отрисовываем заголовок */}
			{isLoadingPillars && <h1>Данные загружаются...</h1>}
			{/* Иначе идём по массиву и отрисовываем наши столбы */}
			{!isLoadingPillars &&
				dataPillars &&
				pillars.map((pillar, idx) => (
					<article key={`${pillar.id}-${idx}`}>
						<Supports
							key={`supports-${pillar.id}-${idx}`}
							name={`${pillar.street}, ${pillar.building}${pillar.index || ''}`}
							location={`${pillar.longitude} ${pillar.latitude}`}
							max_connections={pillar.max_connections}
						/>
						<DividerCustom key={`divider-${pillar.id}-${idx}`} />
					</article>
				))}
			{!isLoadingPillars && dataPillars && (dataPillars as PaginatePillars).next && (
				<CustomButton
					onClick={() => dispatch(setPage(page + 1))}
					sx={{
						width: '100%',
						padding: '25px 20px',
						fontWeight: 'medium',
						mt: { lg: 0, xs: 2 },
					}}
				>
					ЗАГРУЗИТЬ ОПОРЫ
				</CustomButton>
			)}
		</section>
	)
}

export default PillarsList
