"use client";
import { useState, useEffect } from "react";
import { CarSelection, VehicleDetail } from "@/components";
import { VStack, Stack, Box, HStack, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Breadcrumbs from "@/components/global/BreadCrumb";
import { SalePartPagination } from "@/components/sale_parts/SalePartPagination";
import CategoryHorizontal from "@/components/sale_parts/CategoryHorizintal";
import { SalePartsFilters } from "@/components/sale_parts/SalePartsFilter";
import { analytics, logEvent } from "@/config/firebaseConfig";

export default function Page() {
  // const {categoryid} = useParams() as {categoryid: string};
  const [categoryid, setCategoryid] = useState("");

  useEffect(() => {
    if (analytics) {
      // Example: Log a custom event when the app loads
      logEvent(analytics, "page_view", {
        page_name: "Sale Part Page",
      });
    }
  }, []);
  const { categoryName, found } = useSelector((state: any) => state.filter);

  return (
    <VStack gap={0} bgColor="#F1F2F3" w="100vw" pb={170} minH="100vh" mt={3}>
      <Stack bg="white" w="100%" alignItems="center">
        <CarSelection />
      </Stack>

      <VStack w="82%" gap="32px">
        <Stack w="full" mt={{ base: -4, md: 8 }}>
          <Breadcrumbs />
          <VehicleDetail />

          <Box h={{ base: 4, md: 8 }} />
        </Stack>
      </VStack>

      <HStack
        w="82%"
        align="flex-start"
        alignSelf={"center"}
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
        <VStack>
          <CategoryHorizontal setCategoryid={setCategoryid} />
          <SalePartsFilters categoryId={categoryid?.toString() || "100121"} />
        </VStack>

        <SalePartPagination categoryId={categoryid} />
      </HStack>
    </VStack>
  );
}
