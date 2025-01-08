"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/hooks/hooks";
import { CustomStepper } from "@/components/payment/CustomStepper";
import { PaymentProcess } from "@/components/payment";
import { PaymentProcessArch } from "@/components/payment/paymentpayArch";

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
      mt={{ base: 4, md: "-108px" }}
      pb={20}
    >
      <VStack w="100%" bg="white" py={{ base: 2, md: 6 }}>
        <Box h={4} />
        <CustomStepper />
      </VStack>
      <Box w="full" p={4}>
        <PaymentProcess step={5} />
      </Box>
      {/* <PaymentProcessArch step={5} /> */}
    </VStack>
  );
}
