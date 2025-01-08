interface CloseIconProps {
  width?: number;
  height?: number;
}

export const CloseIcon: React.FC<CloseIconProps> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : 24}
      height={height ? width : 24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="#354052"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
