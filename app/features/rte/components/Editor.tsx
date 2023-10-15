import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import { DragDropPastePlugin, ImagesPlugin } from '../features/images';
import LinkPlugins from '../features/link';
import useEditorState from '../hooks/useEditorState';
import { validateUrl } from '../utils/validateUrl';
import initialConfig from './initialConfig';
import { transformers } from './nodes';
import Toolbar from './Toolbar';
import HTMLConvertPlugin from './HTMLConvertPlugin';

type Props = {
    setContentGetter: (fun: () => string) => void,
    setHtmlConverter: (fun: () => Promise<string>) => void,
    monitorCurrentState?: (data: string) => void,
    onChange?: (content: string) => void
    init?: string | null
}

const Editor: FC<Props> = ({
    setContentGetter,
    setHtmlConverter,
    monitorCurrentState,
    onChange,
    init
}) => {
    const { t } = useTranslation('common')
    const { editorStateRef } = useEditorState(setContentGetter, monitorCurrentState)
    return (
        <div >
            <LexicalComposer initialConfig={{
                editorState: init,
                ...initialConfig
            }}>
                <Toolbar />
                <div className='relative'>
                    <RichTextPlugin
                        ErrorBoundary={LexicalErrorBoundary}
                        contentEditable={<div>
                            <ContentEditable
                                className='text-text-main outline-none' />
                        </div>}
                        placeholder={<div className='pointer-events-none absolute top-0 left-0 select-none text-text-label'>{t('note-place-holder')}...✍️</div>}
                    />
                </div>
                <LinkPlugins />
                <HistoryPlugin />
                <MarkdownShortcutPlugin transformers={transformers} />
                <LexicalLinkPlugin validateUrl={validateUrl} />
                <ListPlugin />
                <DragDropPastePlugin />
                <ImagesPlugin />
                <CheckListPlugin />
                <OnChangePlugin onChange={(editorState) => {
                    editorStateRef.current = editorState
                    onChange && onChange(JSON.stringify(editorStateRef.current))
                }} />
                <HTMLConvertPlugin
                    getConverter={setHtmlConverter} />
            </LexicalComposer>
        </div>
    );
};

export default Editor;