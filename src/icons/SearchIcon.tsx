export const SearchIcon = (props: { color?: string; w?: string }) => {
  const { color, w } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w || "24"}
      height={w || "24"}
      viewBox={w ? "0 0 21 20" : "0 0 21 20"}
      fill="none"
    >
      <path
        d="M18 17.5L13 12.5M14.6667 8.33333C14.6667 11.555 12.055 14.1667 8.83333 14.1667C5.61167 14.1667 3 11.555 3 8.33333C3 5.11167 5.61167 2.5 8.83333 2.5C12.055 2.5 14.6667 5.11167 14.6667 8.33333Z"
        stroke={color || "#667085"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
