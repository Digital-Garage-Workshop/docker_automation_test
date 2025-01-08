"use client";
import {
  Grid,
  GridItem,
  Stack,
  VStack,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import { DownArrow } from "@/icons";
import { CarBrandCard } from "./CarBrandCard";
import { useEffect } from "react";
import { CarBrands as _CarBrands } from "@/services";
import { UseApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";

export const CarBrands = (props: { data: any }) => {
  const { data } = props;
  // const [{ data, isLoading, error }, fetch] = UseApi({
  //   service: _CarBrands,
  // });
  const router = useRouter();

  // useEffect(() => {
  //   // fetch();
  // }, []);

  const handleMoreBrands = () => {
    router.push("/car-brands");
  };

  return (
    <VStack gap={{ base: "16px", md: "32px" }} w="100%" px={{ base: 0, md: 0 }}>
      {/* Header Text */}
      <Stack gap={{ base: "4px", md: "8px" }} alignItems="center" w="100%">
        <Heading
          fontWeight={700}
          color="#1E1E1E"
          fontSize={{ base: "20px", md: "24px", lg: "24px" }}
          textAlign="center"
          as="h1"
        >
          Үйлдвэрлэгчийн сэлбэг
        </Heading>
      </Stack>

      {/* Brands Grid */}
      <Grid
        w="100%"
        templateColumns={{
          base: "repeat(2, 1fr)", // 2 columns on mobile
          sm: "repeat(3, 1fr)", // 3 columns on small screens
          md: "repeat(4, 1fr)", // 4 columns on medium screens
          lg: "repeat(6, 1fr)", // 6 columns on large screens
        }}
        rowGap={{ base: "16px", md: "16px" }}
        columnGap={{ base: "8px", md: "24px" }}
      >
        {/* {isLoading
          ? Array(12)
              .fill(" ")
              .map((item, index) => (
                <GridItem key={index}>
                  <Skeleton width="full" height={"56px"} />
                </GridItem>
              ))
          : */}
        {data?.slice(0, 12)?.map((item: any, index: number) => (
          <GridItem key={index}>
            <CarBrandCard {...item} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};
