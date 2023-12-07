const prefix = 'Invariant failed'

export default function invariant<T>(
	condition: T,
	message?: string | (() => string),
): asserts condition is NonNullable<T> {
	if (condition) {
		return
	}

	const provided: string | undefined =
		typeof message === 'function' ? message() : message

	const value: string = provided ? `${prefix}: ${provided}` : prefix
	throw new Error(value)
}
