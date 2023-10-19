import { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Room } from '~/app/types'
import { Button } from '~/components/ui/button'
import { Users } from 'lucide-react'

type RoomListItemProps = Room & { onRoomSelect: (id: string) => void }
export const RoomListItem = ({
    id,
    title,
    capacity,
    isAvailable,
    onRoomSelect,
}: RoomListItemProps) => {
    const onBook = (e: MouseEvent) => {
        e.stopPropagation()
        //todo: handle
    }

    const availabilityClass = isAvailable ? 'bg-green-500' : 'bg-red-500'

    return (
        <div
            className="w-full h-12 shadow-md flex items-center rounded-md p-3 justify-between border border-gray-100"
            onClick={() => onRoomSelect(id)}
        >
            <div className="flex items-center">
                <div
                    className={`rounded-full w-4 h-4 flex mr-2 ${availabilityClass}`}
                ></div>

                <p className="text-gray-900">{title}</p>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center text-gray-300">
                    <p className="text-md pr-1">{capacity}</p>
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
