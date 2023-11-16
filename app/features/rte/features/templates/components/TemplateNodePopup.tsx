import { type FC, useState } from 'react'
import { ContainedButton, TextButton } from '~/components/buttons';
import { useTranslation } from 'react-i18next';
import TemplateNodePopupMenu from './TemplateNodePopupMenu';

type TemplateNode = {
    name: string
}

type Props = {
    templateNodes: TemplateNode[],
    onSelect: (template: TemplateNode) => void,
    onCancel: () => void
}

const TemplateNodePopup: FC<Props> = ({
    templateNodes,
    onSelect,
    onCancel
}) => {
    const [selected, setSelected] = useState<TemplateNode>()
    const { t } = useTranslation('common')
    return (
        <div className='relative flex min-h-[128px] w-[312px] flex-col gap-2 rounded border border-border-main p-4' >
            <TemplateNodePopupMenu
                placeholder={t('select-template')}
                selected={selected?.name}
                menuItems={templateNodes.map(v => v.name)}
                onSelect={(index) => {
                    setSelected(templateNodes[index])
                }}
            />
            <div className='flex items-center justify-end gap-1 p-1 font-semibold'>
                <TextButton className='ml-auto' onClick={onCancel} theme='label' paddings='py-1 px-2'>CANCEL</TextButton>
                <ContainedButton disabled={!selected} onClick={() => {
                    selected && onSelect(selected)
                }} paddings='py-1 px-2'>OK</ContainedButton>
            </div>
        </div>
    );
};

export default TemplateNodePopup;