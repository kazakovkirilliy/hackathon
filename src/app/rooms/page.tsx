'use client'

import { Room } from '~/app/types'

type Props = {
    rooms: Room[];
}

export default function RoomsPage(props: Props) {
    return (
        <main className='flex min-h-screen flex-col items-center'>
            <div>Rooms</div>
        </main>
    )
};
