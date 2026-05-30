// Здесь лежат интерфейсы, которые относятся к запросам связанным c пользователем

export interface UserData {
	id: number | null
	username: string
	email: string
	user_info: UserInfo | null
	is_superuser: boolean
}

export interface UserInfo {
	surname: string
	name: string
	phone_num: string
	type: TypeOrganization
	accept_status: 'Принято' | 'Ожидание' | 'Отклонено'
	organization: {
		id: number
		name: string
		email: string
		type: TypeOrganization
		phone: string
	}
}

export type TypeOrganization = 'электросетевая компания' | 'магистральный провайдер'
export type AcceptStatus = 'Принято' | 'Ожидание' | 'Отклонено'
