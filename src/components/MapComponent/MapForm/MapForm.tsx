import { ErrorMessage, Form, Formik } from 'formik'
import styles from './styles.module.css'
import { TextField } from '@mui/material'
import { CustomButton } from '../../ui/Button'
import { useAddPillarMutation } from '../../../api/mapApi'
import { useAppDispatch } from '../../../hooks/react-redux'
import { addPillar } from '../../../store/slice/mapSlice'
import { useLazyGetOrganizationByIdQuery } from '../../../api/authApi'
import { IOrganization } from '../../../interfaces/authInterfaces'

// Типизация наших параметров
interface Props {
	coords: [number, number]
	ownerId: number
	organizations: IOrganization[]
	onClose: () => void
}

// В параметрах получаем координаты, функцию закрывания, id нашей организации, все организации
const MapForm = ({ coords, onClose, ownerId, organizations }: Props) => {
	// Вызываем функции из библиотеки Redux Toolkit Query, которые отдают нам функции
	// добавления новой опоры и получение конкретной организации организаций
	const [addPillarFn] = useAddPillarMutation()
	const [getOrganization] = useLazyGetOrganizationByIdQuery()

	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	// Компонент из библиотеки Formik - аналог form
	return (
		<Formik
			// Поля, которые будут в форме
			initialValues={{
				street: '',
				building: '',
				index: '',
				maxConnection: '',
			}}
			// Функция, которая будет выполняться при отправке формы
			onSubmit={async (values, { setSubmitting }) => {
				// в параметрах получаем значения и функцию установки флага выполнения отправки формы
				try {
					// Если максимальное количество подключений или дом или улица не указаны - выход из функции
					if (values.maxConnection === '' || values.building === '' || values.street == '') return

					// здесь происходит запрос на добавление опоры
					const { data: newPillar } = await addPillarFn({
						longitude: +coords[0].toFixed(6),
						latitude: +coords[1].toFixed(6),
						street: values.street,
						building: +values.building,
						index: values.index,
						max_connections: +values.maxConnection,
						owner_id: ownerId,
					})

					// если новая опора есть
					if (newPillar) {
						// находим нужную нам организацию из массива организаций
						const findOrganization = organizations.find(org => org.name === newPillar.owner.name)

						// делаем запрос за конкретной организацией
						const { data: organization } = await getOrganization(findOrganization?.id!)

						// если организация есть
						if (organization)
							// добавляем новую опору в наше хранилище Redux Toolkit
							dispatch(
								addPillar({
									...newPillar,
									longitude: String(newPillar.longitude),
									latitude: String(newPillar.latitude),
									owner: {
										email: organization.email,
										name: organization.name,
										phone: organization.phone,
									},
								})
							)
					}

					// закрываем модальное окно
					onClose()
					// флаг выполнения отправки формы становится не активным
					setSubmitting(false)
				} catch (error) {
					// флаг выполнения отправки формы становится не активным
					setSubmitting(false)
					// выводим ошибка
					console.log(error)
					// закрываем модальное окно
					onClose()
				}
			}}
			// Form - аналог тега form
			// TextField - аналог инпута, в name привязывается к тому значению, которое прописали
			// value - значение инпута, onChange, onBlur - встроенные функции Formik, которые делают
			// определённые действия при изменении и фокусировке
			// ErrorMessage - аналог div, в котором выводится ошибка валидации
		>
			{({ values, handleChange, handleBlur, isSubmitting }) => (
				<Form className={styles.form}>
					<TextField
						variant='standard'
						type='text'
						name='street'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.street}
						sx={{
							my: 4,
							display: 'block',
							'& .MuiInputBase-root': { width: '100%' },
						}}
						placeholder='Улицу'
					/>
					<ErrorMessage name='street' component='div' />

					<TextField
						variant='standard'
						type='text'
						name='building'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.building}
						sx={{
							my: 4,
							display: 'block',
							'& .MuiInputBase-root': { width: '100%' },
						}}
						placeholder='Дом'
					/>
					<ErrorMessage name='building' component='div' />

					<TextField
						variant='standard'
						type='text'
						name='index'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.index}
						sx={{
							my: 4,
							display: 'block',
							'& .MuiInputBase-root': { width: '100%' },
						}}
						placeholder='Индекс дома'
					/>
					<ErrorMessage name='index' component='div' />

					<TextField
						variant='standard'
						type='text'
						name='maxConnection'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.maxConnection}
						sx={{
							my: 4,
							display: 'block',
							'& .MuiInputBase-root': { width: '100%' },
						}}
						placeholder='Максимальное количество подключений'
					/>
					<ErrorMessage name='maxConnection' component='div' />

					{/* Кнопка для отправки формы */}
					<CustomButton
						sx={{ width: '100%', padding: '20px', mt: 3 }}
						type='submit'
						disabled={isSubmitting}
					>
						ОТПРАВИТЬ ЗАПРОС НА ПОДКЛЮЧЕНИЕ
					</CustomButton>

					{/* Кнопка для отмены всего и закрытия модального окна */}
					<CustomButton
						sx={{
							width: '100%',
							padding: '20px',
							background: 'white',
							color: 'black',
							border: 'black solid 2px',
							mt: 2,
						}}
						type='submit'
						disabled={isSubmitting}
						onClick={onClose}
					>
						ОТМЕНИТЬ ДОБАВЛЕНИЕ
					</CustomButton>
				</Form>
			)}
		</Formik>
	)
}

export default MapForm
