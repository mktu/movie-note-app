import type { FC } from 'react'
import useImdb from './hooks/useImdb';
import Component from './components'
import Placeholder from './components/Placeholder'

type Props = {
    imdbId?: string,
    className?: string
}

const Imdb: FC<Props> = ({
    imdbId,
    className
}) => {
    const { rateInfo, loading } = useImdb(imdbId)
    return rateInfo ? (
        <Component className={className} {...rateInfo} imdbId={imdbId!} />
    ) : (
        <Placeholder className={className} loading={loading} />
    )
};

export default Imdb;