import { Grid2, Typography } from '@mui/material'
import { TypeOrganization } from '../../../interfaces/usersInterfaces'
import { CustomButton } from '../../ui/Button'
import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux'
import { useSendConnectionRequestMutation } from '../../../api/profileApi'
import { addConnection } from '../../../store/slice/profileSlice'
import { handleSubmitRequest } from '../../../helpers/handleSubmitRequest'
import { IConnection } from '../../../interfaces/profileInterfaces'
import { IConnectionLink } from '../../../interfaces/mapInterfaces'

// типизация параметров MapButtons
interface Props {
	type: TypeOrganization
	selectedLinks: number[]
	setSelectedLinks: React.Dispatch<React.SetStateAction<number[]>>
	isSetData: boolean
	connectionLinks: IConnectionLink[]
	setIsSetData: () => void
	refetchConnectionLinks: () => void
}

// принимает тип организации, выбранные линии, подключённые линии, состояние изменения данных,
// функцию установки изменения данных, функцию добавления в выбранные ссылки, функцию перезапроса
// за подключёнными ссылками
const MapButtons = ({
	type,
	selectedLinks,
	connectionLinks,
	isSetData,
	setSelectedLinks,
	setIsSetData,
	refetchConnectionLinks,
}: Props) => {
	// получаем статус подтверждённости акканута
	const acceptStatus = useAppSelector(state => state.userSlice.user?.user_info?.accept_status)

	// Достаём из хранилища Redux Toolkit id нашей компании
	const idOrg = useAppSelector(state => state.userSlice.user?.user_info?.organization.id)

	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая отдаёт нам функцию
	// отправки запроса на подключение
	const [sendConnectRequest] = useSendConnectionRequestMutation()

	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// Grid2 с атрибутом container это обёртка контейнер, которая задаёт определённые стили
	// для всей грид сетки

	return (
		<>
			{/* если ты электросетевая компания и аккаунт подтверждён, ты видишь эти кнопки */}
			{type === 'электросетевая компания' && acceptStatus === 'Принято' && (
				<Grid2 container sx={{ marginBottom: 4 }}>
					<Grid2 size={{ lg: 7, xs: 12 }}>
						<Typography variant='h4' sx={{ fontSize: { xs: '20px', md: '46px' } }}>
							{isSetData ? 'Кликнете на карту, чтобы выбрать место опоры' : ''}
						</Typography>
					</Grid2>
					<Grid2 size={{ lg: 5, xs: 12 }}>
						<CustomButton
							onClick={setIsSetData}
							sx={{
								width: '100%',
								padding: '25px 20px',
								fontWeight: 'medium',
								mt: { lg: 0, xs: 2 },
								backgroundColor: 'rgba(131, 37, 144, 1)',
								color: 'white',
								borderRadius: '50px',
								fontSize: '18px',
								'&:hover': {
									backgroundColor: 'rgba(131, 37, 144, 0.8)'
								}
							}}
						>
							{isSetData ? 'ОТМЕНИТЬ ДОБАВЛЕНИЕ' : 'ДОБАВИТЬ ОПОРУ'}
						</CustomButton>
					</Grid2>
				</Grid2>
			)}

			{/* если ты магистральный провайдер и аккаунт подтверждён, ты видишь эти кнопки */}
			{type === 'магистральный провайдер' && acceptStatus === 'Принято' && (
				<Grid2 container sx={{ marginBottom: 4 }}>
					<Grid2 size={{ lg: 7, xs: 12 }}>
						<Typography variant='h4' sx={{ fontSize: { xs: '26px', md: '36px' } }}>
							{isSetData ? 'Кликайте на линии, чтобы выбрать их' : ''}
						</Typography>
					</Grid2>
					<Grid2 size={{ lg: 1, xs: 0 }}></Grid2>
					<Grid2 size={{ lg: 4, xs: 12 }} sx={{ mt: { lg: 0, xs: 2 } }}>
						<CustomButton
							sx={{
								width: '100%',
								padding: '25px 20px',
								fontWeight: 'medium',
								borderRadius: '50px',
								fontSize: '18px',
								backgroundColor: isSetData ? '#ECD8EF' : 'rgba(131, 37, 144, 1)',
								color: isSetData ? 'rgba(131, 37, 144, 1)' : 'white',
								mb: 2,
								'&:hover': {
									backgroundColor: isSetData ? '#E0C0E5' : 'rgba(131, 37, 144, 0.8)'
								}
							}}
							onClick={() => {
								{
									/* Если состояние изменения данных = true,
									то массив выбранных линий становится пустым */
								}
								if (isSetData) setSelectedLinks([])
								// и состояние изменения данных мы меняем на false
								setIsSetData()
							}}
						>
							{/* Если состояние изменения данных = true, то отображается первая фраза, иначе вторая */}
							{isSetData ? 'ОТМЕНИТЬ ПОДКЛЮЧЕНИЕ' : 'ПОДКЛЮЧИТЬСЯ'}
						</CustomButton>

						{/* Если состояние изменения данных = true */}
						{isSetData && (
							<CustomButton
								sx={{ width: '100%', padding: '25px 20px' }}
								onClick={async () => {
									/* Здесь вызывается функция которая отправляет наш запрос */
									await handleSubmitRequest({
										idOrg: idOrg!,
										selectedLinks,
										setSelectedLinks,
										connectionLinks,
										addConnection: (connect: IConnection) => dispatch(addConnection(connect)),
										sendConnectRequest,
										refetchConnectionLinks,
									})
									// состояние изменения данных мы меняем на false
									setIsSetData()
								}}
							>
								ОТПРАВИТЬ ЗАПРОС НА ПОДКЛЮЧЕНИЕ
							</CustomButton>
						)}
					</Grid2>
				</Grid2>
			)}
		</>
	)
}

export default MapButtons
