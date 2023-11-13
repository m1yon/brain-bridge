'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle } from './primitives/Card'

import { Set } from '@/lib/data-access/interfaces/ISet'

type SetProps = Omit<Set, 'flashCards'>

const Set = ({ id, name, description }: SetProps) => {
	return (
		<Link href={`set/${id}`}>
			<Card
				key={id}
				className="focus-active:bg-secondary h-full transition-all duration-75 hover:bg-secondary"
			>
				<CardHeader>
					<CardTitle>{name}</CardTitle>
					<p className="opacity-60">{description}</p>
				</CardHeader>
			</Card>
		</Link>
	)
}

export default Set
