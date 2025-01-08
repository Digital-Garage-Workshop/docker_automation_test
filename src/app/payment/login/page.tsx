"use client";

import { PaymentLogin } from "@/components/payment";
import { CustomStepper } from "@/components/payment/CustomStepper";
import { Box, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Page from "../../category/page";

export default function StepTwoPage() {
  const router = useRouter();

  const [isDeliverySelected, setIsDeliverySelected] = useState<boolean | null>(
    null
  );

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
      <Box p={4} w="full">
        <PaymentLogin />
      </Box>
    </VStack>
  );
}
