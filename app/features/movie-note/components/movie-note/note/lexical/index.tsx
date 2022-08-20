import type { FC } from 'react'

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useTranslation } from 'react-i18next';
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import initialConfig from './initialConfig'


const Editor: FC = () => {
    const { t } = useTranslation('common')
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
                contentEditable={<ContentEditable className='text-text-main outline-none' />}
                placeholder={<div className='pointer-events-none absolute top-0 left-0 select-none text-text-label'>{t('add-note')}...✍️</div>}
            />
            <HistoryPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <ListPlugin />
            <CheckListPlugin />
        </LexicalComposer>
    );
};

export default Editor;