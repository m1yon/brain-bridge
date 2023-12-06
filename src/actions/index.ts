import { createSafeActionClient } from 'next-safe-action'

export const action = createSafeActionClient()

export * as SetActions from './set-actions'
