'use client'

import { Room } from '~/app/types'
import { Map } from '~/app/rooms/_components/Map'
import { useParams } from 'next/navigation'
import { FC, ReactNode, useMemo, useState } from 'react'
import { RoomList } from '~/app/rooms/_components/RoomList'
import Image from 'next/image'
import { Button } from '~/components/ui/button'
import { ListIcon, MapIcon } from 'lucide-react'
import { Input } from '~/components/ui/input'

type Props = {
    rooms: Room[];
}

const tabs = [Map, RoomList]

export default function RoomsPage(props: Props) {
    const { id } = useParams()
    const [searchTerm, setSearchTerm] = useState()
    const [tabIndex, setTabIndex] = useState(0)

    const Component = useMemo(() => {
        return tabs[tabIndex] as FC
    }, [tabIndex])

    return (
        <main className='flex flex-1 h-full flex-col items-center px-2'>
            <div className={'flex w-full justify-between gap-x-4 items-center mb-4'}>
                <Image width={60} height={60} src={'/icon-192x192.png'} alt={'GoodData'} />
                <Input placeholder={'Hledat uživatele/místnost'} />

                {/*Toggler*/}
                <div className={'flex gap-x-2 px-3 py-2 bg-slate-100 rounded-md'}>
                    <Button type={'button'} variant={tabIndex === 0 ? 'default' : 'outline'}
                            onClick={() => setTabIndex(0)}><MapIcon /></Button>
                    <Button type={'button'} variant={tabIndex === 1 ? 'default' : 'outline'}
                            onClick={() => setTabIndex(1)}><ListIcon /></Button>
                </div>
            </div>

            <Component />
        </main>
    )
};
