import { Button } from '~/components/ui/button'
import { ListIcon, MapIcon } from 'lucide-react'

type Props = {
    tabIndex: number;
    setTabIndex: (index: number) => void;
}

export const Toggler = ({ tabIndex, setTabIndex }: Props) => {
    return (
        <div className={'flex gap-x-2 px-3 py-2 bg-slate-100 rounded-md'}>
            <Button type={'button'} variant={tabIndex === 0 ? 'default' : 'outline'}
                    onClick={() => setTabIndex(0)}><MapIcon /></Button>
            <Button type={'button'} variant={tabIndex === 1 ? 'default' : 'outline'}
                    onClick={() => setTabIndex(1)}><ListIcon /></Button>
        </div>
    )
}