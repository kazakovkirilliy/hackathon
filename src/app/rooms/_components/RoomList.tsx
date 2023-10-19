import { FC, useCallback } from 'react'
import { RoomListItem } from '~/entities/room-list-item'
import { Separator } from '~/components/ui/separator'
import { Room } from '~/app/types'
import { useRouter } from 'next/navigation'

export const RoomList = ({ rooms }: { rooms: Room[] }) => {
    const router = useRouter()

    const onRoomSelect = useCallback(
        (name: string, id: string) => {
            router.push(`/rooms/${name}?roomId=${id}`)
        },
        [router]
    )

    return (
        <div className="w-full h-full px-2">
            <h2 className="text-center">Rooms</h2>
            <Separator className="shadow-md mt-4 mb-4" />

            <div className="flex-col flex gap-2 overflow-y-auto -mx-2 px-2 pb-4">
                {rooms?.length ? (
                    rooms.map((r, i) => (
                        <RoomListItem
                            key={r.id}
                            {...r}
                            onRoomSelect={onRoomSelect}
                        />
                    ))
                ) : (
                    <h1 className="text-center">No rooms found.</h1>
                )}
            </div>
        </div>
    )
}
