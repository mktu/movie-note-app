import clsx from 'clsx';
import type { FC } from 'react'
import { useState } from 'react'
import { IconButton } from '~/components/buttons';
import Star from '~/components/icons/Star'

type Props = {
    stars: number,
    starSize?: string
    onSetStar: (star: number) => void
}

const isColored = (hoverPos: number, starPos: number, i: number) => {
    if (hoverPos > -1) {
        return hoverPos >= i
    }
    return starPos >= i
}

const Stars: FC<Props> = ({
    stars,
    starSize = 'w-6 h-6',
    onSetStar
}) => {
    const [hoverPos, setHoverPos] = useState(-1)
    return (
        <div className='flex items-center'>
            {[...Array(10)].map((_, i) => (
                <IconButton key={i} name='star'
                    onClick={() => {
                        onSetStar(i + 1)
                    }}
                    className={clsx(starSize)}
                    onMouseLeave={() => {
                        setHoverPos(-1)
                    }}
                    onMouseOver={() => {
                        setHoverPos(i + 1)
                    }}>
                    <Star className={`${isColored(hoverPos, stars, i + 1) ? 'fill-yellow-400' : 'fill-gray-400'}`} />
                </IconButton>
            ))}
        </div>
    );
};

export default Stars;