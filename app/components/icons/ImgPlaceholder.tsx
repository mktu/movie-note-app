type Props = React.SVGAttributes<SVGSVGElement>
function Icon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      viewBox="0 0 84 84"
      {...props}
    >
      <path fill="url(#pattern0)" d="M0 0H84V84H0z"></path>
      <path fill="#000" fillOpacity="0.8" d="M0 0H84V84H0z"></path>
      <defs>
        <pattern
          id="pattern0"
          width="0.381"
          height="0.381"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.00595)" xlinkHref="#image0"></use>
        </pattern>
        <image
          id="image0"
          width="64"
          height="64"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA40lEQVR4Xu3bQQ6EQAhEUbj/oXsO8Sdh4XOvJAi/qkF3Zt6E6710++xuiD6T40uACtACqYlzD2IACFKBkoHcgmSQDJJBMngKIT6ADygF6DSYfcCLTzg/z0eGrASogDbT0gKxB2MB5pkiBoBgrEEMwIBjLx9fAAiCIAhygmkkRgYjhWMHditsL2AvYC+QIHjdwzk+BmAABmBAWc1kCF0bKRAEQRAEQRAMGaACbaCUz/P5BRiKxhQaiV07uRjfYgQDMKDpGAhGCMUCzD4CBEEw1iAGYIBPZMJh+g8/P8cKpAJfV4EfMee/sLtaEFIAAAAASUVORK5CYII="
        ></image>
      </defs>
    </svg>
  );
}

export default Icon;
