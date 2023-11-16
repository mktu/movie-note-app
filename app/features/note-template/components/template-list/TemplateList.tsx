import type { FC } from 'react'
import type { ListTemplateType } from '~/features/note-template/server/db/template';
import TemplateListItem from './TemplateListItem';

type Props = {
    templateList: ListTemplateType,
    onRemoveNote: (templateId: number) => void
}

const TemplateList: FC<Props> = ({
    templateList,
    onRemoveNote
}) => {
    return (
        <div>
            <div className='flex items-center p-2'>
                <div className='text-text-main'>Templates</div>
            </div>
            <div className='flex flex-col gap-1 p-2'>{templateList.map(v => (
                <TemplateListItem key={v.name} templateListItem={v} onRemoveNote={onRemoveNote} />
            ))}</div>
        </div>
    );
};

export default TemplateList;