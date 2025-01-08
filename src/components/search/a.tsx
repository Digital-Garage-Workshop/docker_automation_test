"use client";

import {
  HStack,
  VStack,
  Checkbox,
  Text,
  Stack,
  Divider,
  filter,
} from "@chakra-ui/react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
  Category as _Category,
  Products,
  Filter,
  PartsBrands as _PartsBrands,
  SubCategory,
} from "@/services";
import {UseApi} from "@/hooks/useApi";
import {useAppSelector} from "@/hooks/hooks";
import {GetPartBrands} from "@/services/product-search/partBrand";

type FiltersProps = {
  setAttrValueIds: Dispatch<SetStateAction<any[]>>;
  attrValueIds: any[];
  articleIds: any[];
  categoryId: string;
  setBrandno: Dispatch<SetStateAction<number[] | null>>;
};

export const Filters = (props: FiltersProps) => {
  const {setAttrValueIds, attrValueIds, articleIds, categoryId, setBrandno} =
    props;
  const [preventingData, setPreventingData] = useState<any[]>([]);
  const {carId} = useAppSelector((state: any) => state.car);
  const [{data, isLoading: filterLoader, error: filterError}, fetchFilter] =
    UseApi({
      service: Filter,
    });

  const [
    {data: carBrands, isLoading: carBrandsLoader, error: carBrandsError},
    getCarBrands,
  ] = UseApi({
    service: GetPartBrands,
  });

  useEffect(() => {
    getCarBrands({
      categoryId: categoryId,
      carId: carId,
    });
  }, []);

  useEffect(() => {}, [carBrands]);

  useEffect(() => {
    fetchFilter({
      articleIds: articleIds,
    });
  }, [articleIds]);

  useEffect(() => {
    if (data?.length) setPreventingData(data);
  }, [attrValueIds]);

  const filters = data || [];

  if (filterLoader)
    return (
      <VStack gap={4} borderRadius={8} mt="0px" w={"25%"}>
        {preventingData.map((item: any, index: number) => (
          <VStack
            key={index}
            width="100%"
            pt={0}
            align="flex-start"
            gap={0}
            bg="white"
            borderRadius={8}
            boxShadow="0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)"
          >
            <Text
              fontSize={14}
              fontWeight={600}
              alignSelf="flex-start"
              p="8px 16px"
            >
              {item.name}
            </Text>
            <VStack align="flex-start" gap={0}>
              {item.options.map((option: any, index: number) => (
                <Checkbox
                  p="8px 16px"
                  colorScheme="primary"
                  gap="4px"
                  key={index}
                  sx={{
                    ".chakra-checkbox__control": {
                      borderColor: "#CFCFCF",
                      borderWidth: "1px",
                      borderRadius: "4px",
                      width: "16px",
                      height: "16px",
                    },
                    ".chakra-checkbox__icon": {
                      fontSize: "12px",
                    },
                  }}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const attrId = option.attrvalueid;

                    setAttrValueIds((prev) =>
                      isChecked
                        ? [...prev, attrId]
                        : prev.filter((id) => id !== attrId)
                    );
                  }}
                >
                  <Text fontWeight={500} fontSize={12}>
                    {option.name}
                  </Text>
                </Checkbox>
              ))}
            </VStack>
          </VStack>
        ))}
      </VStack>
    );
  if (filterError) return;

  return (
    <VStack
      gap={4}
      borderRadius={8}
      mt={"0px"}
      display={{base: "none", sm: "none", md: "none", lg: "flex", xl: "flex"}}
      w={"25%"}
    >
      {filters.map((item: any, index: number) => (
        <VStack
          key={index}
          width="100%"
          p={2}
          pt={0}
          align="flex-start"
          gap={0}
          bg="white"
          borderRadius={8}
          boxShadow="0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)"
        >
          <Text
            fontSize={14}
            fontWeight={600}
            alignSelf="flex-start"
            p="8px 16px"
          >
            {item.name}
          </Text>
          <VStack align="flex-start" gap={0}>
            {item.options.map((option: any, index: number) => (
              <Checkbox
                p="8px 16px"
                colorScheme="primary"
                gap="4px"
                key={index}
                sx={{
                  ".chakra-checkbox__control": {
                    borderColor: "#CFCFCF",
                    borderWidth: "1px",
                    borderRadius: "4px",
                    width: "16px",
                    height: "16px",
                  },
                  ".chakra-checkbox__icon": {
                    fontSize: "12px",
                  },
                }}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const attrId = option.attrvalueid;

                  setAttrValueIds((prev) =>
                    isChecked
                      ? [...prev, attrId]
                      : prev.filter((id) => id !== attrId)
                  );
                }}
              >
                <Text fontWeight={500} fontSize={12}>
                  {option.name}
                </Text>
              </Checkbox>
            ))}
          </VStack>
        </VStack>
      ))}
    </VStack>
  );
};
