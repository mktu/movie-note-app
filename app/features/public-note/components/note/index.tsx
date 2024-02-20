import type { FC } from 'react'
import Parser from 'html-react-parser';

type Props = {
    html: string
}

const Note: FC<Props> = ({ html }) => {
    return (
        <div className='flex w-full justify-center p-4'>
            <div>
                {Parser(html)}
            </div>
        </div>
    )
};

export default Note;