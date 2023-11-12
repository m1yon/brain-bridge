import * as drizzleFlashCardOperations from './lib/data-access/implementations/DrizzleFlashCard'
import { FlashCardOperations } from './lib/data-access/interfaces/IFlashCard'

export const flashCardService: FlashCardOperations = drizzleFlashCardOperations
