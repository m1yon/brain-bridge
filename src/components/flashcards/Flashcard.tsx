import { cn } from '@/utils/cn'

type FlashcardProps = {
	term: string
	definition: string
	isDefinitionShown: boolean
	onClick: () => void
}

const Flashcard = ({
	term,
	definition,
	isDefinitionShown,
	onClick,
}: FlashcardProps) => {
	return (
		<div
			className="group h-full cursor-pointer select-none duration-200 ease-out animate-in fade-in slide-in-from-top-8 perspective-1000"
			onClick={onClick}
		>
			<div
				className={cn(
					'relative h-full w-full duration-200 transform-style-3d',
					isDefinitionShown && 'rotate-x-180',
				)}
			>
				<div className="absolute flex h-full w-full items-center justify-center bg-secondary p-16 text-2xl text-secondary-foreground backface-hidden">
					{term}
				</div>
				<div className="absolute flex h-full w-full items-center justify-center overflow-hidden bg-secondary p-16 text-2xl text-secondary-foreground rotate-x-180 backface-hidden">
					{definition}
				</div>
			</div>
		</div>
	)
}

export default Flashcard
