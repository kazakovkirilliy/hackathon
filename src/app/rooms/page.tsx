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

    const currentTime = new Date('2023-10-20T08:30:00+02:00').getTime()
    const eventStartTime = new Date(event.start.dateTime).getTime()
    const eventEndTime = new Date(event.end.dateTime).getTime()

    return currentTime >= eventStartTime && currentTime <= eventEndTime
}

async function fetchRooms(): Promise<Room[]> {
    const timeMax = new Date('2023-10-20T09:05:00+02:00').toISOString()
    const timeMin = new Date('2023-10-20T09:00:00+02:00').toISOString()

    return Promise.all(
        Object.entries(meetingRooms)
            .map(([key, value]) =>
                fetch(
                    `https://www.googleapis.com/calendar/v3/calendars/${value.id}/events?timeMin=${timeMin}&timeMax=${timeMax}&showDeleted=false&timeZone=Europe/Prague&showDeleted=false`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Bearer ' +
                                `ya29.a0AfB_byACiR3h_X8uqRnOPhrgd7p_AGFkZwpJCSV6WQmzQZKJz7cON8OuSGyTdLRyHtAFg0XkTLj46CtuCu-eojMsUp_73z7e54-iyWxfHGYcgIgXd710SLvoqdRnWnJyps9Hbp4YzMUgLdzkt3jQ439qG8-YvibCxIZXaCgYKAfMSARESFQGOcNnCsx5SX8SgHFW_Fm8-1acl3w0171`,
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
