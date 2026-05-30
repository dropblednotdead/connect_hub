// Здесь лежат интерфейсы, которые относятся к запросам связанным c профилем

export interface IConnection {
	id: number
	created_at: string
	updated_at: string | null
	provider: number
	status: number
}

export type RequestSendConnection = { pole_links: number[] }
export type ResponseSendConnection = { new_connection: IConnection }

export type RequestApproveConnection = {
	id: number
	answer: 'pole_a_answer' | 'pole_b_answer'
}
export type ResponseApproveConnection = { connections: IConnection }
