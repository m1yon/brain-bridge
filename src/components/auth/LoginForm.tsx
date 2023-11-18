'use client'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/primitives/Card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/primitives/Form'
import { Input } from '@/components/primitives/Input'
import { AuthService } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import LoginFormFooter from './LoginFormFooter'

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, 'Password is required'),
})

const LoginForm = () => {
	const router = useRouter()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	return (
		<Card className="max-w-lg grow">
			<CardHeader>
				<CardTitle>Login</CardTitle>
			</CardHeader>

			<Form {...form}>
				<form
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					action={async () => {
						const valid = await form.trigger()

						if (valid) {
							const result = await AuthService.login(form.getValues())

							if (result.error) {
								form.setError('root', { message: result.error.message })
								return
							}

							router.push('/')
						}
					}}
					noValidate
				>
					<CardContent>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{form.formState.errors.root ? (
							<FormMessage>{form.formState.errors.root?.message}</FormMessage>
						) : null}
					</CardContent>

					<LoginFormFooter />
				</form>
			</Form>
		</Card>
	)
}

export default LoginForm
