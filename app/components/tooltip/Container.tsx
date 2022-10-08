import type { Props as P } from './Tooltip';
import Tooltip from './Tooltip'

type Props<T extends HTMLElement> = P<T> & {
    className?: string,
    on?: 'div' | 'span' | 'none'
}
function Container<T extends HTMLElement>({ children, className, content, on = 'div', ...other }: Props<T>) {
    return (
        <Tooltip {...other} content={content}>
            {on === 'div' ? (
                <div className={className}>
                    {children}
                </div>
            ) : on === 'span' ? (
                <span className={className}>
                    {children}
                </span>
            ) : children}
        </Tooltip>
    )
}

export default Container