'use client'

import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../primitives/Form'
import { Input } from '../primitives/Input'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SetService } from '@/services'
import CreateUpdateSetFormActions from './CreateUpdateSetFormActions'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import { Textarea } from '../primitives/Textarea'
import { Card, CardContent, CardHeader } from '../primitives/Card'
import { Button } from '../primitives/Button'
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().optional(),
	flashCards: z.array(
		z.object({
			term: z.string().min(1, 'Term is required'),
			definition: z.string().min(1, 'Definition is required'),
		}),
	),
})

const CreateUpdateSetForm = () => {
	const { toast } = useToast()
	const router = useRouter()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
		mode: 'onSubmit',
	})
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'flashCards',
	})

	return (
		<Form {...form}>
			<form
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				action={async () => {
					const valid = await form.trigger()

					if (valid) {
						const setId = await SetService.createSet({
							...form.getValues(),
							description: form.getValues().description || null,
						})

						router.replace(setId)

						toast({
							description: `New set "${
								form.getValues().name
							}" has been created.`,
						})
					}
				}}
			>
				<div className="pb-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="mb-4">
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Web Development" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="mb-8">
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Study material for my web development interviews"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<h2 className="mb-4 text-2xl font-bold">Flash Cards</h2>

					{fields.map((field, index) => {
						return (
							<Card key={field.id} className="mb-4">
								<CardHeader className="flex-row items-end gap-4">
									<FormField
										control={form.control}
										name={`flashCards.${index}.term`}
										render={({ field }) => (
											<FormItem className="grow">
												<FormLabel>Term</FormLabel>
												<div className="flex gap-4">
													<FormControl>
														<Input placeholder="TypeScript" {...field} />
													</FormControl>
													<Button
														variant="outline"
														size="default"
														onClick={() => remove(index)}
													>
														<TrashIcon className="h-4 w-4" />
													</Button>
												</div>

												<FormMessage />
											</FormItem>
										)}
									/>
								</CardHeader>
								<CardContent className="space-y-6">
									<FormField
										control={form.control}
										name={`flashCards.${index}.definition`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Definition</FormLabel>
												<FormControl>
													<Textarea
														placeholder="a strongly typed programming language that builds on JavaScript"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						)
					})}

					<Button
						variant="secondary"
						className="w-full"
						onClick={() => append({ definition: '', term: '' })}
						type="button"
					>
						<PlusIcon className="h-5 w-5" />
					</Button>
				</div>

				<CreateUpdateSetFormActions />
			</form>
		</Form>
	)
}

export default CreateUpdateSetForm
