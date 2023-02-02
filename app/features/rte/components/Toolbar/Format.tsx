import type { TextFormatType } from 'lexical';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useCallback, useState } from 'react';
import { IconButton } from '~/components/buttons';

import { useNodeUpdateListener } from '../../hooks/useUpdateListener';
import { useRangeUpdater } from '../../hooks/useUpdater';

import type { FC, ReactNode } from 'react';
import type { NodeListenerType } from '../../hooks/useUpdateListener';

type Props = {
    type: TextFormatType,
    renderIcon: (className: string) => ReactNode
}

const Italic: FC<Props> = ({
    type,
    renderIcon
}) => {
    const [isSelected, setSelected] = useState(false)
    const listener: NodeListenerType = useCallback((_, selection) => {
        setSelected(selection.hasFormat(type))
    }, [type])
    useNodeUpdateListener(listener)
    const { updateRange } = useRangeUpdater()
    return (
        <IconButton name={type} className='p-1 hover:bg-surface-hover' onClick={() => {
            updateRange((_, editor) => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
            })
        }}>
            {renderIcon(`h-4 w-4 ${isSelected ? 'fill-text-main' : 'fill-text-label'}`)}
        </IconButton>
    );
};

export default Italic;