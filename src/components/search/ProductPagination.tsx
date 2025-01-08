"use client";
import {
  Grid,
  GridItem,
  Text,
  VStack,
  Skeleton,
  SkeletonText,
  Stack,
  Button,
  Select,
  Box,
  HStack,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { UseApi } from "@/hooks/useApi";
import { Products } from "@/services";
import { useEffect, useRef, useState, useCallback } from "react";
import { PartCard } from "../best-seller";
import { useDispatch, useSelector } from "react-redux";
import {
  attr,
  resetFilters,
  setArticleIds,
  setAttrValueIds,
  setCategoryName,
  setFound,
} from "@/redux/slices/filterSlice";
import Image from "next/image";
import { useScrollContext } from "@/providers/ScrollContext";
import { border } from "@chakra-ui/react";
import { CloseIcon } from "@/icons";
import { PartCardSkeleton } from "../skeletons/PartCardSkeleton";
import { setCarCompShow } from "@/redux/slices/carSlice";

type ProductPaginationProps = {
  categoryId: string | string[] | undefined;
};

type Product = {
  articleid: string;
  category: string;
  price: number;
  discount?: number;
};

export const ProductPagination = ({ categoryId }: ProductPaginationProps) => {
  const dispatch = useDispatch();
  const { scrollToSection } = useScrollContext();
  const { attrValueIds, articleIds } = useSelector(
    (state: any) => state.filter
  );
  const { carId } = useSelector((state: any) => state.car);
  const { partBrand } = useSelector((state: any) => state.filter);

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("price_asc");

  const observerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const [{ data, error, pagination }, fetchProduct] = UseApi({
    service: Products,
  });
  useEffect(() => {
    dispatch(resetFilters());
    setAttrValueIds([""]);
  }, []);
  // Reset everything when filters change
  useEffect(() => {
    if (categoryId) {
      // Only fetch if both categoryId and carId exist
      setPage(1);
      setProducts([]);
      setHasMore(true);
      setIsLoading(true);

      fetchProduct({
        carId,
        categoryId,
        ...(articleIds.length
          ? {
              attrValueId: attrValueIds.map((attrs: attr) => attrs.attrvalueid),
            }
          : {}),
        brandno: partBrand,
        page: 1,
      });
    }
  }, [categoryId, carId, attrValueIds, partBrand]);

  // Handle data updates
  useEffect(() => {
    if (data) {
      // Only process data if carId exists
      const newProducts = data || [];

      if (newProducts.length === 0) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      setProducts((prevProducts) => {
        if (page === 1) {
          return newProducts;
        } else {
          const existingIds = new Set(prevProducts.map((p) => p.articleid));
          const uniqueNewProducts = newProducts.filter(
            (p: any) => !existingIds.has(p.articleid)
          );
          return [...prevProducts, ...uniqueNewProducts];
        }
      });

      if (page === 1) {
        dispatch(
          setArticleIds(newProducts.map((item: Product) => item.articleid))
        );
        dispatch(setFound(pagination.total));
        if (newProducts[0]?.category) {
          dispatch(setCategoryName(newProducts[0].category));
        }
      }

      setIsLoading(false);
    }
  }, [data, dispatch, page, carId]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      // Only load more if carId exists
      setIsLoading(true);
      const nextPage = page + 1;
      setPage(nextPage);

      fetchProduct({
        carId,
        categoryId,
        ...(articleIds.length > 0 && {
          attrValueId: attrValueIds.map((attr: attr) => attr.attrvalueid),
        }),
        brandno: partBrand,
        page: nextPage,
      });
    }
  }, [
    isLoading,
    hasMore,
    page,
    carId,
    categoryId,
    attrValueIds,
    partBrand,
    fetchProduct,
  ]);

  useEffect(() => {
    // if (!carId) return; // Don't set up observer if no carId

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (observerRef.current) {
      observer.current.observe(observerRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loadMore, hasMore, isLoading, carId]);

  const sortedProducts = [...products].sort((a: any, b: any) => {
    const priceA = a.branchparts?.[0]?.price ?? 0;
    const priceB = b.branchparts?.[0]?.price ?? 0;

    if (sortOption === "price_asc") {
      return priceA - priceB;
    }
    if (sortOption === "price_desc") {
      return priceB - priceA;
    }
    return 0;
  });

  const LoadingSkeleton = () => (
    <Grid
      w="100%"
      gap="16px"
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <GridItem key={`skeleton-${index}`} w="full">
          <PartCardSkeleton />
        </GridItem>
      ))}
    </Grid>
  );

  // If no carId, render select car message
  if (!carId && categoryId !== "103100") {
    return (
      <VStack gap={6} w="85%" justify="flex-start">
        <Stack w={390} h={294} pos="relative">
          <Image
            src="/svgs/empty.svg"
            alt="garage.mn"
            fill
            // priority={true}
          />
        </Stack>
        <VStack gap={4} w="fit-content">
          <Text fontWeight={600} fontSize={14}>
            Та машинаа сонгон өөрт тохирох сэлбэгээ хайна уу.
          </Text>
          <Button
            onClick={() => {
              dispatch(setCarCompShow(true));
              scrollToSection();
            }}
            maxW={"full"}
          >
            Машинаа сонгох
          </Button>
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack gap={4} w={{ base: "100%", lg: "85%" }} position="relative" pb={20}>
      <HStack alignSelf="flex-start" w="full">
        <Stack alignSelf="flex-start">
          <Select
            bg="white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            fontSize={14}
            focusBorderColor="#F75B00"
            w={{ base: "100%", md: "fit-content" }}
          >
            <option value="price_asc">Үнэ өсөх</option>
            <option value="price_desc">Үнэ буурах</option>
          </Select>
        </Stack>
        {attrValueIds.length !== 0 && (
          <HStack w="full" justifyContent="flex-start">
            {attrValueIds.map((item: any, index: number) => (
              <HStack
                key={index}
                p={2}
                bg={"white"}
                borderRadius={8}
                gap={2}
                onClick={() => {
                  dispatch(
                    setAttrValueIds(
                      attrValueIds.filter((id: any) => id.name !== item.name)
                    )
                  );
                }}
              >
                <Text fontSize={12} cursor="pointer">
                  {item.name}
                </Text>
                <CloseIcon width={16} height={16} />
              </HStack>
            ))}
            <Stack p={2} bg={"white"} borderRadius={8}>
              <Text
                onClick={() => {
                  dispatch(setAttrValueIds([]));
                }}
                fontSize={12}
                color="#F75B00"
                cursor="pointer"
              >
                Цэвэрлэх
              </Text>
            </Stack>
          </HStack>
        )}
      </HStack>

      {isLoading && products.length === 0 ? (
        <LoadingSkeleton />
      ) : sortedProducts.length === 0 ? (
        <VStack w="100%" align="center" justify="center">
          <Stack w={390} h={390} pos="relative">
            <Image src="/svgs/empty.svg" alt="garage.mn" fill priority={true} />
          </Stack>
          <Text color="#717171" fontSize={18} fontWeight={600}>
            Таны сонгосон машинд тохирох сэлбэг байхгүй байна
          </Text>
        </VStack>
      ) : (
        <VStack w="100%" spacing={4}>
          <Grid
            w="100%"
            gap="16px"
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
          >
            {sortedProducts.map((item: any, index) => (
              <GridItem key={index} w="full">
                <PartCard part={item} isInPp={true} />
              </GridItem>
            ))}
          </Grid>

          {hasMore && (
            <Box w="100%" position="relative" minH="20px">
              <Box
                ref={observerRef}
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                h="20px"
              />
              {isLoading && <LoadingSkeleton />}
            </Box>
          )}
        </VStack>
      )}
    </VStack>
  );
};
