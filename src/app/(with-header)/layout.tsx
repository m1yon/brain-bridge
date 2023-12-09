import Header from '@/components/layout/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			{children}
		</>
	)
}

export default Layout
