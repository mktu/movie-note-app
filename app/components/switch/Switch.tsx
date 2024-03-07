import { Switch as SW } from '@headlessui/react'
import clsx from 'clsx';
import type { FC } from 'react'

const colors = {
    default: {
        on: 'bg-primary-main',
        off: 'bg-gray-200'
    },
    info: {
        on: 'bg-info-main',
        off: 'bg-gray-200'
    }
} as const

type ColorType = keyof typeof colors

type Props = {
    enabled: boolean,
    setEnabled: (checked: boolean) => void,
    label?: string,
    labelClass?: string,
    colorType?: ColorType
    disabled?: boolean
}

const Switch: FC<Props> = ({
    enabled,
    setEnabled,
    label,
    labelClass,
    disabled,
    colorType = 'default'
}) => {
    return (
        <SW.Group>
            <div className="flex items-center">
                <SW.Label className={clsx('mr-2', labelClass)} passive>{label}</SW.Label>
                <SW
                    disabled={disabled}
                    checked={enabled}
                    onChange={setEnabled}
                    className={clsx('relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-focus',
                        enabled ? colors[colorType].on
                            : colors[colorType].off)}
                >

                    <span
                        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 rounded-full bg-white transition`}
                    />
                </SW>
            </div>
        </SW.Group>

    );
};

export default Switch;