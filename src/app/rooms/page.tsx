import { Room } from '~/app/types'
import { Tabs } from '~/app/rooms/_components/Tabs'

type Props = {
    rooms: Room[];
}

async function fetchRooms(): Promise<Room[]> {
    return new Promise((resolve) => {
        // timeout to simulate async
        setTimeout(() => {
            resolve([
                {
                    id: 'Perl',
                    title: 'Event 1',
                    description: 'This is event 1',
                    capacity: 5,
                    isAvailable: true,
                },
                {
                    id: 'Tetris',
                    title: 'Event 2',
                    description: 'This is event 2',
                    capacity: 15,
                    isAvailable: false,
                },
                {
                    id: 'Erlang',
                    title: 'Event 3',
                    description: 'This is event 3',
                    capacity: 5,
                    isAvailable: false,
                },
            ])
        }, 5000)
    })
}


export default async function RoomsPage(props: Props) {
    const rooms = await fetchRooms()
    return (
        <main className='flex flex-1 h-full flex-col items-center px-2'>
            <Tabs rooms={rooms} />
        </main>
    )
};
