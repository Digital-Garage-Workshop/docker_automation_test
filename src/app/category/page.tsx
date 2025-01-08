"use client";

import React, { useEffect } from "react";
import { VStack, Stack, Container, Box, Text, Grid } from "@chakra-ui/react";
import { VehicleDetail, CarSelection, CatalogGrid } from "@/components";
import { CarBrands as _CarBrands, Category } from "@/services";
import { UseApi } from "@/hooks/useApi";
import { useAppSelector } from "@/hooks/hooks";
import Breadcrumbs from "@/components/global/BreadCrumb";
import { analytics, logEvent } from "@/config/firebaseConfig";
import { useMetadata } from "@/providers/MetadataProvider";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";

const BestSellers = dynamic(
  () => import("../../components/best-seller/BestSellers"),
  { ssr: false }
);

export default function Page() {
  const { setMetadata } = useMetadata();

  useEffect(() => {
    setMetadata({
      title: "Ангилал",
      description: "",
      image: "",
      keywords: "",
    });
  }, []);

  const [{ data: categories, isLoading, responseTime }, categoryFetch] = UseApi(
    {
      service: Category,
    }
  );

  useEffect(() => {
    if (analytics) {
      // Example: Log a custom event when the app loads
      logEvent(analytics, "page_view", {
        page_name: "Category Page",
      });
    }
  }, []);
  const carDetails = useAppSelector((state: any) => state.car);

  useEffect(() => {
    categoryFetch();
  }, []);

  return (
    <VStack
      w="100vw"
      bg="#F1F2F3"
      minH="100vh"
      pb={20}
      gap={{ base: 4, md: 0 }}
      mt={{ base: 16, md: -1 }}
    >
      <Stack w="100vw">
        <CarSelection />
      </Stack>
      <Container
        maxWidth={{ base: "100%", sm: "100%", md: "82%", lg: "82%", xl: "82%" }}
        p={{ base: 4, md: 0 }}
      >
        <Stack bg="#F1F2F3" w="100%" gap={{ base: 6, md: 10 }}>
          <Stack gap={2} w="100%" p={{ base: 0, md: 0 }}>
            <Box h={{ base: 0, md: 3 }} />
            <Stack>
              <Breadcrumbs />
            </Stack>
            <VehicleDetail />
          </Stack>
          <Stack gap={8}>
            <Text fontSize={26} fontWeight={700} alignSelf="flex-start">
              Машины сэлбэгүүд
            </Text>
            {isLoading ? (
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)", // 2 columns on mobile
                  sm: "repeat(3, 1fr)", // 3 columns on small screens
                  md: "repeat(4, 1fr)", // 4 columns on medium screens
                  lg: "repeat(5, 1fr)",
                  xl: "repeat(6, 1fr)", // 6 columns on large screens
                }}
                gap={{ base: 2, md: 4 }}
                w="full"
                position="relative"
              >
                {Array(24)
                  .fill("")
                  .map((_, index) => {
                    return (
                      <Skeleton
                        key={index}
                        width="full"
                        height={264}
                        borderRadius={8}
                        baseColor="#E4E7EC"
                        highlightColor="#E4E7EC"
                      ></Skeleton>
                    );
                  })}
              </Grid>
            ) : (
              <CatalogGrid
                data={categories}
                isExpandable={false}
                isAll={true}
              />
            )}
          </Stack>
          <BestSellers align={true} />
        </Stack>
      </Container>
    </VStack>
  );
}
