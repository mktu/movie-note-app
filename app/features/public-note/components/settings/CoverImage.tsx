import { TmdbmageBasePath } from '@utils/constants';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { OutlinedButton } from '~/components/buttons';
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
    return (
        <div className='flex flex-col gap-2'>
            <span className='text-text-label'>{t('cover-image')}</span>
            <div className='flex items-start gap-2 p-2'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='flex justify-center overflow-hidden rounded' style={{
                        width: ImgWidth,
                        height: ImgHeight
                    }}>
                        {targetImage ? (
                            <img src={targetImage} width={ImgWidth} height={ImgHeight} alt={t('cover-image')} style={{ objectFit: 'cover' }} />
                        ) : (
                            <ImagePlaceholder width={ImgWidth} height={ImgHeight} alt={t('cover-image')} className='text-text-label' />
                        )}
                    </div>
                    <label className='cursor-pointer rounded border border-primary-main px-4 py-2 text-primary-main hover:border-text-dark' htmlFor='file-upload'>
                        {t('change-image')}
                        <input name='profile-image' id="file-upload" type='file' className='hidden' onChange={onChangeImage} />
                    </label>
                </div>
                <div className='flex flex-col gap-2 p-2 text-text-label'>
                    <p>{t('cover-image-description')}</p>
                    <OutlinedButton className='w-fit' onClick={onClickDefaultImage}>{t('back-to-default-image')}</OutlinedButton>
                    <p className='text-destructive-main'>{imgError}</p>
                </div>
            </div>
        </div>
    );
};

export default CoverImage;