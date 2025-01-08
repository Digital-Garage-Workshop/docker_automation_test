"use client";

import {
  VStack,
  HStack,
  Text,
  Stack,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {SubCategory} from "@/services";
import {UseApi} from "@/hooks/useApi";
import Image from "next/image";
import {DownArrow, Window} from "@/icons";

type SearchSubCategoriesType = {
  categoryId: string | undefined | string[];
  carid: number | null;
};

export const SearchSubCategories = (props: SearchSubCategoriesType) => {
  const {categoryId, carid} = props;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const [
    {data: categories, isLoading: categoryLoader, error: categoryError},
    categoryFetch,
  ] = UseApi({
    service: SubCategory,
  });

  const visibleItems = categories?.slice(
    currentPage,
    currentPage + itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < categories?.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    categoryFetch({categoryid: categoryId, carid: carid});
  }, []);
  return (
    <VStack gap={4} w="100%" pos="relative">
      <HStack w="100%">
        <Grid
          maxW="100%"
          overflowX="auto"
          gap={4}
          templateColumns={`repeat(${categories?.length}, 190px)`}
        >
          {categories?.map((item: any, index: number) => (
            <GridItem key={index} minW="0">
              <VStack
                w="100%"
                p="16px 0px"
                bg="#F9FAFB"
                gap={2}
                _hover={{
                  border: "1px solid #F75B00",
                  transition: "border-color 300ms ease",
                }}
              >
                {/* {index === 0 ? (
                  <Window />
                ) : ( */}
                <Stack width="56px" height="56px" pos="relative">
                  <Image
                    src={item.image ? item.image.imgurl400 : "/img.svg"}
                    alt=""
                    style={{objectFit: "cover"}}
                    fill
                  />
                </Stack>
                {/* )} */}
                <Text>{item.name}</Text>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </HStack>
    </VStack>
  );
};
