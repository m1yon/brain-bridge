import { UserService } from '@/lib/data-access'
import { z } from 'zod'

const CreateUserInputSchema = z.object({
	userId: z.string(),
	name: z.string(),
	email: z.string(),
	image: z.string().nullable(),
})

export async function POST(request: Request) {
	const body = await request.json()
	const { userId, name, email, image } = CreateUserInputSchema.parse(body)

	try {
		await UserService.createUser({
			id: userId,
			name,
			email,
			image,
		})

		return Response.json({ success: true })
	} catch {
		return Response.json({ success: false })
	}
}

export const dynamic = 'force-dynamic'
