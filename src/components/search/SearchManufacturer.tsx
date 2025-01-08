"use client";
import {
  Grid,
  GridItem,
  Stack,
  VStack,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import {DownArrow} from "@/icons";
import Image from "next/image";
import {UseApi} from "@/hooks/useApi";
import {useEffect, useState} from "react";
import {PartsBrands as _PartsBrands} from "@/services";

export const SearchManufacturer = () => {
  const [{data, isLoading, error}, fetch] = UseApi({
    service: _PartsBrands,
  });
  const [dataNumber, setDataNumber] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const handleClick = () => {
    dataNumber >= data.length
      ? setDataNumber(8)
      : setDataNumber((prev) => prev + 8);
  };

  const visibleItems = data?.slice(currentPage, currentPage + itemsPerPage);

  const handleNext = () => {
    if (currentPage < data?.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <VStack gap="32px" w="100%" pos="relative">
      <Stack gap="8px" alignItems="flex-start" w="100%">
        <Text fontWeight={600} color="#1E1E1E" fontSize={18}>
          Үйлдвэрлэгчид
        </Text>
      </Stack>
      <HStack w="100%" gap={2} p={0}>
        <Stack>
          <Button
            disabled={currentPage === 0}
            onClick={handlePrev}
            p={0}
            _hover={{bg: "#F1F2F3"}}
            bg="#F1F2F3"
            sx={{transform: "rotate(90deg)"}}
            w="24px"
            h="24px"
            gap={0}
          >
            <DownArrow color="#354052" w="24" h="24" />
          </Button>
        </Stack>
        <Grid
          maxW="100%"
          overflowX="auto"
          gap={2}
          templateColumns={`repeat(${data?.length}, 155px)`}
        >
          {data?.map((item: any, index: any) =>
            dataNumber >= index + 1 ? (
              <GridItem key={index}>
                <Stack
                  h="64px"
                  w="100%"
                  bg="white"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{
                    border: "1px solid #F75B00",
                    transition: "border-color 300ms ease",
                  }}
                >
                  <Stack position="relative" w="87px" h="48px">
                    <Image
                      src={item.images ? item.images.imgurl400 : ""}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px)"
                      style={{objectFit: "contain"}}
                    />
                  </Stack>
                </Stack>
              </GridItem>
            ) : null
          )}
        </Grid>
        <Stack>
          <Button
            disabled={currentPage >= data?.length - 1}
            onClick={handleNext}
            p={0}
            bg="#F1F2F3"
            _hover={{bg: "#F1F2F3"}}
            sx={{transform: "rotate(-90deg)"}}
            w="24px"
            h="24px"
            gap={0}
          >
            <DownArrow color="#354052" w="24" h="24" />
          </Button>
        </Stack>
      </HStack>
    </VStack>
  );
};
