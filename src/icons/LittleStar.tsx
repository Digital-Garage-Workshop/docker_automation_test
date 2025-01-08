export const LittleStar = (props: { color: string }) => {
  const { color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_1283_17771)">
        <path
          d="M8.00184 11.8331L3.88718 13.9965L4.67318 9.41447L1.33984 6.16981L5.93984 5.50314L7.99718 1.33447L10.0545 5.50314L14.6545 6.16981L11.3212 9.41447L12.1072 13.9965L8.00184 11.8331Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1283_17771">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
