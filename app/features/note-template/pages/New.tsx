import type { FC } from 'react'
import { NoteTemplateLayout } from '../layout';
import Rte from '~/features/rte';
import { NewHeader } from '../components/header';
import { useNoteTemplate } from '../hooks/useNoteTemplate';
import { useTranslation } from 'react-i18next';

const New: FC = () => {
    const { setContentGetter } = useNoteTemplate()
    const { t } = useTranslation('common')
    return (
        <NoteTemplateLayout
            header={<NewHeader />}
            note={<Rte
                placeholder={`${t('template-place-holder')}`}
                setContentGetter={setContentGetter}
                onChange={() => {

                }}
                toolbarOptions={{
                    template: 'create'
                }}
            />}
        />
    );
};

export default New;