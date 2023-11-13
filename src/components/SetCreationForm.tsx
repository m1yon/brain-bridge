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
import { SetService } from '@/services'
import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './primitives/Card'
import { PlusIcon } from '@radix-ui/react-icons'

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().optional(),
})

const SetCreationForm = () => {
	const [isCreating, setIsCreating] = useState(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
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
							await SetService.createSet({
								...form.getValues(),
								description: form.getValues().description || null,
							})
							setIsCreating(false)
							form.reset()
						}
					}}
				>
					<CardHeader>
						<h2 className="text-lg font-bold">Create Set</h2>
					</CardHeader>
					<CardContent className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Web Development" {...field} />
									</FormControl>
									<FormDescription>The name of the set.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											placeholder="Study material for my web development interviews"
											{...field}
										/>
									</FormControl>
									<FormDescription>The description of the set.</FormDescription>
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

export default SetCreationForm
