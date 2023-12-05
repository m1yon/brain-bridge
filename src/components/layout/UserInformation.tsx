'use client'

import { ExitIcon } from '@radix-ui/react-icons'
import { signOutAction } from '../../lib/auth/actions'
import { Avatar, AvatarFallback, AvatarImage } from '../primitives/Avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../primitives/DropdownMenu'

type UserInformationProps = {
	image: string
	fallbackText: string
}

const UserInformation = ({ image, fallbackText }: UserInformationProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={image} />
					<AvatarFallback>{fallbackText}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" align="end" sideOffset={10}>
				<form
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					action={async () => signOutAction()}
				>
					<button type="submit" className="w-full">
						<DropdownMenuItem>
							<ExitIcon className="mr-2" /> Logout
						</DropdownMenuItem>
					</button>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserInformation
