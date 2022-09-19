import type { FC } from 'react'
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import initialConfig from './initialConfig';
import { transformers } from './nodes';

import type { EditorState } from 'lexical';

type Props = {
    setContentGetter: (fun: () => string) => void
}

const Editor: FC<Props> = ({
    setContentGetter
}) => {
    const { t } = useTranslation('common')
    const editorStateRef = useRef<EditorState>();
    useEffect(() => {
        setContentGetter(() => {
            return editorStateRef.current ? JSON.stringify(editorStateRef.current) : ''
        })
    }, [setContentGetter])
    return (
        <div className='relative'>
            <LexicalComposer initialConfig={initialConfig}>
                <RichTextPlugin
                    contentEditable={<ContentEditable className='text-text-main outline-none' />}
                    placeholder={<div className='pointer-events-none absolute top-0 left-0 select-none text-text-label'>{t('add-note')}...✍️</div>}
                />
                <HistoryPlugin />
                <MarkdownShortcutPlugin transformers={transformers} />
                <ListPlugin />
                <CheckListPlugin />
                <OnChangePlugin onChange={(editorState) => {
                    editorStateRef.current = editorState
                }} />
            </LexicalComposer>
        </div>
    );
};

export default Editor;