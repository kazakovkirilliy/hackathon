import { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Room } from '~/app/types'
import { Button } from '~/components/ui/button'
import { Users } from 'lucide-react'

type RoomListItemProps = Room & {
    onRoomSelect: (name: string, id: string) => void
}
export const RoomListItem = (props: RoomListItemProps) => {
    const {
        id,
        title,
        capacity,
        isAvailable,
        onRoomSelect,
        googleId,
        occupiedBy,
    } = props

    const onBook = (e: MouseEvent) => {
        e.stopPropagation()
        //todo: handle
    }

    const availabilityClass = isAvailable ? 'bg-green-500' : 'bg-red-500'

    return (
        <div
            className="w-full h-12 shadow-md flex items-center rounded-md p-3 justify-between border border-gray-100"
            onClick={() => onRoomSelect(title, googleId)}
        >
            <div className="flex items-center truncate">
                <div
                    className={`rounded-full w-4 h-4 flex mr-2 flex-shrink-0 ${availabilityClass}`}
                ></div>

                <p className="text-gray-900">{title}</p>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center text-gray-300 pl-1">
                    <p className="text-md pr-1">
                        {!isAvailable ? `${occupiedBy}/${capacity}` : capacity}
                    </p>
                    <Users className="w-5 h-5" />
                </div>

                <Button
                    className={`${
                        isAvailable ? 'bg-[#ed26b7]' : ''
                    } px-8 shadow-md`}
                    variant={isAvailable ? 'default' : 'outline'}
                    size="sm"
                    disabled={!isAvailable}
                    onClick={onBook}
                >
                    Book
                </Button>
            </div>
        </div>
    )
}
