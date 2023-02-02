import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DRAG_DROP_PASTE } from '@lexical/rich-text';
import { mediaFileReader } from '@lexical/utils';
import { COMMAND_PRIORITY_LOW } from 'lexical';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { uploadFile } from '~/features/rte/utils/fileUploader';
import { INSERT_IMAGE_COMMAND } from '..';

const ACCEPTABLE_IMAGE_TYPES = [
    'image/',
    'image/heic',
    'image/heif',
    'image/gif',
    'image/webp',
];

export const useDragDropPaste = () => {
    const [editor] = useLexicalComposerContext();
    const { t } = useTranslation('common')
    useEffect(() => {
        return editor.registerCommand(
            DRAG_DROP_PASTE,
            (files) => {
                (async () => {
                    const filesResult = await mediaFileReader(
                        files,
                        [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x),
                    );
                    for (const { file } of filesResult) {
                        const res = await uploadFile(file)
                        if (!res) {
                            toast.error(t('image-upload-error') as string)
                            continue
                        }
                        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                            altText: res.altText,
                            src: res.src,
                        });
                    }
                })();
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor, t]);
}