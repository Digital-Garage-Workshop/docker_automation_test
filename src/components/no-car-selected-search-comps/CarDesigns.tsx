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

const data = [
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
  {
    images: {
      imgurl400: "/image.svg",
    },
  },
];

export const CarDesigns = () => {
  const [dataNumber, setDataNumber] = useState(8);

  const handleClick = () => {
    dataNumber >= data.length
      ? setDataNumber(8)
      : setDataNumber((prev) => prev + 8);
  };
  return (
    <VStack gap="32px" w="100%">
      <Stack gap="8px" alignItems="flex-start" w="100%">
        <Text fontWeight={700} color="#1E1E1E" fontSize="20px">
          Машины загварууд
        </Text>
      </Stack>
      <Grid w="100%" templateColumns="repeat(4, 1fr)" gap="16px">
        {data?.map((item: any, index: any) =>
          dataNumber >= index + 1 ? (
            <GridItem key={index}>
              <HStack
                h="60px"
                w="100%"
                bg="#F8F9FA"
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
                <VStack gap={0} alignItems="flex-start">
                  <Text fontSize={14} fontWeight={500}>
                    MERCEDES-BENZ
                  </Text>
                  <Text fontSize={14} fontWeight={500}>
                    C-CLASS
                  </Text>
                </VStack>
              </HStack>
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
