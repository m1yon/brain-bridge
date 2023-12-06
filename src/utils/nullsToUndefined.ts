type RecursivelyReplaceNullWithUndefined<T> = T extends null
	? undefined
	: T extends Date
	? T
	: {
			[K in keyof T]: T[K] extends (infer U)[]
				? RecursivelyReplaceNullWithUndefined<U>[]
				: RecursivelyReplaceNullWithUndefined<T[K]>
	  }

export function nullsToUndefined<T>(
	obj: T,
): RecursivelyReplaceNullWithUndefined<T> {
	if (obj === null) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
		return undefined as any
	}

	// object check based on: https://stackoverflow.com/a/51458052/6489012
	if (obj?.constructor.name === 'Object') {
		for (const key in obj) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
			obj[key] = nullsToUndefined(obj[key]) as any
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
	return obj as any
}
