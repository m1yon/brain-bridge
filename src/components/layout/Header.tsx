import Link from 'next/link'
import UserInformation from './UserInformation'
import { AuthService } from '@/services'

const Header = async () => {
	const session = await AuthService.getSession()

	const nameInitials = session?.user?.name
		?.split(' ')
		.map((word) => word[0])
		.join('')

	return (
		<header className="flex items-center justify-between border-b px-6 py-4">
			<Link href="/">
				<h1 className="text-lg font-medium text-primary">bb</h1>
			</Link>

			<UserInformation
				image={session?.user?.image ?? ''}
				fallbackText={`${nameInitials?.[0]}${nameInitials?.[1]}`}
			/>
		</header>
	)
}

export default Header
