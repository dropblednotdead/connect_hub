import { Button, Stack, useTheme } from '@mui/material'
import { useApproveConnectionRequestMutation } from '../../../api/profileApi'

// Типизируем параметры ProfileRequestsButtons
interface Props {
	id: number
	answer: 'pole_a_answer' | 'pole_b_answer'
	refetch: () => void
}

// Принимает id опоры, по какой опоре ответ, перезапрос за получением подключённых линий
const ProfileRequestsButtons = ({ id, answer, refetch }: Props) => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая отдаёт нам функцию
	// подтверждения подключения
	const [approveConnection] = useApproveConnectionRequestMutation()

	// функция обработчик подтверждения подключения
	const handleApprove = async () => {
		try {
			// запрос на подтверждение подключения
			await approveConnection({ id, answer })
			// перезапрос за получением подключённых линий
			refetch()
		} catch (error) {
			// вывод ошибки в консоль
			console.log(error)
		}
	}

	// Stack это компонент, который по умолчанию аналогичен div с display:flex и flexDirection: column

	return (
		<Stack sx={{ width: '100%' }}>
			<Button
				sx={{
					margin: '5px',
					padding: '10px 40px',
					borderRadius: '0px',
					backgroundColor: 'black',
					color: 'white',
					width: { md: 'auto', xs: '100%' },
				}}
				onClick={handleApprove}
			>
				Принять
			</Button>
			<Button
				sx={{
					margin: '5px',
					padding: '10px 40px',
					borderRadius: '0px',
					backgroundColor: theme.palette.secondary.main,
					color: 'white',
					width: { md: 'auto', xs: '100%' },
				}}
			>
				Отклонить
			</Button>
		</Stack>
	)
}

export default ProfileRequestsButtons
