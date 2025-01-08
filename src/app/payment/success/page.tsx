"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/hooks/hooks";
import { CustomStepper } from "@/components/payment/CustomStepper";
import { PaymentSuccess } from "@/components/payment/PaymentSuccess";

export default function Page() {
  const router = useRouter();

  const orderData = useAppSelector((state) => state.order.orderData);

  return (
    <VStack
      w="100vw"
      bg="#F1F2F3"
      gap={8}
      align="center"
      minH={"100vh"}
      mt={{ base: 4, md: -108 }}
    >
      <VStack w="100%" bg="white" py={{ base: 2, md: 6 }}>
        <Box h={4} />
        <CustomStepper />
      </VStack>
      <PaymentSuccess />
    </VStack>
  );
}
