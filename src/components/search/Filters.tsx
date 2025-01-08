"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  VStack,
  Checkbox,
  Text,
  HStack,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Divider,
  Card,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { UseApi } from "@/hooks/useApi";
import { Filter } from "@/services";
import { setAttrValueIds } from "@/redux/slices/filterSlice";
import Skeleton from "react-loading-skeleton";
import { useParams } from "next/navigation";
import { border } from "@chakra-ui/react";
import { CloseIcon } from "@/icons";

type FiltersProps = {
  categoryId: string;
};

export const Filters = ({ categoryId }: FiltersProps) => {
  const dispatch = useDispatch();
  const { categoryid } = useParams() as { categoryid: string };
  const { attrValueIds, articleIds } = useSelector(
    (state: any) => state.filter
  );
  const { carId } = useSelector((state: any) => state.car);
  const { mainCategoryId } = useSelector((state: any) => state.maincate);

  const [prevFilters, setPrevFilters] = useState<any[]>([]);

  const [{ data, isLoading: filterLoader, error }, fetchFilter] = UseApi({
    service: Filter,
  });

  const handleCheckboxChange = (isChecked: boolean, attrId: any) => {
    if (isChecked) {
      dispatch(setAttrValueIds([...attrValueIds, attrId]));
    } else {
      dispatch(
        setAttrValueIds(
          attrValueIds.filter(
            (id: any) => id.attrvalueid !== attrId.attrvalueid
          )
        )
      );
    }
  };

  useEffect(() => {
    // if (articleIds.length === 0) return;
    if (categoryId) {
      fetchFilter({ carid: carId, categoryid: categoryId });
      dispatch(setAttrValueIds([]));
    }
  }, [categoryId]);

  useEffect(() => {
    if (data) {
      setPrevFilters(data);
    }
  }, [data]);

  const filters = useMemo(() => {
    if (filterLoader && prevFilters.length > 0) {
      return prevFilters;
    }
    return data || [];
  }, [data, filterLoader, prevFilters]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderFilters = () => {
    if (filterLoader && prevFilters.length === 0) {
      return (
        <Stack w="full">
          <VStack gap={4} w="full" display={{ base: "none", lg: "flex" }}>
            {[...Array(3)].map((_, groupIndex) => (
              <VStack
                key={groupIndex}
                border={"1px solid #E4E7EC"}
                borderRadius={"8px"}
                width="100%"
                p={"8px 16px"}
                align="flex-start"
                bg="white"
                gap={"8px"}
              >
                <HStack
                  w={"full"}
                  justifyContent={"space-between"}
                  p="10px 16px"
                >
                  <Skeleton height="20px" width="120px" />
                </HStack>
                <Divider />

                <VStack align="flex-start" p="8px 16px" gap="12px" w="full">
                  {[...Array(5)].map((_, index) => (
                    <HStack key={index} spacing={3} w="full">
                      <Skeleton width="16px" height="16px" borderRadius="2px" />
                      <Skeleton height="20px" width="80%" />
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            ))}
          </VStack>
        </Stack>
      );
    }

    return (
      <VStack w="full" spacing={4}>
        {/* Clear all filters button */}
        {attrValueIds.length !== 0 && (
          <HStack
            w="full"
            justifyContent="flex-start"
            display={{ base: "flex", lg: "none" }}
          >
            {/* {attrValueIds.map((item: any, index: number) => 
            (
              <HStack
                key={index}
                p={2}
                bg={"#E4E7EC"}
                borderRadius={8}
                gap={2}
                onClick={() => {
                  dispatch(
                    setAttrValueIds(
                      attrValueIds.filter((id: number) => id !== item)
                    )
                  );
                }}
              >
                <Text fontSize={12} cursor="pointer">
                  {item}
                </Text>
                <CloseIcon width={16} height={16} />
              </HStack>
            ))} */}

            <Stack p={2} bg={"#E4E7EC"} borderRadius={8}>
              <Text
                onClick={() => {
                  dispatch(setAttrValueIds([]));
                  onClose();
                }}
                fontSize={12}
                color="#F75B00"
                cursor="pointer"
              >
                Цэвэрлэх
              </Text>
            </Stack>
          </HStack>
        )}

        <Accordion
          allowMultiple
          w="full"
          opacity={filterLoader ? 0.7 : 1}
          display={{ base: "block", lg: "none" }}
        >
          {filters.map((item: any, index: number) => (
            <AccordionItem
              key={`filter-${index}`}
              border="1px solid #E4E7EC"
              borderRadius="8px"
              mb={2}
            >
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <HStack w="full" justifyContent="space-between">
                      <Text fontSize={14} fontWeight={700}>
                        {item.name}
                      </Text>
                      <AccordionIcon />
                    </HStack>
                  </AccordionButton>
                  <AccordionPanel pb={4} maxH={500} overflowY="auto">
                    <VStack align="flex-start" spacing={3}>
                      {item.options.map((option: any, optionIndex: number) => (
                        <Checkbox
                          key={`${option.attrvalueid}-${optionIndex}`}
                          isChecked={attrValueIds
                            .map((attr: any) => attr.attrvalueid)
                            .includes(option.attrvalueid)}
                          onChange={(e) => {
                            handleCheckboxChange(e.target.checked, option);
                            // onClose();
                          }}
                          isDisabled={filterLoader}
                          sx={{
                            ".chakra-checkbox__control": {
                              width: "16px",
                              height: "16px",
                              borderColor: "#CFCFCF",
                            },
                          }}
                        >
                          <Text fontWeight={500} fontSize={14}>
                            {option.name}
                          </Text>
                        </Checkbox>
                      ))}
                    </VStack>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>

        <VStack
          w={"full"}
          display={{ base: "none", lg: "flex" }}
          alignSelf={"center"}
        >
          {filters.map((item: any, index: number) => (
            <VStack
              key={`filtersno-${index}`}
              border={"1px solid #E4E7EC"}
              borderRadius={"8px"}
              width="100%"
              align="flex-start"
              bg="white"
              gap={"8px"}
              opacity={filterLoader ? 0.7 : 1}
              my={{ base: 4, lg: 0 }}
              p={2}
            >
              <HStack w={"full"} justifyContent={"space-between"} p="8px 16px">
                <Text fontSize={14} fontWeight={700}>
                  {item.name}
                </Text>
              </HStack>
              <Divider />
              <VStack
                align="flex-start"
                maxH={500}
                overflow={"scroll"}
                w="full"
              >
                {item.options.map((option: any, index: number) => (
                  <HStack p="8px 16px" w="full" key={index}>
                    <Checkbox
                      key={`${option.attrvalueid}-${index}`}
                      isChecked={attrValueIds
                        .map((attr: any) => attr.attrvalueid)
                        .includes(option.attrvalueid)}
                      onChange={(e) => {
                        handleCheckboxChange(e.target.checked, option);
                        onClose();
                      }}
                      isDisabled={filterLoader}
                      sx={{
                        ".chakra-checkbox__control": {
                          width: "16px",
                          height: "16px",
                          borderColor: "#CFCFCF",
                        },
                      }}
                    />
                    <Text fontSize={14}>{option.name}</Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          ))}
        </VStack>
      </VStack>
    );
  };

  return (
    <>
      <Box
        display={{ base: "flex", lg: "none" }}
        bottom="0"
        right={0}
        width="100%"
        zIndex={10}
        pos={"relative"}
      >
        <Button
          width="100%"
          onClick={onOpen}
          alignSelf={"flex-start"}
          justifySelf={"flex-start"}
          variant={"outline"}
          rightIcon={
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
          }
        >
          Шүүлтүүр
        </Button>
      </Box>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent mt={8} maxH={"80vh"} overflow="scroll" gap={4}>
          <DrawerCloseButton />
          <DrawerHeader>Шүүлтүүр</DrawerHeader>
          <DrawerBody gap={4}>{renderFilters()}</DrawerBody>
        </DrawerContent>
      </Drawer>

      <VStack display={{ base: "none", lg: "flex" }} gap={4} w="300px">
        {renderFilters()}
      </VStack>
    </>
  );
};
