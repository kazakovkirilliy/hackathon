'use client'

import { FC, useMemo, useState } from 'react'
import { Map, MapProps } from '~/app/rooms/_components/Map'
import { RoomList } from '~/app/rooms/_components/RoomList'
import { Room } from '~/app/types'
import { Input } from '~/components/ui/input'
import Image from 'next/image'
import { Toggler } from '~/app/rooms/_components/Toggler'

type Props = {
    rooms: Room[]
}

const tabs = [Map, RoomList]

export const Tabs = (props: Props) => {
    const [tabIndex, setTabIndex] = useState(0)

    const Component = useMemo(() => {
        return tabs[tabIndex] as FC<MapProps>
    }, [tabIndex])

    return (
        <>
            <nav
                className={
                    'flex w-full items-center mb-4 bg-slate-100 px-4 py-2 border-b gap-x-4'
                }
            >
                <Image
                    width={50}
                    height={50}
                    style={{ filter: 'invert(1)' }}
                    src={'https://demo.cloud.gooddata.com/images/logo.png'}
                    alt={'GoodData'}
                />
                <Input placeholder={'Hledat uživatele/místnost'} />

                <Toggler tabIndex={tabIndex} setTabIndex={setTabIndex} />
            </nav>

            <Component {...props} />
        </>
    )
}
