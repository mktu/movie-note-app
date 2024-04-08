type Props = React.SVGAttributes<SVGSVGElement>
function Icon(props: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
            <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z"></path>
        </svg>
    );
}

export default Icon;