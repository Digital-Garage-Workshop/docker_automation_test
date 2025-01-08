"use client";
import {
  VStack,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { UseApi } from "@/hooks/useApi";
import { GetFaq } from "@/services";
import Skeleton from "react-loading-skeleton";

export const Faq = (props: { data: any }) => {
  // const [{ data, isLoading, error }, fetch] = UseApi({ service: GetFaq });
  const { data } = props;

  // useEffect(() => {
  //   fetch();
  // }, []);

  return (
    <VStack w="100%" gap={"32px"} align="center">
      {/* Title Section */}
      <VStack width="100%" align="center" justify="flex-start" gap={2}>
        <Heading
          fontSize={{ base: 20, md: 24 }}
          fontWeight="bold"
          textAlign={{ base: "center" }}
        >
          Түгээмэл асуулт хариултууд
        </Heading>
      </VStack>

      {/* FAQ Accordion */}
      <Accordion allowToggle w="full">
        {// isLoading
        //   ? Array(6)
        //       .fill(" ")
        //       .map((item, index) => (
        //         <GridItem key={index} mb={4}>
        //           <Skeleton width="full" height={"56px"} />
        //         </GridItem>
        //       ))
        //   :
        data?.map((item: any, index: number) => (
          <AccordionItem
            key={index}
            borderRadius="8px"
            border="none"
            mb={4}
            overflow="hidden"
          >
            {({ isExpanded }) => (
              <>
                {/* Accordion Button */}
                <h2>
                  <AccordionButton
                    bg="#F9FAFB"
                    // _hover={{ bg: "#EDF2F7" }}
                    // borderRadius="8px"
                    p={4}
                    transition="backgroundColor 0.6s ease"
                    alignItems={"flex-start"}
                  >
                    <AccordionIcon
                      w={"32px"}
                      h={"32px"}
                      transform={isExpanded ? "rotate(180deg)" : "rotate(0deg)"}
                      transition="transform 0.6s ease"
                      display={{ base: "none", md: "flex" }}
                    />
                    <HStack
                      pl={{ base: 0, md: "24px" }}
                      justify="space-between"
                      w="full"
                    >
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: 16, md: "lg" }}
                        textAlign="start"
                      >
                        {item.question}
                      </Text>
                      {/* Accordion Icon with Smooth Rotation */}
                    </HStack>
                    <AccordionIcon
                      w={"32px"}
                      h={"32px"}
                      transform={isExpanded ? "rotate(180deg)" : "rotate(0deg)"}
                      transition="transform 0.6s ease"
                      display={{ base: "flex", md: "none" }}
                    />
                  </AccordionButton>
                </h2>

                {/* Accordion Panel with 600ms Transition */}
                <AccordionPanel
                  pb={4}
                  bg="#F7FAFC"
                  transition="max-height 0.6s ease, opacity 0.6s ease"
                >
                  <Text
                    fontSize="md"
                    pl={{ base: "24px", md: "52px" }}
                    color="#1E1E1E"
                    dangerouslySetInnerHTML={{ __html: item.answer || "" }}
                    textAlign="start"
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
};
