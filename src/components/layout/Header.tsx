import Link from 'next/link'
import SignOutButton from '../auth/SignOutButton'

const Header = () => {
	return (
		<header className="flex items-center justify-between border-b px-6 py-4">
			<Link href="/">
				<h1 className="text-lg font-medium text-primary">bb</h1>
			</Link>

			<SignOutButton />
		</header>
	)
}

export default Header
