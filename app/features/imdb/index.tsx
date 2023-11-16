import type { FC } from 'react'
import useImdb from './hooks/useImdb';
import ImdbRateLabel, { ImdbIcon } from './components'
import Placeholder from './components/Placeholder'

type Props = {
    imdbId?: string,
    className?: string,
}

const Imdb: FC<Props> = ({
    imdbId,
    className
}) => {
    const { rateInfo, loading } = useImdb(imdbId)
    return rateInfo ? (
        <ImdbRateLabel className={className} {...rateInfo} imdbId={imdbId!} />
    ) : (
        <Placeholder className={className} loading={loading} />
    )
};

export { ImdbRateLabel, ImdbIcon }

export default Imdb;