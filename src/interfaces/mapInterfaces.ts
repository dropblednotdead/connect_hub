import { AcceptStatus } from './usersInterfaces'

// Здесь лежат интерфейсы, которые относятся к запросам связанным c картой

export interface IPillar {
	id: number
	longitude: string
	latitude: string
	street: string
	building: number
	index: string
	max_connections: number
	owner: {
		name: string
		email: string
		phone: string
	}
}

export interface IPillarLink {
	id: number
	pole_a: IPillar
	pole_b: IPillar
	length: string
}

export interface IConnectionLink {
	id: number
	connection: {
		id: number
		created_at: string | null
		updated_at: string | null
		provider: number
		status: number
	}
	pole_link: number
	pole_a_answer: number | AcceptStatus | null
	pole_b_answer: number | AcceptStatus | null
	status: number
}

export interface IAddPillar {
	longitude: number
	latitude: number
	street: string
	building: number
	index: string
	max_connections: number
	owner_id: number
}

export type ResponseGetPillars = PaginatePillars | IPillar[]

export interface PaginatePillars {
	count: number
	next: string | null
	previous: string | null
	results: IPillar[]
}
