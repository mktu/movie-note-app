import type { ComponentProps, FC } from 'react';
import { useState } from 'react';

import { Transition } from '@headlessui/react';

import { useMovieDetailType } from '../../store/cookie/movieDetailType';
import Detail from './Detail';
import Summary from './Summary';
import ViewSwitcher from './ViewSwitcher'

type Props = ComponentProps<typeof Detail>

const Container: FC<Props> = (props) => {
    const [hover, setHover] = useState(false)
    const { setMovieDetailType, movieDetailType } = useMovieDetailType()
    const showSummary = movieDetailType === 'summary'
    return (
        <div className={`relative w-full rounded-xl p-2 ${hover ? ' bg-surface-hover' : ''}`} onMouseLeave={() => { setHover(false) }}>
            <div onMouseLeave={() => { setHover(false) }} onFocus={() => { setHover(true) }} onMouseOver={() => { setHover(true) }}
                className='absolute right-1 top-1 z-10'>
                <ViewSwitcher
                    onSwitch={(showSummary) => {
                        setMovieDetailType(showSummary ? 'summary' : 'detail')
                    }}
                    showSummary={showSummary}
                />
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