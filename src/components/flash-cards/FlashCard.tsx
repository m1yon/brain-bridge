'use client'

import { FlashCard } from '@/lib/data-access/interfaces/IFlashCard'
import { FlashCardService } from '@/services'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../primitives/Card'
import { Button } from '../primitives/Button'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import FlashCardUpdateForm from './FlashCardUpdateForm'

type FlashCardProps = FlashCard

const FlashCard = ({ id, term, definition }: FlashCardProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const deleteFlashCardWithId = FlashCardService.deleteFlashCard.bind(null, {
		id,
	})

	return (
		<Card key={id}>
			{!isEditing ? (
				<>
					<CardHeader>
						<CardTitle>{term}</CardTitle>
					</CardHeader>
					<CardContent>{definition}</CardContent>
					<CardFooter>
						<Button
							variant="outline"
							size="sm"
							className="mr-2"
							onClick={() => setIsEditing(true)}
						>
							<Pencil1Icon className="mr-2 h-4 w-4" /> Edit
						</Button>

						{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
						<form action={deleteFlashCardWithId}>
							<Button variant="outline" size="sm">
								<TrashIcon className="mr-2 h-4 w-4" /> Delete
							</Button>
						</form>
					</CardFooter>
				</>
			) : (
				<FlashCardUpdateForm
					id={id}
					term={term}
					definition={definition}
					onComplete={() => {
						setIsEditing(false)
					}}
					onCancel={() => {
						setIsEditing(false)
					}}
				/>
			)}
		</Card>
	)
}

export default FlashCard
