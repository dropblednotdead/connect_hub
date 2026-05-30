export function formatStatus(status: number): string {
	if (status === 1) return 'Ожидание'
	if (status === 2) return 'Одобрено'
	return 'Отклонено'
}
