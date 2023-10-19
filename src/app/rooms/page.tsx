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
        isAvailable: !data.items?.some(isRoomAvailable), // You can set availability based on the accessRole or other criteria
    }

    return room
}

function isRoomAvailable(event: any): boolean {
    if (event.status === 'cancelled') {
        return true
    }

    const currentTime = new Date(Date.now()).toISOString()
    const eventStartTime = new Date(event.start.dateTime)
    const eventEndTime = new Date(event.end.dateTime)

    return (
        currentTime >= eventStartTime.toISOString() &&
        currentTime <= eventEndTime.toISOString()
    )
}

async function fetchRooms(): Promise<Room[]> {
    const fromDateTime = new Date('2023-10-24T10:30:00').toISOString()
    const toDateTime = new Date('2023-10-24T18:40:00').toISOString()

    return Promise.all(
        Object.entries(meetingRooms)
            .map(([key, value]) =>
                fetch(
                    `https://www.googleapis.com/calendar/v3/calendars/${value.id}/events?timeMin=${fromDateTime}&timeMax=${toDateTime}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Bearer ' +
                                `ya29.a0AfB_byBBnB3dr03rivcP3C4kBanfMuFBtOuVoYP_KM3rvxAnPK2UDKgVb3QqlotxWxs7Cu6pfIrdYBZY1gqsu6d8M-DgZC7eUn2jZhkYW-07hi8po1wzewXO9ynGVvsoplj-DfM_ocMmDJdyxevRxUobhkd1c4pCX9dlUwaCgYKASsSARESFQGOcNnCp0e2kqUzeDVYpxDDA_mXLg0173`,
                        },
                    }
                ).then((res) => res.json())
            )
            .map((res) => res.then(transform))
    )
}

export default async function RoomsPage(props: Props) {
    const rooms = await fetchRooms()

    // console.log(rooms)

    return (
        <main className="flex flex-1 h-full flex-col items-center">
            <Tabs rooms={rooms} />
        </main>
    )
}
