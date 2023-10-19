import { Room } from '~/app/types'
import { Tabs } from '~/app/rooms/_components/Tabs'
import { roomIds } from '~/constants'

type Props = {
    rooms: Room[]
}

function transform(data: any): Room {
    const now = Date.now()
    // Extract relevant fields from the input data and map them to the Room type
    const room: Room = {
        id: data.id,
        title: data.summary,
        description: data.description, // You can modify this to the appropriate field
        capacity: 0, // You can set the capacity to an appropriate value
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
        Object.entries(roomIds)
            .map(([key, value]) =>
                fetch(
                    `https://www.googleapis.com/calendar/v3/calendars/${value}/events?timeMin=${fromDateTime}&timeMax=${toDateTime}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Bearer ' +
                                `ya29.a0AfB_byCcfTugF8HW2zQm_bCfZeEkhaV2ZbHNtA5mxhIxcSRjMTpU5QeN0-VaD98KKGovRrolBySI3aSrrm1ZQuZPrhRIJZqQD-CvyhT1CD-DIwyIqHinkXIUXilebntVcIWu9IpFUvq9XnSJFuc-BZJoBhAFb-_21mYmaCgYKAaASARESFQGOcNnCe-rDu5mLFYsx_67tCv0GtA0171`,
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
