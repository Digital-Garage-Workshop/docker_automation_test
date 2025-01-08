"use client";
import { VStack } from "@chakra-ui/react";

import { CustomStepper } from "@/components/payment/CustomStepper";
import { PaymentCheckout } from "@/components/payment";

export default function Page() {
  return (
    <VStack
      w="100vw"
      bg="#F1F2F3"
      gap={8}
      align="center"
      minH={"100vh"}
      mt={{ base: 8, md: "-108px" }}
    >
      <VStack w="100%" bg="white" py={{ base: 2, md: 6 }}>
        <CustomStepper />
      </VStack>
      <PaymentCheckout />
    </VStack>
  );
}
