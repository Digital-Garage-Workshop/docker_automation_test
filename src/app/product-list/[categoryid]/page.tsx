"use client";
import { useState, useEffect, SetStateAction } from "react";
import { useParams } from "next/navigation";
import { CarSelection, Filters, VehicleDetail } from "@/components";
import { VStack, Stack, Box, Text, useToast, HStack } from "@chakra-ui/react";
import { ProductPagination } from "@/components"; // Assuming it's correctly imported
import { useSelector } from "react-redux";
import Breadcrumbs from "@/components/global/BreadCrumb";
import CategoryHorizontal from "@/components/sale_parts/CategoryHorizintal";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/config/firebaseConfig";
import { FiltersMobile } from "@/components/search/FiltersMobile";
import { useMetadata } from "@/providers/MetadataProvider";
import React from "react";
import CategoriesFilter from "@/components/search/CategoriesFilter";
import FilterByBrand from "@/components/search/FilterByBrand";
import CategoryFilters from "@/components/search/CategoriesAccrdionFilters";

export default function Page() {
  const { setMetadata } = useMetadata();

  const { categoryid } = useParams() as { categoryid: string };
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    setCategoryId(categoryid);
  }, [categoryid]);

  useEffect(() => {
    if (analytics) {
      // Example: Log a custom event when the app loads
      logEvent(analytics, "page_view", {
        page_name: "Product List Page",
      });
    }
  }, []);
  const { categoryName, found } = useSelector((state: any) => state.filter);

  useEffect(() => {
    if (categoryName)
      setMetadata({
        title: `${categoryName}`,
        description: `${categoryName}`,
        image: "",
        keywords: `${categoryName}`,
      });
  }, [categoryName]);

  return (
    <VStack
      gap={0}
      bgColor="#F1F2F3"
      w="100vw"
      // pb="900px"
      minH="100vh"
      align="center"
      // justify={"center"}
      pt={{ base: 16, md: 4 }}
      p={{ base: 4, lg: 0 }}
      mt={-1}
    >
      <Stack bg="white" w="100%" alignItems="center">
        <CarSelection />
      </Stack>

      <VStack
        w={{ base: "10s0%", md: "82%" }}
        gap="32px"
        align={"center"}
        alignSelf={"center"}
      >
        <Stack w="full">
          <Box h={{ base: 4, md: 4 }} />
          <Stack>
            <Breadcrumbs />
          </Stack>
          <VehicleDetail />
          <Box h={{ base: 8, md: 0 }} />
          <Text fontSize={{ base: 20, md: 28 }} fontWeight={700} as="h1">
            {categoryName} ангилалд {found} сэлбэг олдлоо
          </Text>
          <Box h={{ base: 4, md: 8 }} />
        </Stack>
      </VStack>

      <HStack
        w={{ base: "100%", md: "82%" }}
        align={{ base: "center", lg: "flex-start" }}
        gap={6}
        // m="auto"
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
        }}
      >
        <VStack w={{ base: "100%", lg: "fit-content" }}>
          {/* <CategoryHorizontal setCategoryid={setCategoryId} /> */}
          {/* <CategoriesFilter
            setCategoryid={setCategoryId}
            categoryId={categoryId?.toString() || "100121"}
          /> */}
          <CategoryFilters
            setCategoryid={setCategoryId}
            categoryId={categoryId?.toString() || ""}
          />
          <FilterByBrand
            setCategoryid={setCategoryId}
            categoryId={categoryId?.toString() || ""}
          />
          <Filters categoryId={categoryId?.toString() || ""} />
        </VStack>
        <ProductPagination categoryId={categoryId} />
      </HStack>
      <Box h={20} />
    </VStack>
  );
}
