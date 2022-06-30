type Props = React.SVGAttributes<SVGSVGElement>
function Icon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
      <path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.5 21.49 48 48 48h245.5c16.97 0 33.25-6.744 45.26-18.75l90.51-90.51A63.855 63.855 0 00448 325.5V80c0-26.51-21.5-48-48-48zM64 96h320l-.001 224H320c-17.67 0-32 14.33-32 32v64H64V96z"></path>
    </svg>
  );
}

export default Icon;
