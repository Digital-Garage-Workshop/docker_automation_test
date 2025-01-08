import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

export const CustomLoader = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(0, 0, 0, 0.7)"
      zIndex="overlay"
    >
      <Spinner size="xl" thickness="4px" color="#F75B00" />
    </Box>
  );
};
