'use client'

import { Card, CardContent, CardHeader, CardTitle } from './primitives/Card'

import { Set } from '@/lib/data-access/interfaces/ISet'

type SetProps = Set

const Set = ({ id, name, description }: SetProps) => {
	return (
		<Card key={id}>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
			</CardHeader>
			<CardContent>{description}</CardContent>
		</Card>
	)
}

export default Set
