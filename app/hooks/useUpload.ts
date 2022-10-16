import { useState, useCallback } from 'react'
import Compressor from 'compressorjs';
import useImageInput from './useImageInput';

type Uploader = (path: string, file: File | Blob, onProgress?: (progress: number) => void) => Promise<string>

const useUpload = (uploader: Uploader, quality = 0.3) => {
    const { file, fileUrl, handleChangeFile } = useImageInput()
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState<Error>()

    const upload = useCallback((path: string) =>
        new Promise<string>((resolve, reject) => {
            file && new Compressor(file, {
                quality,
                success: (result) => {
                    setProgress(0)
                    uploader(
                        path,
                        result,
                        (progress) => {
                            setProgress(Math.round(progress))
                        }).then(resolve).catch(e => {
                            setError(e)
                            reject(e)
                        })
                }
            })
        }), [file, quality, uploader])

    return {
        file,
        fileUrl,
        progress,
        handleChangeFile,
        error,
        upload
    }
}

export default useUpload