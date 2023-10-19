import Image from 'next/image'
import EventsPage from '~/app/rooms/page'

async function fetchEvents(): Promise<{ id: string; title: string; description: string }[]> {
    return new Promise((resolve) => {
        // timeout to simulate async
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    title: 'Event 1',
                    description: 'This is event 1',
                },
                {
                    id: '2',
                    title: 'Event 2',
                    description: 'This is event 2',
                },
                {
                    id: '3',
                    title: 'Event 3',
                    description: 'This is event 3',
                },
            ])
        }, 5000)
    })
}

export default async function Home() {
    const events = await fetchEvents()

    return <EventsPage events={events} />
}
