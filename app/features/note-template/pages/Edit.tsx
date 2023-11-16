import type { FC } from 'react'
import { NoteTemplateLayout } from '../layout';
import Rte from '~/features/rte';
import { EditHeader } from '../components/header';
import { useNoteTemplate } from '../hooks/useNoteTemplate';
import { useTranslation } from 'react-i18next';
import type { NoteTemplate } from '@type-defs/frontend';

type Props = {
    onSubmit: (template: NoteTemplate) => void,
    noteTemplate: NoteTemplate,
    error?: string
}

const Edit: FC<Props> = ({
    onSubmit,
    noteTemplate,
    error
}) => {
    const { setContentGetter, setHtmlConverter, htmlConvertUtil, templateNodeOptions, content } = useNoteTemplate()
    const { t } = useTranslation('common')
    return (
        <NoteTemplateLayout
            header={<EditHeader title={noteTemplate.name} onSave={async (name) => {
                onSubmit({
                    ...noteTemplate,
                    name,
                    template: content?.get() || noteTemplate.template || '',
                    html: await htmlConvertUtil?.convert() || ''
                })
            }} error={error} />}
            note={<Rte
                init={noteTemplate.template}
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

export default Edit;