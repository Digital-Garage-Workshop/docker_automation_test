"use client";

import { Box, Stack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { CartPage } from "@/components/payment/CartPage";
import { CustomStepper } from "@/components/payment/CustomStepper";
import Breadcrumbs from "@/components/global/BreadCrumb";
import { analytics, logEvent } from "@/config/firebaseConfig";
import { useMetadata } from "@/providers/MetadataProvider";

export default function StepOnePage() {
  const router = useRouter();
  const { setMetadata } = useMetadata();

  useEffect(() => {
    setMetadata({
      title: "Сагс",
      description: "",
      image: "/Home/Group.svg",
      keywords: "",
    });
  }, []);

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view", {
        page_name: "Payment Page",
      });
    }
  }, []);

  return (
    <Box
      w="100%"
      bg="#F1F2F3"
      minH="100vh"
      pb={20}
      mt={{ base: 6, md: "-108px" }}
    >
      <VStack w="100%" bg="white" py={{ base: 4, md: 6 }}>
        <CustomStepper />
      </VStack>

      <Box w={{ base: "100%", md: "85%" }} mx="auto" px={6} mt={4}>
        <Box mb={6}>
          <Breadcrumbs />
        </Box>

        <Box w="100%">
          <CartPage />
        </Box>
      </Box>
    </Box>
  );
}
