import { IConnectionLink } from '../interfaces/mapInterfaces'
import { IConnection, ResponseSendConnection } from '../interfaces/profileInterfaces'

// типизация того, что принимает наша функция
interface Params {
	idOrg: number
	selectedLinks: number[]
	connectionLinks: IConnectionLink[]
	setSelectedLinks: (links: number[]) => void
	addConnection: (connect: IConnection) => void
	refetchConnectionLinks: () => void
	sendConnectRequest: (params: {
		pole_links: number[]
	}) => Promise<
		{ data: ResponseSendConnection; error?: undefined } | { data?: undefined; error: unknown }
	>
}

// она принимает выбранные и подключённые линии, функцию отправки запроса на подключение
// функцию добавления нового подключения, функцию установки выбранных линий
// функцию перезапроса за подключёнными линиями
export const handleSubmitRequest = async ({
	idOrg,
	selectedLinks,
	sendConnectRequest,
	addConnection,
	connectionLinks,
	setSelectedLinks,
	refetchConnectionLinks,
}: Params) => {
	try {
		// Если выбранных линий 0, то выход из функции
		if (selectedLinks.length === 0) return

		// ищем выбранные линии в подключённых линиях
		const findedLinks = connectionLinks.some(connectLink => {
			return selectedLinks.some(
				selectedLink =>
					selectedLink === connectLink.pole_link && connectLink.connection.provider === idOrg
			)
		})

		// если их нету
		if (!findedLinks) {
			// делаем отправку запроса на подключение
			const response = await sendConnectRequest({ pole_links: selectedLinks })
			// если всё успешно и данные пришли
			if (response.data) {
				// добавляем в хранилище Redux Toolkit новое подключение
				addConnection(response.data.new_connection)
			} else if (response.error) {
				const err = response.error as any
				if (err.data && Array.isArray(err.data)) {
					alert(err.data[0])
				} else if (err.data?.non_field_errors) {
					alert(err.data.non_field_errors[0])
				} else if (err.data?.detail) {
					alert(err.data.detail)
				} else {
					alert('Ошибка при создании заявки')
				}
			}
		}

		// делаем перезапрос на получение подключённых линий
		await refetchConnectionLinks()
		// делаем массив выбранных линий пустым
		setSelectedLinks([])
	} catch (error) {
		// если ошибка, то выводим её консоль
		console.log(error)
	}
}
