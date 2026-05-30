import { TypeOrganization } from './usersInterfaces'

// Здесь лежат интерфейсы, которые относятся к запросам связанным с авторизацией

export interface RequestRegistration {
	name: string
	username: string
	password: string
	email: string
	phone_num: string
	organization_id: number
	type: TypeOrganization
	surname: string
}

export interface IOrganization {
	slice(arg0: number, arg1: number): unknown
	id: number
	name: string
	email: string
	type: TypeOrganization
	phone: string
}
