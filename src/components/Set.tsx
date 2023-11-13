'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './primitives/Card'

import { Set } from '@/lib/data-access/interfaces/ISet'

type SetProps = Omit<Set, 'flashCards'>

const Set = ({ id, name, description }: SetProps) => {
	return (
		<Link href={`set/${id}`}>
			<Card key={id}>
				<CardHeader>
					<CardTitle>{name}</CardTitle>
				</CardHeader>
				<CardContent>{description}</CardContent>
			</Card>
		</Link>
	)
}

export default Set
