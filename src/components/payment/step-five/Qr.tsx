import { Stack, Box } from "@chakra-ui/react";
import Image from "next/image";
import QRCode from "react-qr-code";
type QrProps = {
  image: string;
  size?: string;
};
export const Qr = (props: QrProps) => {
  const { image, size } = props;
  return (
    <Stack>
      <Box
        position="relative"
        p={4}
        borderWidth="2px"
        borderColor="transparent"
      >
        <QRCode
          size={size ? parseInt(size) : 256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={image}
          viewBox={size ? "0 0 193 193" : `0 0 256 256`}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          borderLeft=".5px solid #A0A0A0"
          borderTop=".5px solid #A0A0A0"
          width="20px"
          height="20px"
        />

        <Box
          position="absolute"
          top={0}
          right={0}
          borderRight=".5px solid #A0A0A0"
          borderTop=".5px solid #A0A0A0"
          width="20px"
          height="20px"
        />

        <Box
          position="absolute"
          bottom={0}
          left={0}
          borderLeft=".5px solid #A0A0A0"
          borderBottom=".5px solid #A0A0A0"
          width="20px"
          height="20px"
        />

        <Box
          position="absolute"
          bottom={0}
          right={0}
          borderRight=".5px solid #A0A0A0"
          borderBottom=".5px solid #A0A0A0"
          width="20px"
          height="20px"
        />
      </Box>
    </Stack>
  );
};
