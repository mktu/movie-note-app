import type { ComponentProps, FC } from 'react'
import { useMovieNoteStore } from '../../movie-note/hooks/useMovieNoteStore';
import Container from './Container'

type Props = Omit<ComponentProps<typeof Container>, 'saveStateInStore'> & {
    noteId: string,
    lastupdated?: string
}

const StorableEditor: FC<Props> = ({
    noteId, init, lastupdated, ...props
}) => {
    const { saveMovieNoteState, stored } = useMovieNoteStore({ noteId, init, lastupdated })
    return (
        <Container monitorCurrentState={(data) => {
            data !== init && saveMovieNoteState({
                date: new Date().toISOString(),
                note: data,
                id: noteId
            })
        }} key={String(init === stored)} init={stored} {...props} />
    );
};

export default StorableEditor;