import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { EditorState } from 'lexical';
import { useEffect, type FC } from 'react'

type Props = {
  onInit: (editorState: EditorState) => void
}

const InitEditorState: FC<Props> = ({
  onInit
}) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    onInit(editor.getEditorState())
  }, [editor, onInit])
  return null;
};

export default InitEditorState;