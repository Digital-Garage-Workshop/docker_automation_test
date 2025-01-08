import { Box, Divider, GridItem, HStack, VStack } from "@chakra-ui/react";

export const PartCardSkeleton = () => {
  return (
    <Box bg="white" p={4} w="100%" borderRadius="8">
      <VStack gap={4}>
        <HStack w="full" justify="space-between">
          <Box bg="#F9FAFB" h="16px" w="52px" borderRadius="lg" />
          <Box bg="#F9FAFB" h="28px" w="28px" borderRadius="lg" />
        </HStack>
        <Box bg="#F2F4F7" h="136px" w="100%" borderRadius="lg" />

        <VStack gap="10px" w="full" align="flex-start">
          <Box w="96px" h="16px" bg="#F9FAFB" borderRadius="lg" />
          <Box bg="#F2F4F7" h="48px" w="100%" borderRadius="lg" />
          <Box bg="#F9FAFB" h="26px" w="205px" borderRadius="lg" mt="-6px" />
        </VStack>
        <Box bg="#F9FAFB" h="16px" w="100%" borderRadius="lg" />
        <VStack w="full" gap="10px">
          {/* <HStack justify="space-between" w="100%">
                          <GridItem bg="#F9FAFB" w="69px" h="18px" borderRadius="lg" />
                          <GridItem bg="#F9FAFB" w="69px" h="18px" borderRadius="lg" />
                          <GridItem bg="white" w="32px" h="32px" borderRadius="full" />
                        </HStack> */}
          <HStack justify="space-between" w="100%">
            <GridItem bg="#F2F4F7" w="87px" h="34px" borderRadius="lg" />
            <GridItem bg="#F2F4F7" w="57px" h="34px" borderRadius="lg" />
            <GridItem bg="#F2F4F7" w="32px" h="32px" borderRadius="full" />
          </HStack>
          <Divider variant="dashed" />
          <HStack justify="space-between" w="100%">
            <GridItem bg="#F2F4F7" w="87px" h="34px" borderRadius="lg" />
            <GridItem bg="#F2F4F7" w="57px" h="34px" borderRadius="lg" />
            <GridItem bg="#F2F4F7" w="32px" h="32px" borderRadius="full" />
          </HStack>
        </VStack>
        <Box bg="#F2F4F7" h="40px" w="100%" borderRadius="lg" />
      </VStack>
    </Box>
  );
};
