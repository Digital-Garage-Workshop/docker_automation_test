"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Spinner,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { Category } from "../../../types/categoryResponse";
import { UseApi } from "@/hooks/useApi";
import { GetSaleCategory } from "@/services/sale_parts/getSaleCategory";
import { CloseIcon, SearchIcon } from "@/icons";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "@/hooks/hooks";
import Skeleton from "react-loading-skeleton";

type CategoryHorizontalProps = {
  setCategoryid: (categoryid: string) => void;
};

const CategoryHorizontal: React.FC<CategoryHorizontalProps> = (props) => {
  const { setCategoryid } = props;
  const [{ data: categoryData, isLoading, error }, fetchProduct] = UseApi({
    service: GetSaleCategory,
  });

  const [data, setData] = useState<Category[] | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  // Fetch the category data only once when the component mounts
  useEffect(() => {
    fetchProduct(); // Make the API call to get the categories
  }, []); // Only re-run this effect when `categoryData` changes

  useEffect(() => {
    // Update the state with the fetched data
    if (categoryData) {
      setData(categoryData);
    }
  }, [categoryData]);

  if (isLoading) {
    return (
      <VStack gap={4} w="full">
        {[...Array(1)].map((_, groupIndex) => (
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
            <HStack w={"full"} justifyContent={"space-between"} p="10px 16px">
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
    );
  }

  if (error) {
    return (
      <Box w="full" py="20px" textAlign="center" color="red.500">
        <Text>Error loading categories: {error.message}</Text>
      </Box>
    );
  }

  // Handle category click, toggle selection
  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategoryId === categoryId) {
      // Deselect the category if it's already selected
      setSelectedCategoryId(null);
      setCategoryid(""); // Clear the selected category
    } else {
      // Set the new category
      setSelectedCategoryId(categoryId);
      setCategoryid(categoryId); // Set the selected category
    }
  };

  return (
    <VStack
      display={{ base: "none", md: data?.length !== 0 ? "flex" : "none" }}
      // w="full"
      maxW={"300px"}
      h={"400px"}
      border={"1px solid #E4E7EC"}
      borderRadius={"8px"}
      width="100%"
      p={2}
      align="flex-start"
      bg="white"
      position="relative"
      zIndex={11}
    >
      <Text fontSize={14} fontWeight={700} p="10px 16px">
        Ангилал
      </Text>
      <HStack spacing={2} w="full" p="10px 16px">
        <InputGroup>
          <Input
            placeholder="Категороор хайх"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              if (categoryData) {
                const filteredData = categoryData.filter((category: Category) =>
                  category.name.toLowerCase().includes(searchTerm)
                );
                setData(filteredData);
              }
            }}
            variant="outline"
            size="md"
            focusBorderColor="blue.500"
            _hover={{ borderColor: "blue.400" }}
          />
          <InputRightElement>
            <SearchIcon color="" />
          </InputRightElement>
        </InputGroup>
      </HStack>
      <VStack w="full" overflow="scroll">
        {data && data.length > 0 ? (
          data.map((item: Category) => (
            <HStack
              w="full"
              cursor={"pointer"}
              onClick={() => handleCategoryClick(item.categoryid!.toString())}
              key={item.categoryid}
              textAlign="center"
              border={
                selectedCategoryId === item.categoryid!.toString()
                  ? "1px solid #F75B00" // Apply border when selected
                  : "none"
              }
              borderRadius="8px"
              padding="8px"
              transition="all 0.3s ease"
              justifyContent="space-between"
              p="8px 16px"
            >
              <HStack w="full">
                <Image
                  src={
                    item.image == null
                      ? "/product.svg"
                      : `${item.image.imgurl400}`
                  }
                  alt="Category Image"
                  w={"30px"}
                  h={"30px"}
                  fit={"contain"}
                />
                <Text
                  _hover={{ color: "#F75B00" }}
                  fontSize={"14px"}
                  fontWeight={700}
                  noOfLines={1} // Make sure the text is one line
                  isTruncated // Apply ellipsis for overflow text
                  maxW="200px" // Make sure text does not exceed image width
                >
                  {item.name}
                </Text>
              </HStack>
              {selectedCategoryId === item.categoryid!.toString() ? (
                <Stack
                  onClick={() => {
                    setSelectedCategoryId(null); // Deselect category
                    setCategoryid(""); // Clear selected category
                  }}
                >
                  <CloseIcon width={12} height={12} />
                </Stack>
              ) : (
                <ChevronRightIcon />
              )}
            </HStack>
          ))
        ) : (
          <Text>No categories available.</Text>
        )}
      </VStack>
    </VStack>
  );
};

export default CategoryHorizontal;
