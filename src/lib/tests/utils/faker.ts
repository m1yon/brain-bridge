import { faker as fakerJS } from '@faker-js/faker'
import random from 'lodash/random'

const faker = {
	utils: {
		random: {
			number: random,
		},
	},
	...fakerJS,
}

export default faker
