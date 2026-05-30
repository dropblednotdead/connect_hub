import { ErrorMessage, Form, Formik } from 'formik'
import { TextField, Box, Modal, Typography } from '@mui/material'
import { CustomButton } from '../../ui/Button'
import { useEditPillarMutation, useDeletePillarMutation } from '../../../api/mapApi'
import { useAppDispatch } from '../../../hooks/react-redux'
import { updatePillar, removePillar } from '../../../store/slice/mapSlice'
import { IPillar } from '../../../interfaces/mapInterfaces'
import styles from '../MapForm/styles.module.css'

interface Props {
	isOpen: boolean
	onClose: () => void
	pillar: IPillar
}

const SupportEditModal = ({ isOpen, onClose, pillar }: Props) => {
	const [editPillarFn] = useEditPillarMutation()
	const [deletePillarFn] = useDeletePillarMutation()
	const dispatch = useAppDispatch()

	const handleDelete = async () => {
		try {
			await deletePillarFn(pillar.id)
			dispatch(removePillar(pillar.id))
			onClose()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Modal open={isOpen} onClose={onClose} sx={{ backdropFilter: 'blur(2px)' }}>
			<Box
				sx={{
					outline: 'none',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					px: { sm: 10, xs: 5 },
					py: 5,
					width: { sm: 450, xs: 300 },
					maxHeight: '90vh',
					overflowY: 'auto',
					bgcolor: 'white',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography variant='h4'>ИЗМЕНИТЬ ОПОРУ</Typography>
				<Formik
					initialValues={{
						street: pillar.street,
						building: pillar.building.toString(),
						index: pillar.index || '',
						maxConnection: pillar.max_connections.toString(),
					}}
					onSubmit={async (values, { setSubmitting }) => {
						try {
							if (values.maxConnection === '' || values.building === '' || values.street == '') return

							const { data: updatedPillar } = await editPillarFn({
								id: pillar.id,
								body: {
									street: values.street,
									building: +values.building,
									index: values.index,
									max_connections: +values.maxConnection,
								},
							})

							if (updatedPillar) {
								dispatch(
									updatePillar({
										...updatedPillar,
										owner: pillar.owner,
									})
								)
							}

							onClose()
							setSubmitting(false)
						} catch (error) {
							setSubmitting(false)
							console.log(error)
							onClose()
						}
					}}
				>
					{({ values, handleChange, handleBlur, isSubmitting }) => (
						<Form className={styles.form} style={{ width: '100%' }}>
							<TextField
								variant='standard'
								type='text'
								name='street'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.street}
								sx={{ my: 4, display: 'block', '& .MuiInputBase-root': { width: '100%' } }}
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
								sx={{ my: 4, display: 'block', '& .MuiInputBase-root': { width: '100%' } }}
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
								sx={{ my: 4, display: 'block', '& .MuiInputBase-root': { width: '100%' } }}
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
								sx={{ my: 4, display: 'block', '& .MuiInputBase-root': { width: '100%' } }}
								placeholder='Максимальное количество подключений'
							/>
							<ErrorMessage name='maxConnection' component='div' />

							<CustomButton
								sx={{ width: '100%', padding: '20px', mt: 3, backgroundColor: 'rgba(131, 37, 144, 1)', color: 'white', borderRadius: '8px' }}
								type='submit'
								disabled={isSubmitting}
							>
								СОХРАНИТЬ ИЗМЕНЕНИЯ
							</CustomButton>

							<CustomButton
								sx={{
									width: '100%',
									padding: '20px',
									background: 'white',
									color: 'red',
									border: 'red solid 2px',
									borderRadius: '8px',
									mt: 2,
								}}
								type='button'
								disabled={isSubmitting}
								onClick={handleDelete}
							>
								УДАЛИТЬ ОПОРУ
							</CustomButton>

							<CustomButton
								sx={{
									width: '100%',
									padding: '20px',
									background: 'white',
									color: '#141414',
									border: '#141414 solid 2px',
									borderRadius: '8px',
									mt: 2,
								}}
								type='button'
								disabled={isSubmitting}
								onClick={onClose}
							>
								ОТМЕНИТЬ
							</CustomButton>
						</Form>
					)}
				</Formik>
			</Box>
		</Modal>
	)
}

export default SupportEditModal
