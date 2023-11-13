import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { cn } from '@/utils/cn'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Brain Bridge',
	description:
		'Open-source alternative to Quizlet built with the Next.js app directory',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={cn(inter.className, 'dark')}>{children}</body>
		</html>
	)
}
