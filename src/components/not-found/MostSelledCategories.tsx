import { Grid, Text, VStack, HStack, Stack, GridItem } from "@chakra-ui/react";
import Image from "next/image";

const data = [
  {
    img: "/image.svg",
    title: "Oil Filter",
  },
  {
    img: "/image.svg",
    title: "Oil Filter",
  },
  {
    img: "/image.svg",
    title: "Oil Filter",
  },
  {
    img: "/image.svg",
    title: "Oil Filter",
  },
  {
    img: "/image.svg",
    title: "Oil Filter",
  },
  {
    img: "/image.svg",
    title: "Oil Filter",
  },
  {
    img: "/image.svg",
    title: "Oil Filter",
  },
  {
    img: "/image.svg",
    title: "Oil Filter",
  },
  {
    img: "/image.svg",
    title: "Oil Filter",
  },
  {
    img: "/image.svg",
    title: "Oil Filter",
  },
  {
    img: "/image.svg",
    title: "Oil Filter",
  },
];

export const MostSelledCategories = () => {
  return (
    <VStack w="full" gap="32px">
      <Text fontSize={20} fontWeight={700}>
        Шилдэг category
      </Text>
      <Grid
        w="100%"
        gap={6}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        {data.map((item, index) => (
          <GridItem key={index} w="100%">
            <HStack key={index} gap="16px" w="100%">
              <Stack pos="relative" w="56px" h="56px">
                <Image src={item.img} alt={item.title} fill />
              </Stack>
              <Text fontSize={16} fontWeight={600}>
                {item.title}
              </Text>
            </HStack>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};
