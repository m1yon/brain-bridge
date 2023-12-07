import { expect, it } from 'vitest'
import { getUserId } from './getUserId'

it('returns the correct ID for a GitHub provider', () => {
	const id = getUserId({ id: '154322', provider: 'github' })
	expect(id).toBe('6bd15f92-cb20-7af3-921c-b542a7813343')
})

it('throws an error when an invalid provider is sent', () => {
	expect(
		// @ts-expect-error bad input for the test
		() => getUserId({ id: '154322', provider: 'invalid-provider' }),
	).toThrowError('Case not handled for provider "invalid-provider"')
})
