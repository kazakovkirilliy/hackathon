'use client'

import { FC, useMemo, useState } from 'react'
import { Map, MapProps } from '~/app/rooms/_components/Map'
import { RoomList } from '~/app/rooms/_components/RoomList'
import { Room } from '~/app/types'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { ListIcon, MapIcon } from 'lucide-react'
import Image from 'next/image'
import { Toggler } from '~/app/rooms/_components/Toggler'

const tabs = [Map, RoomList]

type Props = {
    rooms: Room[];
}

export const Tabs = (props: Props) => {
    const [tabIndex, setTabIndex] = useState(0)

    const Component = useMemo(() => {
        return tabs[tabIndex] as FC<MapProps>
    }, [tabIndex])

    return <>
        <nav className={'flex w-full justify-between gap-x-4 items-center mb-4'}>
            <Image width={60} height={60} src={'/icon-192x192.png'} alt={'GoodData'} />
            <Input placeholder={'Hledat uživatele/místnost'} />

            <Toggler tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </nav>

        <Component {...props} />
    </>

}