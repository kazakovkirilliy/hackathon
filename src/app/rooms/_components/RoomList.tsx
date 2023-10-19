import { FC } from 'react'
import { RoomListItem } from '~/entities/room-list-item'
import { Separator } from '~/components/ui/separator'

export const RoomList: FC = ({ rooms }: { rooms: any[] }) => {
    return (
        <div className="flex w-full h-full flex-col">
            {/*<h2 className="text-center">Rooms</h2>*/}
            {/*<Separator className="shadow-md" />*/}

            {rooms?.length ? (
                rooms.map((r) => (
                    <div className="" key={r.id}>
                        <RoomListItem />
                    </div>
                ))
            ) : (
                <h1 className="text-center">No rooms found.</h1>
            )}
        </div>
    )
}
