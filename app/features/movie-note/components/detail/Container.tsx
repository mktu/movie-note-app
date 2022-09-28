import type { ComponentProps, FC } from 'react';
import { useContext, useState } from 'react';
import { IconButton } from '~/components/buttons';
import Expand from '~/components/icons/Expand';
import Minimize from '~/components/icons/Minimize';

import { Transition } from '@headlessui/react';

import LocalstorageContext from '../../providers/localstorage/Context';
import Detail from './Detail';
import Summary from './Summary';

type Props = ComponentProps<typeof Detail>

const Container: FC<Props> = (props) => {
    const [hover, setHover] = useState(false)
    const { saveMovieDetailType, getMovieDetailType } = useContext(LocalstorageContext)
    const showSummary = getMovieDetailType() === 'summary'
    return (
        <div className={`relative w-full rounded-xl p-2 ${hover ? ' bg-surface-hover' : ''}`}>
            <div onMouseLeave={() => { setHover(false) }} onFocus={() => { setHover(true) }} onMouseOver={() => { setHover(true) }}
                className='absolute right-1 top-1 z-10'>
                <IconButton onClick={() => {
                    saveMovieDetailType(showSummary ? 'detail' : 'summary')
                }} name='minimize' className='p-1'>
                    {
                        showSummary ?
                            <Expand className={`h-5 w-5  ${hover ? 'fill-border-dark' : 'fill-border-main'}`} />
                            : <Minimize className={`h-5 w-5  ${hover ? 'fill-border-dark' : 'fill-border-main'}`} />}
                </IconButton>
            </div>
            <Transition
                show={showSummary}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
            >
                <Summary {...props} />
            </Transition>
            <Transition
                show={!showSummary}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
            >
                <Detail {...props} />
            </Transition>
        </div>
    );
};

export default Container;