import { Button } from '~/components/ui/button'
import { ListIcon, MapIcon } from 'lucide-react'

type Props = {
    tabIndex: number;
    setTabIndex: (index: number) => void;
}

export const Toggler = ({ tabIndex, setTabIndex }: Props) => {
    const toggle = () => {
        if (tabIndex === 0) {
            setTabIndex(1)
        } else {
            setTabIndex(0)
        }
    }

    const icon = tabIndex === 1 ? <MapIcon /> : <ListIcon />

    return (
        <Button size={'icon'} variant={'ghost'} onClick={toggle}>{icon}</Button>
    )
}