import { YMaps, Map, Placemark, Polyline } from '@pbe/react-yandex-maps'
import { BASE_COORDINATES } from '../../constants/constants'

import config from '../../config/config.json'
import { IConnectionLink, IPillar, IPillarLink } from '../../interfaces/mapInterfaces'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux'
import { createGeometryPolyline } from '../../helpers/createGeometryPolyline'
import { TypeOrganization } from '../../interfaces/usersInterfaces'
import { useState } from 'react'
import MapButtons from './MapButtons/MapButtons'
import { placemarkOptions } from '../../helpers/placemarkOptions'
import { polylineOptions } from '../../helpers/polylineOptions'
import { Box, Modal, Typography } from '@mui/material'
import MapForm from './MapForm/MapForm'
import { useGetOrganizationsQuery } from '../../api/authApi'
import { setPillars } from '../../store/slice/mapSlice'

// Типизация параметров MapComponent
interface Props {
	pillars: IPillar[]
	pillarLinks: IPillarLink[]
	connectionLinks: IConnectionLink[]
	type: TypeOrganization
	refetchConnectionLinks: () => void
	refetchPillars: () => void
}

// Принимает столбы, линии, подключённые линии, тип организации, функцию перезапроса за подключёнными
// линиями
const MapComponent = ({
	pillars,
	pillarLinks,
	connectionLinks,
	type,
	refetchConnectionLinks,
	refetchPillars,
}: Props) => {
	// Из Redux Toolkit достаём название нашей организации и id нашей организации
	const nameOrg = useAppSelector(state => state.userSlice.user?.user_info?.organization.name)
	const ownerId = useAppSelector(state => state.userSlice.user?.user_info?.organization.id)

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая делает запрос за получением организаций.
	// В качестве ответа мы получаем флаг загрузки данных и данные
	const { data, isLoading } = useGetOrganizationsQuery()

	// Создаём локальное состояние c помощью хука из React - useState,
	// которое будет содержать массив id выбранных линий
	const [selectedLinks, setSelectedLinks] = useState<number[]>([])

	// функция установки выбранных линий
	const handleSetLinks = (linkId: number) => {
		// сохраняем в локальное состояние
		setSelectedLinks(prev => {
			if (prev.find(item => item === linkId)) {
				// если выбранная линия найдена в массиве, то мы удаляем её из массива
				return prev.filter(item => item !== linkId)
			} else {
				// иначе устанавливаем
				return [...prev, linkId]
			}
		})
	}

	// Создаём локальное состояние c помощью хука из React - useState,
	// которое будет содержать состояние открытости закрытости
	const [isOpen, setIsOpen] = useState(false)

	// Создаём локальное состояние c помощью хука из React - useState,
	// которое будет содержать выбранные координаты
	const [coords, setCoords] = useState<[number, number]>([0, 0])

	// Создаём локальное состояние c помощью хука из React - useState,
	// которое будет содержать состояние установки координат или выбранных линий
	const [isSetData, setIsSetData] = useState(false)

	// Если организации загружаются, то показываем заголовок
	if (isLoading) return <h1>Загрузка данных...</h1>

	// Иначе отрисовываем карту
	return (
		<>
			<YMaps query={{ apikey: config.YANDEX_API_KEY }}>
				<div
					style={{
						width: '100%',
						height: '500px',
						margin: '30px 0px',
					}}
				>
					<Map
						style={{ width: '100%', height: '100%' }}
						defaultState={{ center: BASE_COORDINATES, zoom: 12 }}
						onClick={(e: any) => {
							// Если по карте кликнул магистральный провайдер или состояние установки данных равно false
							// то выход из функции
							if (type === 'магистральный провайдер' || !isSetData) return
							// иначе получаем координаты вызываем функцию установки координат
							const mapCoords = e.get('coords') as [number, number]
							// Устанавливаем значение открытости в true
							setIsOpen(true)
							// Устанавливаем их в локальное состояние координат
							setCoords(mapCoords)
						}}
					>
						{/* Идём по массиву и отрисовываем наши столбы */}
						{pillars.map((pillar, index) => (
							<Placemark
								key={index}
								geometry={[pillar.longitude, pillar.latitude]}
								modules={['geoObject.addon.balloon']}
								properties={{
									/* То, что будет отображаться в поп-апе */
									balloonContent: `
          					<div class="custom-balloon">
            					<div class="custom-balloon__header">Столб #${pillar.id}</div>
            					<div class="custom-balloon__body">
              				<p><strong>Владелец:</strong> ${pillar.owner.name}</p>
              				<p><strong>Координаты:</strong> ${pillar.latitude}, ${pillar.longitude}</p>
           					 </div>
          					</div>
        					`,
								}}
								options={placemarkOptions({
									pillarOwner: pillar.owner.name,
									type,
									nameOrg: nameOrg!,
								})}
							/>
						))}

						{/* Идём по массиву и отрисовываем наши линии */}
						{pillarLinks.map((pillarLink, index) => (
							<Polyline
								key={index}
								geometry={createGeometryPolyline(pillarLink.pole_a, pillarLink.pole_b)}
								options={polylineOptions({ connectionLinks, pillarLink, type, selectedLinks })}
								onClick={() => {
									// если тип = 'электросетевая компания', то выход из функции
									if (!isSetData || type === 'электросетевая компания') return
									// иначе вызываем функцию установки выбранных линий
									handleSetLinks(pillarLink.id)
								}}
							/>
						))}
					</Map>
				</div>
			</YMaps>

			{/* Компонент с кнопками под картой */}
			<MapButtons
				type={type}
				isSetData={isSetData}
				connectionLinks={connectionLinks}
				setIsSetData={() => setIsSetData(prev => !prev)}
				selectedLinks={selectedLinks}
				setSelectedLinks={setSelectedLinks}
				refetchConnectionLinks={refetchConnectionLinks}
			/>

			{/* Модальное окно из MaterialUI. Если состояние открытости (isOpen) = true, то показываем его */}
			<Modal open={isOpen} sx={{ backdropFilter: 'blur(2px)' }}>
				<Box
					sx={{
						outline: 'none',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						px: 10,
						width: { sm: 450, xs: 300 },
						height: 650,
						bgcolor: 'white',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography variant='h4'>ДОБАВИТЬ НОВУЮ ОПОРУ</Typography>
					{/* Здесь форма для создания нового столба */}
					<MapForm
						coords={coords}
						ownerId={ownerId!}
						organizations={data!}
						onClose={() => {
							// функция закрывания
							// сбрасываем локальные состояния координат, открытости и состояние установки данных
							setCoords([0, 0])
							setIsSetData(false)
							setIsOpen(false)
							refetchPillars()
						}}
					/>
				</Box>
			</Modal>
		</>
	)
}

export default MapComponent
