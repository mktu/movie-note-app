import type { FC } from 'react'
import type { MovieCredits, Actor } from '~/features/tmdb';
import { Actor as ActorComponent, MovieCredits as MovieCreditsComponent } from '~/features/movie/components/actor'
import { ActorHeader, ActorLayout } from '../components';

type Props = {
    error?: string,
    actor: Actor,
    movieCredits: MovieCredits
}

const ActorPage: FC<Props> = ({
    error,
    actor,
    movieCredits
}) => {
    return (
        <ActorLayout
            header={<ActorHeader
                error={error}
                actorName={actor.name}
            />}
            actor={<ActorComponent actor={actor} />}
            movieCredits={<MovieCreditsComponent movieCredits={movieCredits} />}
        />
    );
};

export default ActorPage;