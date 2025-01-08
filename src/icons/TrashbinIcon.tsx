export const TrashbinIcon = (props: {
  color: string;
  w: string;
  h: string;
}) => {
  const { color, w, h } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M3.33203 5.83333H16.6654M8.33203 9.16667V14.1667M11.6654 9.16667V14.1667M4.16536 5.83333L4.9987 15.8333C4.9987 16.2754 5.17429 16.6993 5.48685 17.0118C5.79941 17.3244 6.22334 17.5 6.66536 17.5H13.332C13.7741 17.5 14.198 17.3244 14.5105 17.0118C14.8231 16.6993 14.9987 16.2754 14.9987 15.8333L15.832 5.83333M7.4987 5.83333V3.33333C7.4987 3.11232 7.5865 2.90036 7.74278 2.74408C7.89906 2.5878 8.11102 2.5 8.33203 2.5H11.6654C11.8864 2.5 12.0983 2.5878 12.2546 2.74408C12.4109 2.90036 12.4987 3.11232 12.4987 3.33333V5.83333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
