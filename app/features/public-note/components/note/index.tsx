import type { FC } from 'react'
import Parser from 'html-react-parser';

type Props = {
    html: string
}

const Note: FC<Props> = ({ html }) => {
    return (
        <div className='p-4'>
            {Parser(html)}
        </div>
    )
};

export default Note;