import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'

// Это встроенные хуки для корректной работы библиотеки React-Redux

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
