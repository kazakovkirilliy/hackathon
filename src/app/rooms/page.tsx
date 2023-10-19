import { Room } from '~/app/types'
import { Tabs } from '~/app/rooms/_components/Tabs'
import { meetingRooms, roomIds } from '~/constants'

type Props = {
    rooms: Room[]
}

function transform(data: any): Room {
    const now = Date.now()
    // Extract relevant fields from the input data and map them to the Room type
    const room: Room = {
        ...data,
        title: data.id,
        capacity: meetingRooms[data.id]?.capacity ?? 0,
        isAvailable: !data.items?.some(isRoomOccupied), // You can set availability based on the accessRole or other criteria
    }

    return room
}

function isRoomOccupied(event: any): boolean {
    if (event.status === 'cancelled') {
        return true
    }

    const currentTime = new Date('2023-10-20T08:30:00.000Z').toISOString()
    const eventStartTime = new Date(event.start.dateTime)
    const eventEndTime = new Date(event.end.dateTime)

    return (
        currentTime >= eventStartTime.toISOString() &&
        currentTime <= eventEndTime.toISOString()
    )
}

async function fetchRooms(): Promise<Room[]> {
    const fromDateTime = new Date('2023-10-20T09:00:00.000Z').toISOString()
    const toDateTime = new Date('2023-10-20T10:00:00.000Z').toISOString()

    return Promise.all(
        Object.entries(meetingRooms)
            .map(([key, value]) =>
                fetch(
                    `https://www.googleapis.com/calendar/v3/calendars/${value.id}/events?timeMin=${fromDateTime}&timeMax=${toDateTime}&showDeleted=false`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Bearer ' +
                                `ya29.a0AfB_byBi73q-2Om3fx6BO1EJ96ZsxdNnQdZ9TTvOTL2g1LNV4zpfab8yfSePScfod5rqFwKAajo8V_dnC_r15R8pywEDU6g8i8Aq3lup6xZQ1I4700BDBvMvRGiOYQG01wnewW-pFzjdwZIM-7oKUnRPPJldQi3FheEq1gaCgYKARkSARESFQGOcNnCpNN6d9pvT1vPJM2BvUzcFg0173`,
                        },
                    }
                ).then(async (res) => {
                    const obj = await res.json()
                    return {
                        ...obj,
                        id: key,
                    }
                })
            )
            .map((res) => res.then(transform))
    )
}

export default async function RoomsPage(props: Props) {
    const rooms = await fetchRooms()

    return (
        <main className="flex flex-1 h-full flex-col items-center">
            <Tabs rooms={rooms} />
        </main>
    )
}
