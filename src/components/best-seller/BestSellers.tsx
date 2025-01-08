"use client";
import {
  Grid,
  GridItem,
  Stack,
  VStack,
  Text,
  HStack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { PartCard } from "./partCard";
import { UseApi } from "@/hooks/useApi";
import { GetBestSellers } from "@/services";
import { useEffect, useState } from "react";
import { DownArrow } from "@/icons";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { PartCardSkeleton } from "../skeletons/PartCardSkeleton";

export default function BestSellers(props: { align?: boolean }) {
  const { align } = props;
  const carDetails = useSelector((state: any) => state.car);
  const [
    { data: bestSellers, error: bestSellerError, isLoading: bestSellerLoader },
    BestSellerFetch,
  ] = UseApi({ service: GetBestSellers });

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil((bestSellers?.length || 0) / itemsPerPage);

  useEffect(() => {
    BestSellerFetch({
      carid: carDetails?.carId,
    });
  }, [carDetails?.carId]);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const offset = -currentPage * 40.0625;

  return (
    <VStack gap={{ base: "16px", md: "32px" }} w="100%" mt={20} pos="relative">
      <Stack
        gap={{ base: "4px", md: "8px" }}
        alignItems={align ? "flex-start" : "center"}
        w="100%"
      >
        <Heading
          fontWeight={700}
          color="#1E1E1E"
          fontSize={{
            base: "20px",
            md: align ? "20px" : "24px",
            lg: align ? "20px" : "24px",
          }}
          textAlign="center"
          as="h1"
        >
          Эрэлттэй бүтээгдэхүүнүүд
        </Heading>
      </Stack>

      <HStack w="full" overflow="scroll" px={{ base: 4, md: 0 }}>
        <Button
          variant="outline"
          w={8}
          h={8}
          p={1}
          display={{
            base: "none",
            md: bestSellers?.length > itemsPerPage ? "flex" : "none",
          }}
          pos="absolute"
          left={-14}
          zIndex={12}
          onClick={handlePrev}
          isDisabled={currentPage === 0}
        >
          <Stack transform="rotate(90deg)">
            <DownArrow color="#1E1E1E" w="24" h="24" />
          </Stack>
        </Button>

        <Grid
          templateColumns={`repeat(${bestSellers?.length}, 1fr)`}
          transform={`translateX(${offset}%)`}
          transition="transform 0.5s ease"
          gap={{ base: "12px", md: "24px" }}
          style={{ display: "flex", gap: "24px" }}
        >
          {bestSellerLoader
            ? Array(4)
                .fill("")
                .map((_, index) => <PartCardSkeleton key={index} />)
            : bestSellers?.map((item: any, index: number) => (
                <GridItem key={index} minW={270}>
                  <PartCard part={item} isBordered={true} />
                </GridItem>
              ))}
        </Grid>

        <Button
          variant="outline"
          w={8}
          h={8}
          p={1}
          display={{
            base: "none",
            md: bestSellers?.length > itemsPerPage ? "flex" : "none",
          }}
          pos="absolute"
          right={-14}
          zIndex={12}
          onClick={handleNext}
          isDisabled={currentPage === totalPages - 1}
        >
          <Stack transform="rotate(-90deg)">
            <DownArrow color="#1E1E1E" w="24" h="24" />
          </Stack>
        </Button>
      </HStack>
    </VStack>
  );
}
