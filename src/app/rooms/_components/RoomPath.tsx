import { SVGProps } from 'react'

type Props = SVGProps<SVGPathElement> & {
    isAvailable: boolean;
}

export const RoomPath = ({ isAvailable, ...pathProps }: Props) => {
    return <path fill={isAvailable ? 'green' : 'red'} {...pathProps} />
}