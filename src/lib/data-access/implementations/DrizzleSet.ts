'use server'

import { set } from '@/db/schema'
import { SetOperations } from '../interfaces/ISet'
import { db } from '@/db'
import { revalidateTag } from 'next/cache'

export const getAllSets: SetOperations['getAllSets'] = async () => {
	return db.query.set.findMany()
}

export const createSet: SetOperations['createSet'] = async (args) => {
	await db.insert(set).values(args)

	revalidateTag('get-all-sets')
}
