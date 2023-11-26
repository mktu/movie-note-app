import type { FC } from 'react'
import Parser from 'html-react-parser';
import { useNotePreviewContext } from '../../context/public-note/Context';

const Preview: FC = () => {
    const { html } = useNotePreviewContext()
    return Parser(html);
};

export default Preview;