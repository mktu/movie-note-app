import type { ChangeEventHandler, FC } from 'react'
import { useTranslation } from 'react-i18next';
import ProfileImage from '../image';

type Props = {
    width: number,
    height: number,
    src?: string,
    handleChangeFile: ChangeEventHandler<HTMLInputElement>
}

const Image: FC<Props> = ({
    width,
    height,
    src,
    handleChangeFile
}) => {
    const { t } = useTranslation('common')
    return (
        <div className='flex flex-col items-center gap-2'>
            <ProfileImage
                width={width}
                height={height}
                alt='Not found'
                src={src || ''} />
            <label className='cursor-pointer rounded border border-primary-main py-2 px-4 text-primary-main hover:border-text-dark' htmlFor='file-upload'>
                {t('change-image')}
                <input name='profile-image' id="file-upload" type='file' className='hidden' onChange={handleChangeFile} />
            </label>
        </div>
    );
};

export default Image;