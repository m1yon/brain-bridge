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
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import LoginFormFooter from './LoginFormFooter'
import { Button } from '../primitives/Button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Separator } from '../primitives/Separator'
import { AuthActions } from '@/actions'

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

			<CardContent>
				<Button
					className="w-full bg-[#333] text-[#fafafa] hover:bg-[#444]"
					onClick={() =>
						void AuthActions.signIn({ provider: 'github', redirectTo: '/' })
					}
				>
					<GitHubLogoIcon className="mr-3 h-5 w-5" />
					Sign in with GitHub
				</Button>
			</CardContent>

			<CardContent>
				<div className="flex flex-row items-center gap-5">
					<Separator className="shrink" />
					<span>or</span>
					<Separator className="shrink" />
				</div>
			</CardContent>

			<Form {...form}>
				<form
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					action={async () => {
						const valid = await form.trigger()

						if (valid) {
							// TODO: validate

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
