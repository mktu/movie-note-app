import type { FC } from 'react'
import { useNavigatorContext } from '~/providers/navigator/Context';
import { useMovieNoteContext } from '../../context/movie-note/Context';
import { useTranslation } from 'react-i18next';


const UnsavedNote: FC = () => {
    const { unsavedNoteInfo } = useMovieNoteContext()
    const { navigator: Navigator } = useNavigatorContext()
    const { t } = useTranslation()
    return (
        <div style={{
            display: unsavedNoteInfo && !unsavedNoteInfo.isCurrentNote ? 'flex' : 'none'
        }} className='flex w-full items-center justify-center gap-4 bg-sky-100 py-2 text-sm text-info-main'>
            <span>{unsavedNoteInfo?.message}</span>
            <Navigator className='underline' to={unsavedNoteInfo?.link || ''} >
                {t('back-to-edit')}
            </Navigator>
        </div>
    );
};

export default UnsavedNote;