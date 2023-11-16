import type { FC } from 'react'
import { NoteTemplateLayout } from '../layout';
import Rte from '~/features/rte';
import { NewHeader } from '../components/header';
import { useNoteTemplate } from '../hooks/useNoteTemplate';
import { useTranslation } from 'react-i18next';
import type { AddNoteTemplate } from '@type-defs/frontend';

type Props = {
    onSubmit: (template: AddNoteTemplate) => void,
    error?: string
}

const New: FC<Props> = ({
    onSubmit,
    error
}) => {
    const { setContentGetter, setHtmlConverter, htmlConvertUtil, templateNodeOptions, content } = useNoteTemplate()
    const { t } = useTranslation('common')
    return (
        <NoteTemplateLayout
            header={<NewHeader onSave={async (name) => {
                onSubmit({
                    name,
                    template: content?.get() || '',
                    html: await htmlConvertUtil?.convert() || ''
                })
            }} error={error} />}
            note={<Rte
                placeholder={`${t('template-place-holder')}`}
                templateNodeOptions={templateNodeOptions}
                setContentGetter={setContentGetter}
                setHtmlConverter={setHtmlConverter}
                toolbarOptions={{
                    template: 'create'
                }}
            />}
        />
    );
};

export default New;