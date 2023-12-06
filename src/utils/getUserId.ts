import { Provider } from '@/lib/constants/Provider'
import md5 from 'md5'

type getUserIdArgs = {
	id: string
	provider: Provider
}

export const getUserId = ({ id, provider }: getUserIdArgs) => {
	if (provider === 'github') {
		return md5(id).replace(
			/^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
			'$1-$2-$3-$4-$5',
		)
	}

	throw new Error(`Case not handled for provider "${provider as string}"`)
}
