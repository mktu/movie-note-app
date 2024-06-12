import { TmdbmageBasePath } from '@utils/constants';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { IconButton, TextButton } from '~/components/buttons';
import XIcon from '~/components/icons/X';
import { ImagePlaceholder } from '~/components/placeholders';

type Props = {
    image: string | null,
    defaultImage?: string,
    imgError?: string,
    onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClickDefaultImage: () => void
}
const ImgWidth = 150;
const ImgHeight = 225;
const imageBasePath = `${TmdbmageBasePath}/w440_and_h660_face`

const CoverImage: FC<Props> = ({ image, defaultImage, imgError, onChangeImage, onClickDefaultImage }) => {
    const { t } = useTranslation('common')
    const tmdbImagePath = `${imageBasePath}${defaultImage}`
    const targetImage = image || tmdbImagePath

    const changeImageButton = (
        <label className='cursor-pointer rounded border border-primary-main px-4 py-2 text-primary-main hover:border-text-dark' htmlFor='file-upload'>
            {t('change-image')}
            <input name='profile-image' id="file-upload" type='file' className='hidden' onChange={onChangeImage} />
        </label>
    )
    return (
        <div className='flex flex-col gap-2'>
            <span className='text-text-label'>{t('cover-image')}</span>
            <div className='items-start gap-4 p-2 md:flex'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='relative flex justify-center overflow-hidden rounded' style={{
                        width: ImgWidth,
                        height: ImgHeight
                    }}>
                        {targetImage ? (
                            <img src={targetImage} width={ImgWidth} height={ImgHeight} alt={t('cover-image')} style={{ objectFit: 'cover' }} />
                        ) : (
                            <ImagePlaceholder width={ImgWidth} height={ImgHeight} alt={t('cover-image')} className='text-text-label' />
                        )}
                        <IconButton className='absolute right-1 top-1 rounded bg-white' onClick={onClickDefaultImage} name='clear'>
                            <XIcon className='size-5 fill-text-label' />
                        </IconButton>
                    </div>
                </div>
                <div className='flex flex-col gap-2 p-2 text-sm text-text-label'>
                    <p>{t('cover-image-description')}</p>
                    <div className='flex justify-center md:justify-start'>
                        {changeImageButton}
                        <TextButton className='hidden w-fit md:inline' theme='text' onClick={onClickDefaultImage}>{t('back-to-default-image')}</TextButton>
                    </div>
                    <p className='text-destructive-main'>{imgError}</p>
                </div>
            </div>
        </div>
    );
};

export default CoverImage;