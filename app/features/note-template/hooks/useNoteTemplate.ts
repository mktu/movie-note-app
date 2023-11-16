import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigatorContext } from "~/providers/navigator/Context"

const usePredefinedNodes = () => {
    const { t } = useTranslation('common')
    const templateNodeOptions = {
        youtubeNodes: [{
            name: t('trailer-template-node-name'),
            placeholder: '$trailerPlaceholder',
            placeholderText: t('trailer-placeholder'),
        }],
        linkNodes: [{
            name: t('imdb-template-node-name'),
            placeholder: '$imdbPlaceholder',
            placeholderText: t('imdb-placeholder'),
        }]
    }
    return templateNodeOptions
}

export const useNoteTemplate = () => {
    const [content, setContent] = useState<{ get: () => string }>()
    const [htmlConvertUtil, setHtmlConvertUtil] = useState<{ convert: () => Promise<string> }>()
    const { useNavigator } = useNavigatorContext()
    const setHtmlConverter = useCallback((convert: () => Promise<string>) => {
        setHtmlConvertUtil({ convert })
    }, [])
    const { navigate } = useNavigator()
    const templateNodeOptions = usePredefinedNodes()

    const setContentGetter = useCallback((getContent: () => string) => {
        setContent({ get: getContent })
    }, [])

    return {
        setContentGetter,
        setHtmlConverter,
        content,
        htmlConvertUtil,
        navigate,
        templateNodeOptions
    }
}