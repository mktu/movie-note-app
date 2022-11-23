import { TmdbmageBasePath } from '@utils/constants'
import clsx from 'clsx'
import type { FC } from 'react'
import Image from '~/components/Image'
import { useNavigatorContext } from '~/providers/navigator/Context'



const imageBasePath = `${TmdbmageBasePath}/w440_and_h660_face`
const imageBasePaths = [
    `${TmdbmageBasePath}/w220_and_h330_face`,
    imageBasePath,
]

type Props = {
    poster_path?: string,
    title: string,
    overview?: string,
    release_date: string,
    path: string,
    className?: string
}
const Card: FC<Props> = ({
    poster_path,
    title,
    path,
    overview,
    release_date,
    className
}) => {
    const { navigator: Navigator } = useNavigatorContext()
    return (
        <div className={clsx('flex flex-col gap-2 justify-start', className)}>
            <Navigator to={path}>
                <Image
                    className='rounded'
                    alt={title}
                    src={poster_path && `${imageBasePath}/${poster_path}`}
                    srcSet={poster_path && imageBasePaths.map((path, idx) => `${path}/${poster_path} ${idx + 1}x`).join(',')}
                    width={150}
                    height={225} />
            </Navigator>
            <h3 className='text-base font-semibold'>
                <Navigator className='text-text-main' to={path}>{title}</Navigator >
            </h3>
            <div>
                {release_date}
            </div>
        </div>
    );
};

export default Card;