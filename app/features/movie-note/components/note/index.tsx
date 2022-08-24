import type { FC } from 'react'
import { useRef, useEffect } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useTranslation } from 'react-i18next';
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import initialConfig from './initialConfig'
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
                <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
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