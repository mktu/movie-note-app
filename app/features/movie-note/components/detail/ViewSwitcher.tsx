import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { IconButton } from '~/components/buttons';
import Expand from '~/components/icons/Expand';
import Minimize from '~/components/icons/Minimize';
import Tooltip from '~/components/tooltip'

type Props = {
    showSummary: boolean,
    onSwitch: (showSummary: boolean) => void,
    hover?: boolean
}

const ViewSwitcher: FC<Props> = ({
    showSummary,
    onSwitch,
    hover
}) => {
    const { t } = useTranslation('common')
    const content = showSummary ? t('show-detail') : t('show-summary')
    return (
        <Tooltip content={content}>
            <IconButton onClick={() => {
                onSwitch(!showSummary)
            }} name='minimize' className='p-1'>
                {
                    showSummary ?
                        <Expand className={`h-5 w-5  ${hover ? 'fill-border-dark' : 'fill-border-main'}`} />
                        : <Minimize className={`h-5 w-5  ${hover ? 'fill-border-dark' : 'fill-border-main'}`} />}
            </IconButton>
        </Tooltip>

    );
};

export default ViewSwitcher;