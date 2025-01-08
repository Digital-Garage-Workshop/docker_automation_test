"use client";
import React, { useEffect, useState } from "react";
import { Text, Image, VStack, HStack, Stack, Divider } from "@chakra-ui/react";
import { UseApi } from "@/hooks/useApi";
import { GetPartBrands } from "@/services/product-search/partBrand";
import { CloseIcon } from "@/icons";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { setBrands } from "@/redux/slices/filterSlice";

interface Brand {
  brandno: string;
  brandname: string;
  images: {
    imgurl400: string;
  } | null;
}

interface FilterByBrandProps {
  setCategoryid: (categoryid: string) => void;
  categoryId: string;
}

const FilterByBrand: React.FC<FilterByBrandProps> = ({
  setCategoryid,
  categoryId,
}) => {
  const dispatch = useDispatch();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const carDetails = useSelector((state: any) => state.car);

  const [{ data: brands, isLoading }, fetchProduct] = UseApi({
    service: GetPartBrands,
  });

  useEffect(() => {
    if (categoryId) {
      fetchProduct({
        categoryId: categoryId,
        carId: carDetails?.carId,
      });
      dispatch(setBrands(""));
    }
  }, [categoryId, carDetails?.carId]);

  const handleCategoryClick = (brandId: string) => {
    if (selectedCategoryId === brandId) {
      setSelectedCategoryId(null);
      dispatch(setBrands(""));
    } else {
      setSelectedCategoryId(brandId);
      dispatch(setBrands(brandId));
    }
  };

  if (isLoading) {
    return (
      <VStack gap={4} w="full">
        <VStack
          border="1px solid #E4E7EC"
          borderRadius="8px"
          width="100%"
          p="8px 16px"
          align="flex-start"
          bg="white"
          gap="8px"
        >
          <HStack w="full" justifyContent="space-between" p="10px 16px">
            <Text as="span" bg="gray.200" h="20px" w="120px" />
          </HStack>
          <Divider />
          <VStack align="flex-start" p="8px 16px" gap="12px" w="full">
            {[...Array(5)].map((_, index) => (
              <HStack key={index} spacing={3} w="full">
                <Text
                  as="span"
                  bg="gray.200"
                  h="16px"
                  w="16px"
                  borderRadius="2px"
                />
                <Text as="span" bg="gray.200" h="20px" w="80%" />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </VStack>
    );
  }

  return (
    <Stack w="full">
      {/* Mobile View */}
      <HStack
        w="full"
        display={{ base: "flex", lg: "none" }}
        overflow="scroll"
        // alignSelf="center"
      >
        <HStack gap={2} w="fit-content">
          {brands && brands.length > 0 ? (
            brands.map((item: Brand) => (
              <HStack
                key={item.brandno}
                w="70px"
                cursor="pointer"
                onClick={() => handleCategoryClick(item.brandno)}
                textAlign="center"
                border={
                  selectedCategoryId === item.brandno
                    ? "1px solid #F75B00"
                    : "1px solid transparent"
                }
                borderRadius="8px"
                padding="8px"
                transition="all 0.3s ease"
                justifyContent="space-between"
                overflow="hidden"
                bg="white"
              >
                <Image
                  src={item.images?.imgurl400 ?? "/product.svg"}
                  alt={item.brandname}
                  w="full"
                  h="25px"
                  fit="contain"
                />
              </HStack>
            ))
          ) : (
            <Text>No brands available.</Text>
          )}
        </HStack>
      </HStack>

      {/* Desktop View */}
      <VStack
        display={{ base: "none", lg: brands?.length ? "flex" : "none" }}
        w="full"
        maxW="300px"
        maxH="400px"
        border="1px solid #E4E7EC"
        borderRadius="8px"
        p="8px"
        align="flex-start"
        bg="white"
        gap="8px"
        position="relative"
        zIndex={11}
      >
        <Text fontSize={14} fontWeight={700} p="8px 16px" pb={2}>
          Брэндүүд
        </Text>
        <Divider />
        <VStack w="full" overflow="scroll">
          {brands && brands.length > 0 ? (
            brands.map((item: Brand) => (
              <HStack
                key={item.brandno}
                w="full"
                cursor="pointer"
                onClick={() => handleCategoryClick(item.brandno)}
                textAlign="center"
                border={
                  selectedCategoryId === item.brandno
                    ? "1px solid #F75B00"
                    : "1px solid transparent"
                }
                borderRadius="8px"
                padding="8px 16px"
                transition="all 0.3s ease"
                justifyContent="space-between"
              >
                <HStack>
                  <Image
                    src={item.images?.imgurl400 ?? "/product.svg"}
                    alt={item.brandname}
                    w="30px"
                    h="30px"
                    fit="contain"
                  />
                  <Text
                    _hover={{ color: "#F75B00" }}
                    fontSize="14px"
                    fontWeight={700}
                    noOfLines={1}
                    isTruncated
                    maxW="200px"
                  >
                    {item.brandname}
                  </Text>
                </HStack>
                {selectedCategoryId === item.brandno ? (
                  <Stack onClick={() => dispatch(setBrands(null))}>
                    <CloseIcon width={12} height={12} />
                  </Stack>
                ) : (
                  <ChevronRightIcon />
                )}
              </HStack>
            ))
          ) : (
            <Text>No brands available.</Text>
          )}
        </VStack>
      </VStack>
    </Stack>
  );
};

export default FilterByBrand;
