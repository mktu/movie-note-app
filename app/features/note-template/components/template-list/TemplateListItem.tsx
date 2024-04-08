import { useContext, type FC, useState } from 'react'
import type { ListTemplateItemType } from '~/features/note-template/server/db/template';
import NavigatorContext from '~/providers/navigator/Context';
import TemplateListMenu from './TemplateListMenu';
import RemoveTemplateDialog from './RemoveTemplateDialog';
import { useAppLayoutContext } from '~/providers/app-layout';

type Props = {
    templateListItem: ListTemplateItemType,
    onRemoveNote: (templateId: number) => void
}

const TemplateListItem: FC<Props> = ({
    templateListItem,
    onRemoveNote
}) => {
    const { navigator: Navigator } = useContext(NavigatorContext)
    const [deleting, setDeleting] = useState(false)
    const to = `/app/note-template/${templateListItem.id}`
    const { setOpenMobileMenu } = useAppLayoutContext()
    return (
        <>
            {deleting && (<RemoveTemplateDialog title={templateListItem.name || ''} onClose={() => {
                setDeleting(false)
            }} open={deleting} onRemove={() => {
                onRemoveNote(templateListItem.id)
                setDeleting(false)
            }} />)}
            <div className='flex w-full items-center'>
                <Navigator
                    onClick={() => {
                        setOpenMobileMenu(false)
                    }}
                    className='flex w-full items-center overflow-x-hidden text-text-main hover:bg-surface-hover' to={to} >
                    <div className='flex w-full flex-1 items-center overflow-hidden'>
                        <div className='ml-2 block w-full overflow-hidden'>
                            <div className='overflow-hidden text-ellipsis whitespace-nowrap'>{templateListItem.name}</div>
                        </div>
                    </div>
                </Navigator >
                <div className='ml-auto flex items-center'>
                    <TemplateListMenu onDelete={(e) => {
                        e.stopPropagation()
                        setDeleting(true)
                    }} />
                </div>
            </div>
        </>
    );
};

export default TemplateListItem;