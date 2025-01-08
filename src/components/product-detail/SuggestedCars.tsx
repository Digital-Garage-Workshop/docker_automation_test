"use client";
import {
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Divider,
  color,
  border,
} from "@chakra-ui/react";
import { UseApi } from "@/hooks/useApi";
import { ComportableCar, ComportableModel, ComportableBrand } from "@/services";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export const SuggestedCars = (props: { partId: string }) => {
  const { partId } = props;
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: ComportableBrand,
  });

  const [
    { data: model, isLoading: modelIsLoading, error: modalError },
    modalFetch,
  ] = UseApi({
    service: ComportableModel,
  });

  const [{ data: car, isLoading: carIsLoading, error: carError }, carFetch] =
    UseApi({
      service: ComportableCar,
    });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  useEffect(() => {
    if (partId)
      fetch({
        articleId: partId,
      });
  }, [partId]);

  useEffect(() => {
    if (expandedIndex !== null) {
      modalFetch({
        articleId: partId,
        manuid: data[expandedIndex]?.manuid || "111",
      });
    }
  }, [expandedIndex, partId]);

  useEffect(() => {
    if (selectedModel !== null && expandedIndex !== null) {
      carFetch({
        articleId: partId,
        manuid: data[expandedIndex]?.manuid || "111",
        modelid: model[selectedModel]?.modelid || "111",
      });
    }
  }, [selectedModel, expandedIndex, partId]);

  if (isLoading)
    return (
      <Stack
        w="full"
        gap={0}
        pt={"40px"}
        maxH={500}
        overflow="auto"
        display={data?.length !== 0 ? "flex" : "none"}
      >
        <Text fontSize={20} fontWeight={600}>
          Дараахь машинуудад тохирно
        </Text>

        {Array(5)
          .fill("")
          .map((item: any, index: number) => {
            return (
              <Skeleton
                key={index}
                width="full"
                style={{ marginTop: "40px" }}
                height={40}
              ></Skeleton>
            );
          })}
      </Stack>
    );

  return (
    <Stack
      w="full"
      gap={4}
      // pt={"80px"}
      display={data?.length !== 0 ? "flex" : "none"}
    >
      <Text fontSize={24} fontWeight={600}>
        Дараах машинуудад тохирно
      </Text>
      <Stack w="full" gap={4} maxH={500} overflow="auto">
        <Accordion
          allowToggle
          onChange={(index: any) => setExpandedIndex(index)}
          style={{
            borderLeft: "1px solid #D0D5DD",
            borderRight: "1px solid #D0D5DD",
          }}
          borderColor="1px solid #D0D5DD"
        >
          {data &&
            data.map((item: any, index: number) => {
              return (
                <AccordionItem
                  key={index}
                  sx={{
                    // borderBottom: "1px solid #CFCFCF",
                    borderTop: "1px solid #D0D5DD",
                  }}
                >
                  <AccordionButton gap={2}>
                    <AccordionIcon color="#F75B00" />
                    <Box as="span" flex="1" textAlign="left" fontWeight="600">
                      {item.name}
                    </Box>
                  </AccordionButton>
                  <AccordionPanel
                    pb={4}
                    sx={{
                      borderTop: "1px solid #D0D5DD",
                    }}
                  >
                    {model ? (
                      <Accordion
                        allowToggle
                        onChange={(idx: any) => setSelectedModel(idx)}
                        maxH={"80%"}
                        overflow="scroll"
                      >
                        {model.map((modalItem: any, modalIndex: number) => (
                          <AccordionItem key={modalIndex} border="none">
                            <AccordionButton gap="8px">
                              <AccordionIcon color="#F75B00" />
                              <Box as="span" flex="1" textAlign="left">
                                <Text fontWeight={600} fontSize={14}>
                                  {modalItem.modelname}
                                </Text>
                              </Box>
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                              {selectedModel === modalIndex && car ? (
                                <Box borderLeft={"1px solid #D0D5DD"} ml={2}>
                                  {car.map((carItem: any, carIndex: number) => (
                                    <Box key={carIndex} pl={"20px"} mb={2}>
                                      <Text fontSize="sm" color="gray.700">
                                        {`${carItem.name} : Түлшний төрөл-${carItem.fueltype}, Эзлэхүүн-${carItem.ccm}, Цилиндр-${carItem.cylinder}, Хөдөлгүүр №-${carItem.motorcode}`}
                                      </Text>
                                    </Box>
                                  ))}
                                </Box>
                              ) : (
                                "Уншиж байна..."
                              )}
                            </AccordionPanel>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      "Уншиж байна..."
                    )}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
        </Accordion>
      </Stack>
    </Stack>
  );
};
