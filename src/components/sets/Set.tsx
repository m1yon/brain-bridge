'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '../primitives/Card'

import { Set } from '@/lib/data-access/interfaces/ISet'
import { Badge } from '../primitives/Badge'

type SetProps = Omit<Set, 'flashCards'>

const Set = ({ id, name, description, flashCardCount }: SetProps) => {
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
				<CardContent>
					<Badge>
						{flashCardCount} {flashCardCount === 1 ? 'term' : 'terms'}
					</Badge>
				</CardContent>
			</Card>
		</Link>
	)
}

export default Set
