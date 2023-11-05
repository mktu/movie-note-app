import { type FC } from 'react';

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
import Templates from './Toolbar/Templates';
import TemplateNode from './Toolbar/TemplateNode';

type Props = {
    setContentGetter: (fun: () => string) => void,
    setHtmlConverter?: (fun: () => Promise<string>) => void,
    templateGetter?: Parameters<typeof Templates>[0]['templateGetter']
    monitorCurrentState?: (data: string) => void,
    onChange?: (content: string) => void
    init?: string | null,
    placeholder?: string,
    toolbarOptions?: {
        template: 'create' | 'use'
    }
}

const Editor: FC<Props> = ({
    setContentGetter,
    setHtmlConverter,
    templateGetter,
    monitorCurrentState,
    onChange,
    init,
    placeholder,
    toolbarOptions
}) => {
    const { editorStateRef } = useEditorState(setContentGetter, monitorCurrentState)
    return (
        <div >
            <LexicalComposer initialConfig={{
                editorState: init,
                ...initialConfig
            }}>
                <Toolbar
                    templateComponent={
                        toolbarOptions?.template === 'create' ? <TemplateNode /> : <Templates
                            templateGetter={templateGetter}
                        />
                    }
                />
                <div className='relative'>
                    <RichTextPlugin
                        ErrorBoundary={LexicalErrorBoundary}
                        contentEditable={<div>
                            <ContentEditable
                                className='text-text-main outline-none' />
                        </div>}
                        placeholder={<div className='pointer-events-none absolute top-0 left-0 select-none text-text-label'>{placeholder}</div>}
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
                <OnChangePlugin
                    ignoreSelectionChange
                    onChange={(editorState) => {
                        editorStateRef.current = editorState
                        if (!editorState.isEmpty() && onChange) {
                            onChange(JSON.stringify(editorStateRef.current))
                        }

                    }} />
                <HTMLConvertPlugin
                    getConverter={setHtmlConverter} />
            </LexicalComposer>
        </div>
    );
};

export default Editor;