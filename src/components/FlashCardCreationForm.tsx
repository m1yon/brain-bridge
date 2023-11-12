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

const formSchema = z.object({
	term: z.string(),
})

const FlashCardCreationForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			term: '',
		},
	})

	return (
		<div className="max-w-lg">
			<Form {...form}>
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
			</Form>
		</div>
	)
}

export default FlashCardCreationForm
