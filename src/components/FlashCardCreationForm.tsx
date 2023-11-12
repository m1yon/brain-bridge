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

const formSchema = z.object({
	term: z.string().min(1, 'Term is required'),
	definition: z.string().min(1, 'Definition is required'),
})

const FlashCardCreationForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			term: '',
			definition: '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	return (
		<div className="w-full">
			<Form {...form}>
				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

					<Button type="submit">Create</Button>
				</form>
			</Form>
		</div>
	)
}

export default FlashCardCreationForm
