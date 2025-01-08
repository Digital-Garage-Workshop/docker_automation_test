import {
  Grid,
  GridItem,
  Stack,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { PartCard } from "../best-seller";
import { useEffect, useState } from "react";
import { UseApi } from "@/hooks/useApi";
import { useSelector } from "react-redux";
import { RelatedProduct } from "@/services/relatedParts";
import { useParams } from "next/navigation";
import { DownArrow } from "@/icons";
import { PartCardSkeleton } from "../skeletons/PartCardSkeleton";

export const SimilarProducts = (props: { categoryid: number }) => {
  const { categoryid } = props;
  const [
    { data, isLoading: productLoader, error: productError },
    fetchProduct,
  ] = UseApi({
    service: RelatedProduct,
  });
  const params = useParams();
  const { carId } = useSelector((state: any) => state.car);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (params?.productid && categoryid)
      fetchProduct({
        articleid: params?.productid,
        categoryid: categoryid,
        carid: carId,
      });
  }, [carId]);

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const offset = -currentPage * 101;

  return (
    <VStack
      gap="32px"
      w="100%"
      display={data?.length === 0 ? "none" : "flex"}
      pos="relative"
    >
      <Stack gap="8px" alignItems="flex-start" w="100%">
        <Text fontWeight={700} color="#1E1E1E" fontSize={24}>
          Ижил төстэй бараанууд
        </Text>
      </Stack>
      <HStack w="full" overflow={"scroll"}>
        <HStack w="full">
          <Button
            variant="outline"
            w={8}
            h={8}
            p={1}
            display={{
              base: "none",
              md: data?.length > itemsPerPage ? "flex" : "none",
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
            w="100%"
            templateColumns={`repeat(${data?.length}, 1fr)`}
            rowGap="16px"
            columnGap="24px"
            transform={`translateX(${offset}%)`}
            transition="transform 0.5s ease"
            style={{ display: "flex", gap: "24px" }}
          >
            {productLoader
              ? [1, 2, 3, 4, 5, 6].map((el) => <PartCardSkeleton key={el} />)
              : data?.map((item: any, index: number) => (
                  <GridItem key={index} w={275}>
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
              md: data?.length > itemsPerPage ? "flex" : "none",
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
      </HStack>
    </VStack>
  );
};
