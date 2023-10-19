'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { meetingRooms, roomIds } from '~/constants'
import { Room } from '~/app/types'
import { endOfDay, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'

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
        `https://www.googleapis.com/calendar/v3/calendars/${id}/events?timeMin=${timeMin}&timeMax=${timeMax}&showDeleted=false&timeZone=Europe/Prague&showDeleted=false`,
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
                .sort(
                    (a, b) =>
                        new Date(a.start).getTime() -
                        new Date(b.start).getTime()
                )

            console.log(events)
            setEvents(events)
        }

        fetch()
    }, [searchParams])

    return (
        <main className="flex min-h-screen flex-col items-center px-4">
            <div>RoomDetailsPage</div>

            <h1 className={'text-2xl font-bold'}>{decodeURI(params.id)}</h1>

            {/*{JSON.stringify(events, null, 2)}*/}

            <ol className="relative border-l border-gray-200 dark:border-gray-700 w-full">
                {events
                    .sort(
                        (a, b) =>
                            new Date(a.start).getTime() -
                            new Date(b.start).getTime()
                    )
                    .map((event) => (
                        <li className="mb-10 ml-4">
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
                {/*<li className="mb-10 ml-4">*/}
                {/*    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>*/}
                {/*    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">*/}
                {/*        February 2022*/}
                {/*    </time>*/}
                {/*    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">*/}
                {/*        Application UI code in Tailwind CSS*/}
                {/*    </h3>*/}
                {/*    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">*/}
                {/*        Get access to over 20+ pages including a dashboard*/}
                {/*        layout, charts, kanban board, calendar, and pre-order*/}
                {/*        E-commerce & Marketing pages.*/}
                {/*    </p>*/}
                {/*    <a*/}
                {/*        href="#"*/}
                {/*        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"*/}
                {/*    >*/}
                {/*        Learn more{' '}*/}
                {/*        <svg*/}
                {/*            className="w-3 h-3 ml-2"*/}
                {/*            aria-hidden="true"*/}
                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                {/*            fill="none"*/}
                {/*            viewBox="0 0 14 10"*/}
                {/*        >*/}
                {/*            <path*/}
                {/*                stroke="currentColor"*/}
                {/*                stroke-linecap="round"*/}
                {/*                stroke-linejoin="round"*/}
                {/*                stroke-width="2"*/}
                {/*                d="M1 5h12m0 0L9 1m4 4L9 9"*/}
                {/*            />*/}
                {/*        </svg>*/}
                {/*    </a>*/}
                {/*</li>*/}
                {/*<li className="mb-10 ml-4">*/}
                {/*    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>*/}
                {/*    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">*/}
                {/*        March 2022*/}
                {/*    </time>*/}
                {/*    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">*/}
                {/*        Marketing UI design in Figma*/}
                {/*    </h3>*/}
                {/*    <p className="text-base font-normal text-gray-500 dark:text-gray-400">*/}
                {/*        All of the pages and components are first designed in*/}
                {/*        Figma and we keep a parity between the two versions even*/}
                {/*        as we update the project.*/}
                {/*    </p>*/}
                {/*</li>*/}
                {/*<li className="ml-4">*/}
                {/*    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>*/}
                {/*    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">*/}
                {/*        April 2022*/}
                {/*    </time>*/}
                {/*    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">*/}
                {/*        E-Commerce UI code in Tailwind CSS*/}
                {/*    </h3>*/}
                {/*    <p className="text-base font-normal text-gray-500 dark:text-gray-400">*/}
                {/*        Get started with dozens of web components and*/}
                {/*        interactive elements built on top of Tailwind CSS.*/}
                {/*    </p>*/}
                {/*</li>*/}
            </ol>
        </main>
    )
}
