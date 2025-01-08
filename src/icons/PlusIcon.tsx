import path from "path";

export const PlusIcon = (props: { color?: string; w?: string }) => {
  const { color, w } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w || "16"}
      height={w || "16"}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8.00065 3.3335V12.6668M3.33398 8.00016H12.6673"
        stroke={color ? color : "#1E1E1E"}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
