export const InfoIcon = (props: { color?: string; w?: string; h?: string }) => {
  const { color, w, h } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w ? w : "20"}
      height={h ? h : "20"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10 6.66667H10.0083M9.16667 10H10V13.3333H10.8333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
        stroke={color ? color : "#F75B00"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
