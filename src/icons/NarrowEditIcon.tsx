export const NarrowEditIcon = (props: { color: string }) => {
  const { color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4.66797 4.66674H4.0013C3.64768 4.66674 3.30854 4.80721 3.05849 5.05726C2.80844 5.30731 2.66797 5.64645 2.66797 6.00007V12.0001C2.66797 12.3537 2.80844 12.6928 3.05849 12.9429C3.30854 13.1929 3.64768 13.3334 4.0013 13.3334H10.0013C10.3549 13.3334 10.6941 13.1929 10.9441 12.9429C11.1942 12.6928 11.3346 12.3537 11.3346 12.0001V11.3334M10.668 3.3334L12.668 5.3334M13.5913 4.39007C13.8539 4.12751 14.0014 3.77139 14.0014 3.40007C14.0014 3.02875 13.8539 2.67264 13.5913 2.41007C13.3287 2.14751 12.9726 2 12.6013 2C12.23 2 11.8739 2.14751 11.6113 2.41007L6.0013 8.00007V10.0001H8.0013L13.5913 4.39007Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
