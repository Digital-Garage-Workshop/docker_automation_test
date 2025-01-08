"use client";
import React, { useEffect, useState } from "react";
import {
  Text,
  VStack,
  HStack,
  Divider,
  Stack,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { UseApi } from "@/hooks/useApi";
import { Category, SubCategory } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { setMainCategoryId } from "@/redux/slices/mainCateSlice";
import { DownArrow } from "@/icons";

type CategoryFiltersProps = {
  setCategoryid: (categoryid: string) => void;
  categoryId: string;
};

const CategoryFilters: React.FC<CategoryFiltersProps> = (props) => {
  const { setCategoryid, categoryId } = props;
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"categories" | "subcategories">(
    "categories"
  );
  const dispatch = useDispatch();

  const carDetails = useSelector((state: any) => state.car);

  const [{ data, isLoading }, fetch] = UseApi({
    service: Category,
  });

  const [{ data: subCategories, isLoading: subLoader }, subFetch] = UseApi({
    service: SubCategory,
  });
  const { mainCategoryId } = useSelector((state: any) => state.maincate);

  useEffect(() => {
    fetch();
    if (mainCategoryId && carDetails?.carId)
      subFetch({
        categoryid: mainCategoryId,
        carid: carDetails?.carId,
      });
  }, []);

  useEffect(() => {
    setViewMode("subcategories");
  }, [subCategories]);

  const handleCategoryClick = (index: number, id: number) => {
    setSelectedCategory(index);
    subFetch({
      categoryid: id,
      carid: carDetails?.carId,
    });
    setViewMode("subcategories");
  };

  const handleBackToCategories = () => {
    setViewMode("categories");
    setSelectedCategory(null);
  };

  const handleSubCategoryClick = (id: string) => {
    setCategoryid(id);
    dispatch(setMainCategoryId(parseInt(id)));
  };

  if (isLoading) {
    return null;
  }

  return (
    <VStack
      display={{
        base: "none",
        lg: data?.length !== 0 ? "flex" : "none",
      }}
      w="full"
      maxW="300px"
      maxH="400px"
      border="1px solid #E4E7EC"
      borderRadius="8px"
      width="100%"
      align="flex-start"
      bg="white"
      position="relative"
      zIndex={11}
      overflow="hidden"
      p={2}
    >
      {viewMode === "categories" ? (
        // Main Categories View
        <VStack w="full" align="start" spacing={0}>
          <Text fontSize={14} fontWeight={700} p="10px 16px">
            Ангилал
          </Text>
          <Divider my={2} />
          <VStack
            w="full"
            align="start"
            spacing={0}
            overflowY="auto"
            maxH="300px"
          >
            {data?.map((item: any, index: number) => (
              <HStack
                key={`main=${item.categoryid}-${index}`}
                w="full"
                justifyContent="space-between"
                // _hover={{ bg: "#F75B00", color: "white" }}
                p="10px 16px"
                onClick={() => handleCategoryClick(index, item.categoryid)}
                cursor="pointer"
              >
                <HStack gap={4} w="85%">
                  <Stack width={6} height={6} pos="relative">
                    <Image
                      src={
                        item.image == null
                          ? "/product.svg"
                          : `${item.image.imgurl400}`
                      }
                      alt={item.name}
                      w={6}
                      h={6}
                    />
                  </Stack>
                  <Text
                    fontSize={14}
                    fontWeight={600}
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    maxW={"90%"}
                  >
                    {item.name}
                  </Text>
                </HStack>
                <Stack transform="rotate(-90deg)">
                  <DownArrow color="#717171" w="16" h="16" />
                </Stack>
              </HStack>
            ))}
          </VStack>
        </VStack>
      ) : (
        // Subcategories View
        <VStack w="full" align="start" spacing={0}>
          <HStack p="16px" justify="space-between" w="full">
            <HStack gap={4} ml={1} mt={2}>
              <Stack
                h={6}
                w={6}
                justify="center"
                align="center"
                transform="rotate(90deg)"
                bg="#E4E7EC"
                borderRadius={8}
                onClick={handleBackToCategories}
                cursor="pointer"
              >
                <DownArrow w="16" h="16" color="#1e1e1e" />
              </Stack>
              <Text fontSize={14} fontWeight={700}>
                {subCategories?.[0]?.parentname || "Дэд ангилал"}
              </Text>
            </HStack>
          </HStack>
          <Divider />
          <VStack
            w="full"
            align="start"
            spacing={0}
            overflowY="auto"
            maxH="340px"
            mt={2}
            pb={6}
          >
            {subLoader ? (
              <VStack w="full" gap={2} p={4}>
                {[1, 2, 3, 4].map((_, index) => (
                  <HStack gap={2} w="full" key={index}>
                    <Skeleton
                      w={8}
                      h={6}
                      startColor="#F2F4F7"
                      endColor="#F2F4F7"
                    />
                    <Skeleton
                      width="full"
                      height={6}
                      startColor="#F2F4F7"
                      endColor="#F2F4F7"
                    />
                  </HStack>
                ))}
              </VStack>
            ) : subCategories?.length !== 0 ? (
              subCategories?.map((subItem: any, subIndex: number) => (
                <HStack
                  key={`sub=${subItem.categoryid}=${subIndex}`}
                  w="full"
                  onClick={() =>
                    handleSubCategoryClick(subItem.categoryid.toString())
                  }
                  justifyContent="space-between"
                  // _hover={{ bg: "#F75B00", color: "white" }}
                  padding="10px 16px"
                  cursor="pointer"
                >
                  <HStack gap={4}>
                    <Stack width={6} height={6} pos="relative">
                      <Image
                        src={
                          subItem.image == null
                            ? "/product.svg"
                            : `${subItem.image.imgurl400}`
                        }
                        alt={subItem.name}
                        w={6}
                        h={6}
                      />
                    </Stack>
                    <Text fontSize={14} fontWeight={600}>
                      {subItem.name}
                    </Text>
                  </HStack>
                </HStack>
              ))
            ) : (
              <HStack p="8px 16px">
                <Text fontSize={14}>Уучлаарай сэлбэг олдсонгүй</Text>
              </HStack>
            )}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

export default CategoryFilters;
