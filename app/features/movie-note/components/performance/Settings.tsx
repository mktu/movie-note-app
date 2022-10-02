import type { FC } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import Switch from '~/components/switch/Switch';
import LocalStorageContext from '~/providers/localstorage/Context'

const Settings: FC = () => {
    const [kvDisabled_, setKvDisabled_] = useState(false)
    const { isKvDisabled, setKvDisabled } = useContext(LocalStorageContext)
    useEffect(() => {
        setKvDisabled_(isKvDisabled())
    }, [isKvDisabled])
    return (
        <div className=''>
            <Switch label='Disable KV' labelClass='text-onprimary-main' enabled={kvDisabled_} setEnabled={(checked) => {
                setKvDisabled_(checked)
                setKvDisabled(checked)
            }} />
        </div>
    );
};

export default Settings;