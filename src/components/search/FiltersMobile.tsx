"use client";

import {
  HStack,
  VStack,
  Checkbox,
  Text,
  Stack,
  Divider,
  filter,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Category as _Category,
  Products,
  Filter,
  PartsBrands as _PartsBrands,
  SubCategory,
} from "@/services";
import { UseApi } from "@/hooks/useApi";
import { useAppSelector } from "@/hooks/hooks";

type FiltersProps = {
  setAttrValueIds: Dispatch<SetStateAction<any[]>>;
  attrValueIds: any[];
  articleIds: any[];
  categoryId: string;
};

export const FiltersMobile = (props: FiltersProps) => {
  const { setAttrValueIds, attrValueIds, articleIds, categoryId } = props;
  const [preventingData, setPreventingData] = useState<any[]>([]);
  const { carId } = useAppSelector((state: any) => state.car);
  const {
    isOpen: filterModalIsOpen,
    onOpen: filterModalOnOpen,
    onClose: filterModalOnClose,
  } = useDisclosure();
  const [{ data, isLoading: filterLoader, error: filterError }, fetchFilter] =
    UseApi({
      service: Filter,
    });
  const [{ data: parts, isLoading, error }, partsFetch] = UseApi({
    service: _PartsBrands,
  });

  const [
    { data: categories, isLoading: categoryLoader, error: categoryError },
    categoryFetch,
  ] = UseApi({
    service: SubCategory,
  });

  useEffect(() => {
    categoryFetch({ categoryid: categoryId, carid: carId });
    partsFetch();
  }, []);

  useEffect(() => {
    // if (articleIds.length !== 0)
    fetchFilter({
      articleIds: articleIds,
    });
  }, [articleIds]);

  useEffect(() => {
    if (data?.length) setPreventingData(data);
  }, [attrValueIds]);

  const filters = data || [];

  if (filterError) return;

  return (
    <VStack
      w="full"
      display={{
        base: "flex",
        sm: "flex",
        md: "flex",
        lg: "none",
        xl: "none",
      }}
    >
      <HStack
        onClick={filterModalOnOpen}
        w="full"
        justify="center"
        p="8px 24px"
        bg="white"
        borderRadius={8}
        display={{
          base: "flex",
          sm: "flex",
          md: "flex",
          lg: "none",
          xl: "none",
        }}
      >
        <Text fontSize={13} fontWeight={700}>
          Ангилал
        </Text>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M3.33301 3.33331H16.6663V5.14331C16.6662 5.5853 16.4906 6.00916 16.178 6.32165L12.4997 9.99998V15.8333L7.49967 17.5V10.4166L3.76634 6.30998C3.48755 6.00325 3.33305 5.60364 3.33301 5.18915V3.33331Z"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </HStack>
      <Modal isOpen={filterModalIsOpen} onClose={filterModalOnClose}>
        <ModalOverlay />
        <ModalContent w="100vw">
          <ModalHeader>
            <Text>Product filter</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            {/* <Stack w="full" gap={4} maxH={500} overflow="auto">
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
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontWeight="600"
                          >
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
                            >
                              {model.map(
                                (modalItem: any, modalIndex: number) => (
                                  <AccordionItem key={modalIndex} border="none">
                                    <AccordionButton gap="8px">
                                      <AccordionIcon color="#F75B00" />
                                      <Box as="span" flex="1" textAlign="left">
                                        {modalItem.modelname}
                                      </Box>
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                      {selectedModel === modalIndex && car ? (
                                        <Box
                                          borderLeft={"1px solid #D0D5DD"}
                                          ml={2}
                                        >
                                          {car.map(
                                            (
                                              carItem: any,
                                              carIndex: number
                                            ) => (
                                              <Box
                                                key={carIndex}
                                                pl={"20px"}
                                                mb={2}
                                              >
                                                <Text
                                                  fontSize="sm"
                                                  color="gray.700"
                                                >
                                                  {`Түлшний төрөл-${carItem.fueltype}, Эзлэхүүн-${carItem.ccm}, Цилиндр-${carItem.cylinder}, Хөдөлгүүр №-${carItem.motorcode}`}
                                                </Text>
                                              </Box>
                                            )
                                          )}
                                        </Box>
                                      ) : (
                                        "Уншиж байна..."
                                      )}
                                    </AccordionPanel>
                                  </AccordionItem>
                                )
                              )}
                            </Accordion>
                          ) : (
                            "Уншиж байна..."
                          )}
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
              </Accordion>
            </Stack> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
