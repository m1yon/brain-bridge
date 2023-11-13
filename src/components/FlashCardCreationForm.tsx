'use client'

import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './primitives/Form'
import { Input } from './primitives/Input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './primitives/Button'
import { flashCardService } from '@/services'
import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './primitives/Card'
import { PlusIcon } from '@radix-ui/react-icons'

const formSchema = z.object({
	term: z.string().min(1, 'Term is required'),
	definition: z.string().min(1, 'Definition is required'),
})

const FlashCardCreationForm = () => {
	const [isCreating, setIsCreating] = useState(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			term: '',
			definition: '',
		},
	})

	if (!isCreating) {
		return (
			<Button
				variant="secondary"
				className="w-full"
				onClick={() => setIsCreating(true)}
			>
				<PlusIcon className="h-5 w-5" />
			</Button>
		)
	}

	return (
		<Card>
			<Form {...form}>
				<form
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					action={async () => {
						const valid = await form.trigger()

						if (valid) {
							await flashCardService.createFlashCard(form.getValues())
							setIsCreating(false)
							form.reset()
						}
					}}
				>
					<CardHeader>
						<h2 className="text-lg font-bold">Create Flash Card</h2>
					</CardHeader>
					<CardContent className="space-y-8">
						<FormField
							control={form.control}
							name="term"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Term</FormLabel>
									<FormControl>
										<Input placeholder="TypeScript" {...field} />
									</FormControl>
									<FormDescription>
										The term will be shown first, then you will provide the
										definition.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="definition"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Definition</FormLabel>
									<FormControl>
										<Input
											placeholder="a strongly typed programming language that builds on JavaScript"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										You will say this definition when the term is shown.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>

					<CardFooter>
						<Button type="submit" className="mr-2">
							Create
						</Button>
						<Button
							variant="ghost"
							onClick={() => {
								form.reset()
								setIsCreating(false)
							}}
						>
							Cancel
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	)
}

export default FlashCardCreationForm
