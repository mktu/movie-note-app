import { useEffect, type FC, useState, useMemo } from 'react'
import { $generateNodesFromDOM } from '@lexical/html';
import { useRangeUpdater } from '../../hooks/useUpdater';
import { $getRoot } from 'lexical';
import Dropdown from './dropdown/Dropdown';

export type Template = {
    name: string,
    id: number,
    template: string | null
}

type Props = {
    templateGetter?: () => Promise<Template[]>
}

const Templates: FC<Props> = ({
    templateGetter
}) => {
    const { updateRange } = useRangeUpdater()
    const [templates, setTemplates] = useState<Template[]>([])
    useEffect(() => {
        templateGetter && templateGetter().then(templates => {
            setTemplates(templates)
        })
    }, [templateGetter])
    const menus = useMemo(() => {
        const m = templates.reduce((acc, cur) => {
            acc[cur.id] = {
                label: cur.name
            }
            return acc
        }, {} as { [key: string]: { label: string } })
        return m
    }, [templates])
    return (
        <div className=''>
            <Dropdown
                menuItems={menus}
                defaultSelected=''
                label='Template'
                onSelect={(item) => {
                    const target = templates.find(v => String(v.id) === item)
                    if (!target || !target.template) {
                        return
                    }
                    updateRange((selection, editor) => {
                        const parser = new DOMParser();
                        const dom = parser.parseFromString(target.template!, 'text/html');
                        const nodes = $generateNodesFromDOM(editor, dom);
                        // Select the root
                        $getRoot().select();

                        // Insert them at a selection.
                        selection.insertNodes(nodes);
                    })
                }}
            />
        </div>
    );
};

export default Templates;