import type { FC } from 'react'
import type {
    EmbedConfig
} from '@lexical/react/LexicalAutoEmbedPlugin';
import { AutoEmbedOption, LexicalAutoEmbedPlugin } from '@lexical/react/LexicalAutoEmbedPlugin';

import PreviewMenu from './PreviewMenu';
import { SimpleLinkPreviewConfig } from './simple-link-preview';

const LinkPreviewPlugin: FC = () => {
    // const openEmbedModal = (embedConfig: LinkPreveiwConfig) => {
    //     showModal(`Embed ${embedConfig.contentName}`, (onClose) => (
    //       <AutoEmbedDialog embedConfig={embedConfig} onClose={onClose} />
    //     ));
    //   };
    const getMenuOptions = (
        activeEmbedConfig: EmbedConfig,
        embedFn: () => void,
        dismissFn: () => void,
    ) => {
        return [
            new AutoEmbedOption('プレビューを表示する', {
                onSelect: embedFn,
            }),
            new AutoEmbedOption('何もしない', {
                onSelect: dismissFn,
            })
        ];
    };
    return (
        <div className=''>
            <LexicalAutoEmbedPlugin<EmbedConfig>
                embedConfigs={[SimpleLinkPreviewConfig]}
                onOpenEmbedModalForConfig={() => { }}
                getMenuOptions={getMenuOptions}
                menuRenderFn={PreviewMenu}
            />
        </div>
    );
};

export default LinkPreviewPlugin;