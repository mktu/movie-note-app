type Props = React.SVGAttributes<SVGSVGElement>
function Icon(props: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" {...props}>
            <path d="M0 64c0-17.7 14.3-32 32-32h192c70.7 0 128 57.3 128 128 0 31.3-11.3 60.1-30 82.3 37.1 22.4 62 63.1 62 109.7 0 70.7-57.3 128-128 128H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V96H32C14.3 96 0 81.7 0 64zm224 160c35.3 0 64-28.7 64-64s-28.7-64-64-64H112v128h112zm-112 64v128h144c35.3 0 64-28.7 64-64s-28.7-64-64-64H112z"></path>
        </svg>
    );
}

export default Icon;