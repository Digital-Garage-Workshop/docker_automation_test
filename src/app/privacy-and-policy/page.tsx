"use client";
import { CustomLoader } from "@/components/global/CustomLoader";
import { UseApi } from "@/hooks/useApi";
import { GetPolicy } from "@/services/company/getPrivacyAndPolice";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import Loading from "../loading";

export default function Page() {
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: GetPolicy,
  });

  useEffect(() => {
    fetch();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <VStack w="100vw" justify="center" align="center">
      <VStack w="82%" gap={20} mt={16} pb={20}>
        <Text
          fontSize={{ base: 28, sm: 28, md: 32, lg: 56, xl: 56 }}
          fontWeight={600}
        >
          Нууцлалын бодлого
        </Text>
        <Box
          w="full"
          alignItems="flex-start"
          dangerouslySetInnerHTML={{ __html: data?.answer }}
        />
      </VStack>
    </VStack>
  );
}
