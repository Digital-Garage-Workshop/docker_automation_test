"use client";
import {Grid, GridItem, Stack, VStack, Text, Button} from "@chakra-ui/react";
import {DownArrow} from "@/icons";
import Image from "next/image";
import {UseApi} from "@/hooks/useApi";
import {useEffect, useState} from "react";
import {PartsBrands as _PartsBrands} from "@/services";

export const CarBrandsSuggest = () => {
  const [{data, isLoading, error}, fetch] = UseApi({
    service: _PartsBrands,
  });
  const [dataNumber, setDataNumber] = useState(8);

  const handleClick = () => {
    dataNumber >= data.length
      ? setDataNumber(8)
      : setDataNumber((prev) => prev + 8);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <VStack gap="32px" w="100%">
      <Stack gap="8px" alignItems="flex-start" w="100%">
        <Text fontWeight={700} color="#1E1E1E" fontSize="20px">
          Манай онлайн дэлгүүрээс шилдэг брэндийн автомашины хөдөлгүүрийн агаар
          шүүгчийг худалдаж аваарай.
        </Text>
      </Stack>
      <Grid w="100%" templateColumns="repeat(8, 1fr)" gap="16px">
        {data?.map((item: any, index: any) =>
          dataNumber >= index + 1 ? (
            <GridItem key={index}>
              <Stack
                h="80px"
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
      <Button
        variant="filleds"
        rightIcon={<DownArrow color="black" w="20" h="20" />}
        onClick={handleClick}
      >
        More Brands{" "}
      </Button>
    </VStack>
  );
};
