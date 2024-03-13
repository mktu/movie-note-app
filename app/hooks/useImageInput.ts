import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next';

const useImageInput = () => {
    const [file, setFile] = useState<Blob>()
    const [imgError, setImgError] = useState('')
    const { t } = useTranslation('common')
    const fileUrl = (file && URL.createObjectURL(file))
    const handleChangeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        if (e.target.files[0].size > 1024 * 1024 * 5) {
            setImgError(t('image-size-over-5mb'))
            return
        }
        setFile(e.target.files[0])
    }, [t])
    return {
        file,
        fileUrl,
        handleChangeFile,
        imgError
    }
}

export default useImageInput