"use client";
import { ChevronDownIcon } from "@/icons";
import {
  VStack,
  Stack,
  HStack,
  Divider,
  Text,
  Heading,
} from "@chakra-ui/react";
import Image from "next/image";
import { ChakraNextImage } from "../global/image";

interface Image {
  imgurl400: string;
  imgurl800: string;
}

interface CategoryData {
  id: number;
  categoryid: number;
  name: string;
  image: Image;
  isSubcategoryOpen: boolean;
  isInSameRow: boolean;
}

export const CatalogCard = (props: CategoryData) => {
  const { name, image, isSubcategoryOpen } = props;

  return (
    <VStack
      borderRadius={8}
      top={0}
      w="full"
      // h={264}
      h={{ base: 194, sm: 194, md: 264, lg: 264, xl: 264 }}
      padding="16px 8px"
      gap="16px"
      alignItems="center"
      bg="white"
      border={isSubcategoryOpen ? "1px solid #F75B00" : "1px solid transparent"}
      _hover={{
        border: "1px solid #F75B00",
        transition: "border-color 300ms ease",
      }}
    >
      <Stack h="120px" w="121px" position="relative">
        <ChakraNextImage
          src={image === null ? "/mercedes.svg" : image.imgurl400}
          alt={`${name}`}
          // style={{objectFit: "cover"}}
          // fill
          width={100}
          height={100}
          loading="lazy"
          // layout="fill"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px)"
        />
      </Stack>

      <HStack
        width={"100%"}
        display={{
          base: "none",
          sm: "none",
          md: "flex",
          lg: "flex",
          xl: "flex",
        }}
      >
        <Divider orientation="horizontal" color={"#CFCFCF"} />
        <ChevronDownIcon />
        <Divider />
      </HStack>
      <Heading
        fontWeight={700}
        fontSize={14}
        lineHeight={"150%"}
        textAlign="center"
        w={{ base: "120px", sm: "full", md: 40, lg: "full", xl: "full" }}
        h={{ base: 10, sm: 10, md: 12, lg: "fit", xl: "fit" }}
        overflow={{
          base: "hidden",
          sm: "hidden",
          md: "flex",
          lg: "flex",
          xl: "flex",
        }}
        textOverflow={{
          base: "ellipsis",
          sm: "ellipsis",
          md: "flex",
          lg: "flex",
          xl: "flex",
        }}
        whiteSpace={{
          base: "nowrap",
          sm: "normal",
          md: "normal",
          lg: "normal",
          xl: "normal",
        }}
      >
        {name}
      </Heading>
    </VStack>
  );
};
