import type { FC } from 'react';
import Switch from '~/components/switch/Switch';

import { useMovieNoteKvDisabled } from '../../store/localstorage/movieNoteKvDisabled';

const Settings: FC = () => {
    const { setMovieNoteKvDisabled, isMovieNoteKvDisabled } = useMovieNoteKvDisabled()
    return (
        <div className=''>
            <Switch label='Disable KV' labelClass='text-onprimary-main' enabled={isMovieNoteKvDisabled()} setEnabled={(checked) => {
                setMovieNoteKvDisabled(checked)
            }} />
        </div>
    );
};

export default Settings;