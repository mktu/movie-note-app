import { useMemo, type FC, useState } from 'react'
import TemplatePopupMenu from './TemplatePopupMenu';
import type { Template } from '~/features/rte/components/Toolbar/Templates';
import { ContainedButton, TextButton } from '~/components/buttons';
import { useTranslation } from 'react-i18next';
import { useNavigatorContext } from '~/providers/navigator/Context';

type Props = {
    templates: Template[],
    onSelect: (template: Template) => void,
    onCancel: () => void
}

const TemplatePopup: FC<Props> = ({
    templates,
    onSelect,
    onCancel
}) => {
    const [selected, setSelected] = useState<Template>()
    const menus = useMemo(() => {
        const m = templates.reduce((acc, cur) => {
            acc[cur.id] = {
                label: cur.name
            }
            return acc
        }, {} as { [key: string]: { label: string } })
        return m
    }, [templates])
    const { t } = useTranslation('common')
    const { navigator: Navigator } = useNavigatorContext()
    return (
        <div className='relative flex min-h-[128px] w-[312px] flex-col gap-2 rounded border border-border-main p-4' >
            <TemplatePopupMenu
                placeholder={t('select-template')}
                selected={selected ? String(selected.id) : undefined}
                menuItems={menus}
                onSelect={(item) => {
                    const target = templates.find(v => String(v.id) === item)
                    target && setSelected(target)
                }}
            />
            <div className='mt-auto flex items-center justify-end text-sm'>
                <Navigator to='/app/note-template/new'>+ {t('create-template')}</Navigator>
            </div>
            <div className='flex items-center justify-end gap-1 p-1 font-semibold'>
                <TextButton className='ml-auto' onClick={onCancel} theme='label' paddings='py-1 px-2'>CANCEL</TextButton>
                <ContainedButton disabled={!selected} onClick={() => {
                    selected && onSelect(selected)
                }} paddings='py-1 px-2'>OK</ContainedButton>
            </div>
        </div>
    );
};

export default TemplatePopup;