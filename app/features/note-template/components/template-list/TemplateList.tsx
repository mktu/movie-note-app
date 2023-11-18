import type { FC } from 'react'
import type { ListTemplateType } from '~/features/note-template/server/db/template';
import TemplateListItem from './TemplateListItem';
import AddFill from '~/components/icons/AddFill';
import { useNavigatorContext } from '~/providers/navigator/Context';

type Props = {
    templateList: ListTemplateType,
    onRemoveNote: (templateId: number) => void
}

const TemplateList: FC<Props> = ({
    templateList,
    onRemoveNote
}) => {
    const { navigator: Navigator } = useNavigatorContext()
    return (
        <div>
            <div className='flex items-center p-2'>
                <div className='text-text-main'>Templates</div>
                <div className='ml-auto'>
                    <Navigator className='flex w-full items-center overflow-x-hidden text-text-main hover:bg-surface-hover' to={'/app/note-template/new'} >
                        <AddFill className='h-5 w-5 fill-text-label hover:fill-text-main' />
                    </Navigator>
                </div>
            </div>
            <div className='flex flex-col gap-1 p-2'>{templateList.map(v => (
                <TemplateListItem key={v.name} templateListItem={v} onRemoveNote={onRemoveNote} />
            ))}</div>
        </div>
    );
};

export default TemplateList;