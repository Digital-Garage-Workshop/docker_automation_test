export const MapIcon = (props: { color?: string }) => {
  const { color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M12 19L9 17.5M9 17.5L3 20.5V7.5L9 4.5M9 17.5V4.5M9 4.5L15 7.5M15 7.5L21 4.5V12M15 7.5V13M19 18.5V18.51M21.121 20.621C21.5407 20.2015 21.8265 19.6669 21.9423 19.085C22.0581 18.503 21.9988 17.8997 21.7717 17.3515C21.5447 16.8033 21.1602 16.3347 20.6668 16.005C20.1734 15.6753 19.5934 15.4994 19 15.4994C18.4066 15.4994 17.8266 15.6753 17.3332 16.005C16.8398 16.3347 16.4553 16.8033 16.2283 17.3515C16.0012 17.8997 15.9419 18.503 16.0577 19.085C16.1735 19.6669 16.4594 20.2015 16.879 20.621C17.297 21.04 18.004 21.666 19 22.5C20.051 21.61 20.759 20.984 21.121 20.621Z"
        stroke={color || "#1D2939"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
