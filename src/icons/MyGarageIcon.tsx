export const MyGarageIcon = (props: { color?: string }) => {
  const { color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 17C9 18.1046 8.10457 19 7 19C5.89543 19 5 18.1046 5 17M9 17C9 15.8954 8.10457 15 7 15C5.89543 15 5 15.8954 5 17M9 17H15M5 17H3V11M19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17M19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17M19 17H21V13C21 12.4696 20.7893 11.9609 20.4142 11.5858C20.0391 11.2107 19.5304 11 19 11H18M3 11L5 6H14L18 11M3 11H18M12 11V6"
        stroke={color ? color : "#1E1E1E"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
