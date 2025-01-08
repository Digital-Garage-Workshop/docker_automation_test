"use client";
import {
  Grid,
  GridItem,
  Text,
  VStack,
  Skeleton,
  SkeletonText,
  Box,
  Stack,
  Select,
} from "@chakra-ui/react";
import { UseApi } from "@/hooks/useApi";
import { useEffect, useRef, useState, useCallback } from "react";
import { PartCard } from "../best-seller";
import { useDispatch, useSelector } from "react-redux";
import {
  setArticleIds,
  setCategoryName,
  setFound,
} from "@/redux/slices/filterSlice";
import Image from "next/image";
import { GetSaleParts } from "@/services/sale_parts/getSaleParts";

type ProductPaginationProps = {
  categoryId: string | string[] | undefined;
};

type Product = {
  articleid: string;
  category: string;
  price: number;
  discount?: number;
};

export const SalePartPagination = ({ categoryId }: ProductPaginationProps) => {
  const dispatch = useDispatch();
  const { attrValueIds } = useSelector((state: any) => state.filter);
  const { carId } = useSelector((state: any) => state.car);

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("price_asc");

  const observerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const [{ data, error }, fetchProduct] = UseApi({
    service: GetSaleParts,
  });

  // Reset everything when filters change
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    setIsLoading(true);

    fetchProduct({
      carId,
      categoryId,
      ...(attrValueIds.length ? { attrValueId: attrValueIds } : {}),
      page: 1,
    });
  }, [categoryId, carId, attrValueIds]);

  // Handle data updates
  useEffect(() => {
    if (data) {
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

      dispatch(
        setArticleIds(newProducts.map((item: Product) => item.articleid))
      );
      dispatch(setFound(newProducts.length));
      if (newProducts[0]?.category) {
        dispatch(setCategoryName(newProducts[0].category));
      }

      setIsLoading(false);
    } else {
      setHasMore(false);
      setIsLoading(false);
    }
  }, [data, dispatch, page]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      const nextPage = page + 1;
      setPage(nextPage);

      fetchProduct({
        carId,
        categoryId,
        ...(attrValueIds.length ? { attrValueId: attrValueIds } : {}),
        page: nextPage,
      });
    }
  }, [isLoading, hasMore, page, carId, categoryId, attrValueIds, fetchProduct]);

  useEffect(() => {
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
  }, [loadMore, hasMore, isLoading]);

  const sortedProducts = [...products].sort((a: any, b: any) => {
    if (sortOption === "price_asc")
      return a.branchparts?.[0].price || 0 - b.branchparts?.[0].price || 0;
    if (sortOption === "price_desc")
      return b.branchparts?.[0].price || 0 - a.branchparts?.[0].price || 0;
    if (sortOption === "discount_asc")
      return (
        (a.branchparts?.[0].salepercent || 0) -
        (b.branchparts?.[0].salepercent || 0)
      );
    if (sortOption === "discount_desc")
      return (
        (b.branchparts?.[0].salepercent || 0) -
        (a.branchparts?.[0].salepercent || 0)
      );
    return 0;
  });

  const LoadingSkeleton = () => (
    <Grid
      w="100%"
      gap="16px"
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <GridItem key={index}>
          <Skeleton
            height="300px"
            borderRadius="md"
            startColor="#E4E7EC"
            endColor="#E4E7EC"
          />
          <SkeletonText
            mt="4"
            noOfLines={2}
            spacing="4"
            skeletonHeight="16px"
            startColor="#E4E7EC"
            endColor="#E4E7EC"
          />
        </GridItem>
      ))}
    </Grid>
  );

  return (
    <VStack gap={4} w="85%" position="relative">
      <Stack
        alignSelf="flex-end"
        w="200px"
        display={sortedProducts?.length === 0 ? "none" : "flex"}
      >
        <Select
          bg="white"
          value={sortOption}
          fontSize={14}
          onChange={(e) => setSortOption(e.target.value)}
          focusBorderColor="#F75B00"
        >
          <option value="price_asc">Үнэ өсөхөөр</option>
          <option value="price_desc">Үнэ буурахаар</option>
          <option value="discount_asc">Хямдрал өсөхөөр</option>
          <option value="discount_desc">Хямдрал буурахаар</option>
        </Select>
      </Stack>

      {error && <Text color="red.500">{error.message}</Text>}

      {isLoading ? (
        <LoadingSkeleton />
      ) : sortedProducts.length === 0 ? (
        <VStack w="100%" align="center" justify="center">
          <Stack w={390} h={390} pos="relative">
            <Image src="/svgs/empty.svg" alt="garage.mn" fill priority={true} />
          </Stack>
          <Text fontSize={14} fontWeight={600}>
            Хямдралтай сэлбэг байхгүй байна
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
              md: "repeat(3, 1fr)",
            }}
          >
            {sortedProducts.map((item, index) => (
              <GridItem key={`${item.articleid}-${index}`}>
                <PartCard part={item} />
              </GridItem>
            ))}
          </Grid>

          {/* Loading and Observer container */}
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

export default SalePartPagination;
