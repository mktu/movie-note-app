import type { FC } from 'react'

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import type { ElementFormatType, NodeKey } from 'lexical';
import { useTranslation } from 'react-i18next';
import { ImdbIcon } from '~/features/imdb';
import { useLinkPreviewUpdater } from '../../../hooks/useLinkPreview';
import { IconButton } from '~/components/buttons';
import X from '~/components/icons/X';

type Props = {
    format: ElementFormatType | null;
    nodeKey: NodeKey;
}

const Placeholder: FC<Props> = ({
    format,
    nodeKey,
}) => {
    const { t } = useTranslation('common')
    const { removePlaceholder } = useLinkPreviewUpdater()
    return (
        <BlockWithAlignableContents
            format={format}
            nodeKey={nodeKey}
            className={{
                base: 'relative',
                focus: 'relative outline outline-indigo-300'
            }}>
            <div className='relative flex h-[128px] w-full max-w-[95%] items-center justify-center border border-border-main text-text-label'>
                <ImdbIcon className='mr-2 h-10 w-10' />
                <span>{t('imdb-placeholder')}</span>
                <IconButton name='remove' className='absolute right-2 top-1' onClick={removePlaceholder}>
                    <X className='h-5 w-5 fill-text-label' />
                </IconButton>
            </div>
        </BlockWithAlignableContents >
    );
};

export default Placeholder;