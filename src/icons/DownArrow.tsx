export const DownArrow = (props: { color: string; w: string; h: string }) => {
  const { color, w, h } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
