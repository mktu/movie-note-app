import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { INSERT_IMAGE_COMMAND } from '../../features/images';
import ImageIcon from '../icons/Image'

const Image: FC = () => {
    const { t } = useTranslation('common')
    const [editor] = useLexicalComposerContext()
    return (
        <label className='cursor-pointer p-1 hover:bg-surface-hover' htmlFor='file-upload' aria-label='image upload'>
            <ImageIcon className='size-5 fill-text-label' />
            <input id="file-upload" type='file' className='hidden' onChange={async (e) => {
                if (!e.target.files || e.target.files.length === 0 || !e.target.files[0]) {
                    return
                }
                const file = e.target.files[0]
                if (file.size > 1024 * 1024 * 5) {
                    toast.error(t('image-size-error') as string)
                    return
                }
                const reader = new FileReader();
                reader.onload = function () {
                    if (typeof reader.result === 'string') {
                        editor.update(() => {
                            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                                altText: file.name,
                                src: reader.result as string,
                                uploadImage: file
                            });
                        })
                    }
                    return '';
                };
                if (file !== null) {
                    reader.readAsDataURL(file);
                }
                // const res = await uploadFile(file)
                // if (!res) {
                //     toast.error(t('image-upload-error') as string)
                //     return
                // }

            }} />
        </label>
    );
};

export default Image;