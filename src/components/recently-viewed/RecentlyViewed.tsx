"use client";
import {
  HStack,
  Stack,
  Text,
  VStack,
  Button,
  Grid,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PartCard } from "../best-seller";
import { useSelector } from "react-redux";
import { selectViewedProducts } from "@/redux/slices/viewedProductSlice";
import { DownArrow } from "@/icons";

export const RecentlyViewed = () => {
  const articles = useSelector(selectViewedProducts);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil((articles?.length || 0) / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const offset = -currentPage * 100;

  return (
    <VStack
      gap={8}
      w="full"
      display={
        articles === null ? "none" : articles.length === 0 ? "none" : "flex"
      }
      pl={{ base: 4, sm: 4, md: 0, lg: 0, xl: 0 }}
      pos="relative"
    >
      <Heading fontSize={{ base: 20, md: 24 }} fontWeight={700}>
        Cүүлд үзсэн сэлбэгүүд
      </Heading>
      <HStack w="full" overflow="scroll">
        <Button
          variant="outline"
          w={8}
          h={8}
          p={1}
          display={{
            base: "none",
            md: articles?.length > itemsPerPage ? "flex" : "none",
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
          w="full"
          gap={6}
          templateColumns={`repeat(${articles?.length}, 1fr)`}
          transform={`translateX(${offset}%)`}
          transition="transform 0.5s ease"
          style={{ display: "flex", gap: "24px" }}
        >
          {articles
            // ?.slice(
            //   currentPage * itemsPerPage,
            //   (currentPage + 1) * itemsPerPage
            // )
            .map((item: any, index: number) => (
              <Stack key={index} minW={277}>
                <PartCard part={item} isInWishlist={true} />
              </Stack>
            ))}
        </Grid>
        <Button
          variant="outline"
          w={8}
          h={8}
          p={1}
          display={{
            base: "none",
            md: articles?.length > itemsPerPage ? "flex" : "none",
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
};
