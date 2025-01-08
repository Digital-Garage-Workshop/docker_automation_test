"use client";

import { Box, VStack } from "@chakra-ui/react";
import { SelectAddress } from "@/components/payment";
import { CustomStepper } from "@/components/payment/CustomStepper";

export default function Page() {
  return (
    <VStack
      w="100vw"
      bg="#F1F2F3"
      gap={8}
      align="center"
      minH={"100vh"}
      mt={{ base: 4, md: "-108px" }}
    >
      <VStack w="100%" bg="white" py={{ base: 2, md: 6 }}>
        <Box h={4} />
        <CustomStepper />
      </VStack>
      <SelectAddress />
    </VStack>
  );
}
