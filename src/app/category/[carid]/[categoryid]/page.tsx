"use client";
import { CarSelection, SuggestedParts } from "@/components";
import { SubCategories } from "@/components/no-car-selected-search-comps/SubCategories";
import { VStack, HStack, Text, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { UseApi } from "@/hooks/useApi";
import { SubCategory } from "@/services";
import { parse } from "path";
import { useMetadata } from "@/providers/MetadataProvider";
import React from "react";
import dynamic from "next/dynamic";

const BestSellers = dynamic(
  () => import("../../../../components/best-seller/BestSellers"),
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
  const params = useParams();
  const [
    { data: subCategories, isLoading: subIsloading, error: subError },
    subCategoryFetch,
  ] = UseApi({
    service: SubCategory,
  });

  useEffect(() => {
    subCategoryFetch({
      categoryid: Number(params?.categoryid),
    });
  }, []);

  return (
    <VStack gap="80px" bgColor="#F1F2F3" w="100vw" minH={"100vh"}>
      <VStack w="82%" gap="80px" mt={4} px={4}>
        <CarSelection />

        <VStack bg="white" w="100vw" pt={10} pb={"80px"}>
          <VStack w="82%" gap={20} px={4}>
            <SubCategories data={subCategories} />

            <BestSellers align={true} />
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
