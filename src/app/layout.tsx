import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { cn } from '@/lib/utils/cn'
import { Toaster } from '@/components/primitives/Toaster'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Brain Bridge',
	description:
		'Open-source alternative to Quizlet built with the Next.js app directory',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body className={cn(inter.className, 'dark')}>
				{children}
				<Toaster />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}

export default RootLayout
