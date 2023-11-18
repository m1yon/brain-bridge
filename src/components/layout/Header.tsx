import Link from 'next/link'

const Header = () => {
	return (
		<header className="border-b p-6">
			<Link href="/">
				<h1 className="text-lg font-medium text-primary">bb</h1>
			</Link>
		</header>
	)
}

export default Header
