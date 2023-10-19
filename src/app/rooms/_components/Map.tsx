import { FC, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { MapSvg } from './MapSvg'
import { useRouter } from 'next/navigation'
import { Room } from '~/app/types'


type Props = {
    rooms: Room[]
}

export const Map = (props: Props) => {
    const router = useRouter()
    const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>()

    const onRoomSelect = (id: string) => {
        router.push(`/rooms/${id}`)
    }

    return <div className={'flex flex-1 w-full h-full'}><MapSvg rooms={props.rooms} onRoomSelect={onRoomSelect} /></div>

}