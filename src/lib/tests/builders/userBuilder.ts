import { User } from '@/lib/data-access/interfaces/IUser'
import { build, perBuild } from '@jackfranklin/test-data-bot'
import faker from '../utils/faker'

export const userBuilder = build<User>({
	fields: {
		id: perBuild(() => faker.string.uuid()),
		name: perBuild(() => faker.person.fullName()),
		email: perBuild(() => faker.internet.email()),
		image: perBuild(() => faker.internet.avatar()),
	},
})
