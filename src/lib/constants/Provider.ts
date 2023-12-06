import * as z from 'zod'

export const PROVIDER = ['github'] as const

export type Provider = (typeof PROVIDER)[number]

export const ProviderSchema = z.enum(PROVIDER)

export function isProvider(value: unknown): value is Provider {
	return (
		typeof value === 'string' && (PROVIDER as readonly string[]).includes(value)
	)
}
