export const RightArrow = (props: {
  color: string;
  w?: string;
  h?: string;
}) => {
  const { color, w, h } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w || "20"}
      height={h || "20"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M4.16663 10H15.8333M15.8333 10L10.8333 15M15.8333 10L10.8333 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
