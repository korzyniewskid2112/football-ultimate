import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import store from './store'

type rootProps = ReturnType<typeof store.getState>
type dispatchProps = typeof store.dispatch

export const useAppDispatch: () => dispatchProps = useDispatch;
export const useAppSelector: TypedUseSelectorHook<rootProps> = useSelector;
