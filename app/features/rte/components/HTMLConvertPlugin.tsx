import { useEffect, type FC } from 'react'
import { useHtmlConverter } from '../hooks/useHtmlConverter';

type Props = {
    getConverter?: (converter: () => Promise<string>) => void
}

const HTMLConvertPlugin: FC<Props> = ({ getConverter }) => {
    const { convertToHtml } = useHtmlConverter()
    useEffect(() => {
        getConverter && getConverter(convertToHtml)
    }, [convertToHtml, getConverter])
    return null;
};

export default HTMLConvertPlugin;