'use client'

import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
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
import { PlusIcon } from '@radix-ui/react-icons'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './primitives/Dialog'
import { useState } from 'react'

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().optional(),
})

const SetCreationDialog = () => {
	const [open, setOpen] = useState(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	})

	return (
		<Dialog
			open={open}
			onOpenChange={(value) => {
				// reset the form when opening rather then when closing to prevent flash of bad state
				if (value) {
					form.reset()
				}

				setOpen(value)
			}}
		>
			<DialogTrigger asChild>
				<Button variant="secondary" className="h-full w-full">
					<PlusIcon className="h-5 w-5" />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
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
								setOpen(false)
							}
						}}
					>
						<DialogHeader>
							<DialogTitle>Create Set</DialogTitle>
							<DialogDescription>Create a new set.</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 pb-6 pt-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
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
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input
												placeholder="Study material for my web development interviews"
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<Button type="submit">Create</Button>
							<Button
								type="button"
								variant="ghost"
								onClick={() => {
									setOpen(false)
								}}
							>
								Cancel
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default SetCreationDialog
