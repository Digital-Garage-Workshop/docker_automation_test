"use client";
import { Faq } from "@/components";
import { UseApi } from "@/hooks/useApi";
import { ChatIcon, DownArrow } from "@/icons";
import { useMetadata } from "@/providers/MetadataProvider";
import { GetFaq } from "@/services";
import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";

export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [{ data, isLoading, error }, fetch] = UseApi({ service: GetFaq });

  useEffect(() => {
    fetch();
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <VStack w="100vw" minH="100vh" bg="white" pt={20} gap={20} align={"center"}>
      <VStack w="82%" gap={20} pb={20}>
        <VStack gap={4} align={"center"}>
          <Text
            fontSize={{ base: 28, sm: 28, md: 32, lg: 56, xl: 56 }}
            fontWeight={600}
          >
            Түгээмэл Асуулт Хариулт
          </Text>
          <Text fontSize={18} fontWeight={600}>
            Сүүлд шинэчлэгдсэн 2024/04/09
          </Text>
        </VStack>
        <VStack w="100%" gap={"32px"}>
          <VStack w="full">
            {data?.map((item: any, index: number) => (
              <Box
                key={index}
                borderRadius="8px"
                w="100%"
                p={4}
                onClick={() => handleToggle(index)}
                cursor="pointer"
                transition="backgroundColor 0.3s"
                bg="#F9FAFB"
              >
                <HStack gap={6} w="full">
                  <Stack>
                    <DownArrow color="black" w="32" h="32" />
                  </Stack>
                  <Text fontWeight="bold" fontSize="lg">
                    {item.question}
                  </Text>
                </HStack>
                <Box
                  maxH={openIndex === index ? "200px" : "0px"}
                  overflow="hidden"
                  opacity={openIndex === index ? 1 : 0}
                  transition="max-height 0.5s cubic-bezier(0.45, 1.45, 0.8, 1), opacity .5s cubic-bezier(0.45, 1.45, 0.8, 1)"
                  pt={4}
                  pl={14}
                >
                  <Text
                    fontSize="md"
                    color="gray.600"
                    dangerouslySetInnerHTML={{ __html: item.answer || "" }}
                  />
                </Box>
              </Box>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
