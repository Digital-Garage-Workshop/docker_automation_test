"use client";
import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { Category } from "../../../types/categoryResponse";
import { UseApi } from "@/hooks/useApi";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Category as _Category, SubCategory } from "@/services";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon } from "@/icons";
import { setMainCategoryId } from "@/redux/slices/mainCateSlice";

type CategoryHorizontalProps = {
  setCategoryid: (categoryid: string) => void;
  categoryId: string;
};

const CategoriesFilter: React.FC<CategoryHorizontalProps> = (props) => {
  const { setCategoryid, categoryId } = props;
  const [{ data: categoryData, isLoading, error }, fetchProduct] = UseApi({
    service: SubCategory,
  });
  const [
    { data: categories, isLoading: categoriesLoader, error: categoriesError },
    fetchCategory,
  ] = UseApi({
    service: _Category,
  });

  const [data, setData] = useState<Category[] | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const carDetails = useSelector((state: any) => state.car);
  const { mainCategoryId } = useSelector((state: any) => state.maincate);
  // Fetch the category data only once when the component mounts
  useEffect(() => {
    fetchProduct({
      categoryid: mainCategoryId,
      carid: carDetails?.carId,
    });

    fetchCategory();
  }, []);

  useEffect(() => {
    fetchProduct({
      categoryid: mainCategoryId,
      carid: carDetails?.carId,
    });
  }, [mainCategoryId]);

  useEffect(() => {
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

  const dispatch = useDispatch();
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
      w="full"
      maxW={"300px"}
      maxH={"400px"}
      border={"1px solid #E4E7EC"}
      borderRadius={"8px"}
      width="100%"
      // p={"8px 16px"}
      align="flex-start"
      bg="white"
      gap={"8px"}
      // px={"14px"}
      // py="20px"
      // Makes the container scrollable horizontally
      position="relative"
      zIndex={11}
    >
      <Text fontSize={14} fontWeight={700}>
        Ангилал
      </Text>
      {/* <HStack spacing={2} mb={4} w="full">
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
              } else {
                setData(categoryData);
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
      </HStack> */}
      <Divider />
      <VStack w="full" overflow="scroll">
        {data && data.length > 0 ? (
          data.map((item: Category) => (
            <HStack
              w="full"
              cursor={"pointer"}
              onClick={() => handleCategoryClick(item.categoryid!.toString())}
              // onClick={() => {
              //   dispatch(setMainCategoryId(item.categoryid));
              // }}
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
              justifyContent={"space-between"}
            >
              <HStack>
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

              <ChevronRightIcon
                transform={"rotate(90deg)"}
                color={
                  selectedCategoryId === item.categoryid!.toString()
                    ? "#F75B00" // Apply border when selected
                    : "#1E1E1E"
                }
              />
            </HStack>
          ))
        ) : (
          <Text>No categories available.</Text>
        )}
      </VStack>
    </VStack>
  );
};

export default CategoriesFilter;
