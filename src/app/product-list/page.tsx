"use client";

import React, { useEffect, useState } from "react";
import { VStack, Stack, Container, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import {
  VehicleDetail,
  CarSelection,
  // BestSellers,
  CatalogGrid,
} from "@/components";
import { CarBrands as _CarBrands, Category } from "@/services";
import { UseApi } from "@/hooks/useApi";
import { useAppSelector } from "@/hooks/hooks";
import Breadcrumbs from "@/components/global/BreadCrumb";
import { useMetadata } from "@/providers/MetadataProvider";
import dynamic from "next/dynamic";

const BestSellers = dynamic(
  () => import("../../components/best-seller/BestSellers"),
  { ssr: false }
);

export default function Page() {
  const { setMetadata } = useMetadata();

  useEffect(() => {
    setMetadata({
      title: "Бүтээгдэхүүний жагсаалт",
      description: "",
      image: "",
      keywords: "",
    });
  }, []);

  const [{ data: categories, isLoading }, categoryFetch] = UseApi({
    service: Category,
  });

  const carDetails = useAppSelector((state: any) => state.car);

  useEffect(() => {
    if (carDetails.carId) categoryFetch({ carid: carDetails.carId });
  }, []);

  return (
    <VStack w="100%" bg="#F1F2F3" minH="100vh" pb={20}>
      <Stack w="full" bg="white">
        <CarSelection />
      </Stack>
      <Container
        maxWidth={{ base: "100%", sm: "100%", md: "82%", lg: "82%", xl: "82%" }}
      >
        <Stack bg="#F1F2F3" w="100%" gap={{ base: 0, md: 10 }}>
          <Stack gap={2} w="100%" p={2} mt={2}>
            <Box h={{ base: 6, md: 8 }} />
            <Stack display={{ base: "none", md: "flex" }}>
              <Breadcrumbs />
            </Stack>
            <VehicleDetail />
          </Stack>
          <Text
            display={{
              base: "flex",
              sm: "flex",
              md: "none",
              lg: "none",
              xl: "none",
            }}
            py={4}
            fontSize={26}
            fontWeight={700}
            alignSelf="flex-start"
          >
            Машины сэлбэгүүд
          </Text>
          <CatalogGrid data={categories} isExpandable={false} isAll={false} />
          <BestSellers />
        </Stack>
      </Container>
    </VStack>
  );
}
