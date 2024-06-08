type Props = React.SVGAttributes<SVGSVGElement>
function Icon(props: Props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
        >
            <g
                fill="none"
                fillRule="evenodd"
                transform="translate(2 2)"
            >
                <circle cx="18" cy="18" r="18" strokeOpacity="0.5"></circle>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                        attributeName="transform"
                        dur="1s"
                        from="0 18 18"
                        repeatCount="indefinite"
                        to="360 18 18"
                        type="rotate"
                    ></animateTransform>
                </path>
            </g>
        </svg>
    );
}

export default Icon;
