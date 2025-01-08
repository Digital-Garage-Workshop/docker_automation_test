export const StarIcon = (props: {
  color: string;
  stroke: string;
  w: string;
  h: string;
}) => {
  const { color, stroke, w, h } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.99989 11.8331L3.88522 13.9965L4.67122 9.41447L1.33789 6.16981L5.93789 5.50314L7.99522 1.33447L10.0526 5.50314L14.6526 6.16981L11.3192 9.41447L12.1052 13.9965L7.99989 11.8331Z"
        fill={color}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
