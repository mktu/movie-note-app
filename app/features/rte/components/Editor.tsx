import type { FC } from 'react';
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
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'

import initialConfig from './initialConfig';
import { transformers } from './nodes';

import Toolbar from './Toolbar';
import { validateUrl } from '../utils/validateUrl';
import useEditorState from '../hooks/useEditorState';
import { useEditorElement } from '../store/editor';
import LinkMenu from './floating-menus/LinkMenu';

type Props = {
    setContentGetter: (fun: () => string) => void,
    monitorCurrentState?: (data: string) => void
    init?: string | null
}

const Editor: FC<Props> = ({
    setContentGetter,
    monitorCurrentState,
    init
}) => {
    const { t } = useTranslation('common')
    const { editorStateRef } = useEditorState(setContentGetter, monitorCurrentState)
    const { setEditorElement } = useEditorElement()
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
                        contentEditable={<div ref={(e) => {
                            e && setEditorElement(e)
                        }}>
                            <ContentEditable
                                className='text-text-main outline-none' />
                        </div>}
                        placeholder={<div className='pointer-events-none absolute top-0 left-0 select-none text-text-label'>{t('add-note')}...✍️</div>}
                    />
                </div>
                <LinkMenu />
                <HistoryPlugin />
                <MarkdownShortcutPlugin transformers={transformers} />
                <LexicalLinkPlugin validateUrl={validateUrl} />
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