import { forwardRef } from 'react'
import type { ComponentProps } from 'react'
import { ContainedButton } from '~/components/buttons';
import Search from '../search-title';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

type Props = {
    onClickSave: () => void,
    className?: string,
    canSave?: boolean
} & ComponentProps<typeof Search>

const New = forwardRef<HTMLDivElement, Props>(({
    onClickSave,
    className,
    selected,
    setSelected,
    canSave
}, ref) => {
    const { t } = useTranslation('common')
    return (
        <div ref={ref} className={clsx(className, 'flex items-center gap-2 py-2')}>
            <div className='flex w-full flex-1 items-center'>
                <Search {...{ selected, setSelected }} />
            </div>
            <ContainedButton disabled={!canSave} className='ml-auto' onClick={onClickSave}>{t('save')}</ContainedButton>
        </div>
    );
});

New['displayName'] = 'new-header'

export default New;