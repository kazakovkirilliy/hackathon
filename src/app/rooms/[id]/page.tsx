'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { endOfDay, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { ChevronLeft } from 'react-feather'

type Props = {}

// format using Intl.DateTimeFormat
function format(date: string) {
    return Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
    }).format(new Date(date))
}

async function fetchRooms(id: string): Promise<any> {
    const timeMax = endOfDay(new Date('2023-10-20T23:59:59.000Z')).toISOString()
    const timeMin = startOfDay(
        new Date('2023-10-20T00:00:00.000Z')
    ).toISOString()

    console.log({ timeMax, timeMin, id })

    const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${id}/events?timeMin=${timeMin}&timeMax=${timeMax}&showDeleted=false&timeZone=Europe/Prague&showDeleted=false&orderBy=startTime&singleEvents=true`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer ' +
                    `ya29.a0AfB_byDyl5rzgZPJRAKbLno7OTYwzv6ZJEOVjlOvOweWl8cECbqeED-5ITDpty3Fw85CeTee5GC2uoNf-GJC-qws40WnE0XBM8enzr-gpx5clX8KGx9hWhBXRuMQaSnmKxcK1-VeJ3RPoV8mJEXDlUx-_nAckNHNcOVJaCgYKAfMSARESFQGOcNnCTCrBRkmGkNvJEQ8iMtCyNg0171`,
            },
        }
    ).then((res) => res.json())

    return res
}

export default function RoomDetailsPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const [events, setEvents] = useState<{}[]>([])
    const router = useRouter()

    useEffect(() => {
        async function fetch() {
            const roomId = searchParams.get('roomId')
            if (!roomId) return
            const rooms = await fetchRooms(roomId)
            const events = rooms.items
                .map((item) => ({
                    title: item.summary,
                    location: item.location,
                    start: item.start?.dateTime,
                    end: item.end?.dateTime,
                    status: item.status,
                    attendeesCount: item.attendees?.length,
                }))
                .filter(
                    (item) =>
                        item.status !== 'cancelled' &&
                        new Date(item.start).getTime() > Date.now()
                )
            setEvents(events)
        }

        fetch()
    }, [searchParams])

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div
                className={
                    'flex items-center w-full py-4 px-2 mb-4 border-b gap-x-4'
                }
            >
                <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={() => router.back()}
                >
                    <ChevronLeft size={20} />
                </Button>
                <h1 className={'text-2xl font-bold mr-4'}>
                    {decodeURI(params.id)}
                </h1>
            </div>

            <div className={'px-4 w-full'}>
                <ol className="relative border-l border-gray-200 w-full">
                    {events.map((event) => (
                        <li key={event.title} className="mb-10 ml-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <div className={'flex flex-col gap-y-2'}>
                                <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
                                    From {format(event.start)} to{' '}
                                    {format(event.end)}
                                </time>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {event.title}
                            </h3>
                            <caption className="my-1 gap-x-2 flex items-center text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
                                <Users size={14} /> {event.attendeesCount}
                            </caption>
                        </li>
                    ))}
                </ol>
            </div>
        </main>
    )
}
