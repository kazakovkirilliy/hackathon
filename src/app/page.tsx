import RoomsPage from '~/app/rooms/page'
import { Room } from '~/app/types'
import { redirect } from 'next/navigation'

export const revalidate = 1

export default async function Home() {
    return redirect('/rooms')
}
