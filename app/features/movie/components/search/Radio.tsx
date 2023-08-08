import type { FC } from 'react'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export type RadioType = 'movie' | 'actor'

type Props = {
    radioType: RadioType,
    onSelect: (radioType: RadioType) => void
}

const Radio: FC<Props> = ({
    onSelect,
    radioType
}) => {
    const { t } = useTranslation('common')
    return (
        <RadioGroup value={radioType} onChange={onSelect} className='flex items-center gap-2 p-1'>
            <RadioGroup.Option value="movie">
                {({ checked }) => (
                    <span className={clsx('cursor-pointer rounded p-1', checked ? 'border border-border-main bg-surface-selected' : '')}>{t('search-movie')}</span>
                )}
            </RadioGroup.Option>
            <div>|</div>
            <RadioGroup.Option value="actor">
                {({ checked }) => (
                    <span className={clsx('cursor-pointer rounded p-1', checked ? 'border border-border-main bg-surface-selected' : '')}>{t('search-actor')}</span>
                )}
            </RadioGroup.Option>
        </RadioGroup>
    );
};

export default Radio;