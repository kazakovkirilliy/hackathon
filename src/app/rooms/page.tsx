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
        occupiedBy:
            data.items?.find(getOccupied)?.attendees?.filter((a) => !a?.self)
                ?.length ?? 0, //todo: zalypa...peredelat nado no ya zaebalsya spat ho4y suka blyat
    }

    return room
}

//Here is the nice copy of the below function. DO repeat yourself suka blyat
function getOccupied(event: any) {
    if (event.status === 'cancelled') {
        return null
    }

    const currentTime = new Date('2023-10-20T08:30:00+02:00').getTime()
    const eventStartTime = new Date(event.start.dateTime).getTime()
    const eventEndTime = new Date(event.end.dateTime).getTime()

    return currentTime >= eventStartTime && currentTime <= eventEndTime
        ? event
        : null
}

function isRoomOccupied(event: any): boolean {
    if (event.status === 'cancelled') {
        return true
    }

    const currentTime = new Date('2023-10-20T08:02:00+02:00').getTime()
    const eventStartTime = new Date(event.start.dateTime).getTime()
    const eventEndTime = new Date(event.end.dateTime).getTime()

    return currentTime >= eventStartTime && currentTime <= eventEndTime
}

async function fetchRooms(): Promise<Room[]> {
    const timeMax = new Date('2023-10-20T08:05:00+02:00').toISOString() //todo: +5 minutes from the currentData
    const timeMin = new Date('2023-10-20T08:00:00+02:00').toISOString()

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
                                `ya29.a0AfB_byAWEZxkgJDmMw_tX4PYORL-HlBMLpjcvmXRudGA2NKjbfmi1eurDQYceGiIYMShk8e0-O05GBJSw7Me8rRuVdpkXNoWzri1QG0F6BP3hkqaPIGXNE6ti3cx7xylz3UKXWFa3wndTfi_DKnBsxvNYdZNMY4c647uJgaCgYKAQESARESFQGOcNnC7vykJYlnOTee5_DGEHNnng0173`,
                        },
                    }
                ).then(async (res) => {
                    const obj = await res.json()
                    return {
                        ...obj,
                        id: key,
                        googleId: value.id,
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
