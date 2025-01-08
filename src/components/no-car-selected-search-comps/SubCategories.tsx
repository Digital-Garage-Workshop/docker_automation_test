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
import {NoCarCard} from "../SearchCards";
import {useEffect, useState} from "react";
import {DownArrow} from "@/icons";
import Image from "next/image";

type SubCategoriesProps = {
  data: any[];
};

export const SubCategories = (props: SubCategoriesProps) => {
  const {data} = props;
  const [dataNumber, setDataNumber] = useState(6);

  const handleClick = () => {
    dataNumber >= data.length
      ? setDataNumber(6)
      : setDataNumber((prev) => prev + 8);
  };
  return (
    <VStack gap="32px" w="100%">
      <Stack gap="8px" alignItems="flex-start" w="100%">
        <Text fontWeight={700} color="#1E1E1E" fontSize="20px">
          Хүүхэд Машины агаар шүүгч category
        </Text>
      </Stack>
      {/* {isLoading ? (
        <Stack w="full" h={"80vh"} alignItems="center">
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#F75B00"
            size="xl"
          />
        </Stack>
      ) : ( */}
      <Grid
        w="100%"
        // templateColumns="repeat(6, 1fr)"
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(6, 1fr)",
        }}
        rowGap="24px"
        columnGap="24px"
      >
        {data === null ? (
          <Text></Text>
        ) : (
          data?.map((item: any, index: number) =>
            index < dataNumber ? (
              <GridItem key={index}>
                <HStack w="100%" gap={4}>
                  <Image
                    src={item.image || "./product.svg"}
                    width={56}
                    height={56}
                    alt="part img"
                  />
                  <Text fontWeight={600} color="#1E1E1E" fontSize="16px">
                    {item.name}
                  </Text>
                </HStack>
              </GridItem>
            ) : null
          )
        )}
      </Grid>
      {/* )} */}
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
