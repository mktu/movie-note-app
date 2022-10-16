import { useState, useCallback } from 'react'
import { toast } from 'react-toastify';

const useImageInput = () => {
    const [file, setFile] = useState<Blob>()
    const fileUrl = (file && URL.createObjectURL(file))
    const handleChangeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        if (e.target.files[0].size > 1024 * 1024 * 5) {
            toast.error('ERROR ファイルサイズが5MBを超えています')
            return
        }
        setFile(e.target.files[0])
    }, [])
    return {
        file,
        fileUrl,
        handleChangeFile,
    }
}

export default useImageInput