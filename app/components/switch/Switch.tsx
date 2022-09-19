import { Switch as SW } from '@headlessui/react'
import clsx from 'clsx';
import type { FC } from 'react'

type Props = {
    enabled: boolean,
    setEnabled: (checked: boolean) => void,
    label?: string,
    labelClass?: string
}

const Switch: FC<Props> = ({
    enabled,
    setEnabled,
    label,
    labelClass
}) => {
    return (
        <SW.Group>
            <div className="flex items-center">
                <SW.Label className={clsx('mr-2', labelClass)} passive>{label}</SW.Label>
                <SW
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? ' bg-primary-main' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-focus`}
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