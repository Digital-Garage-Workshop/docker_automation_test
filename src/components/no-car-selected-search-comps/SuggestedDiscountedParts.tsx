import { Grid, GridItem, Stack, VStack, Text } from "@chakra-ui/react";
import { PartCard } from "../best-seller/partCard";


const data = [
  {
    img: "/image 11.jpg",
    title: "Tires",
  },
  {
    img: "/image 11.jpg",
    title: "Tires",
  },
  {
    img: "/image 11.jpg",
    title: "Tires",
  },
  {
    img: "/image 11.jpg",
    title: "Tires",
  },
  {
    img: "/image 11.jpg",
    title: "Tires",
  },
];

export const SuggestedDiscountedParts = () => {
  return (
    <VStack gap="32px" w="100%" mb="80px">
      <Stack gap="8px" alignItems="flex-start" w="100%">
        <Text fontWeight={700} color="#1E1E1E" fontSize="20px">
          Бусад хямд чанартай агаар шүүгчнүүд
        </Text>
        <Text>
          Агаар шүүгч ангиллын хамгийн их борлуулалттай сэлбэг хэрэгсэл. Та
          манай автомашины сэлбэг хэрэгслийн төрөл бүрийн агаар шүүгч болон
          бусад боломжийн үнийн саналуудаас сонгох боломжтой.
        </Text>
      </Stack>
      <Grid
        w="100%"
        templateColumns="repeat(5, 1fr)"
        rowGap="16px"
        columnGap="24px"
      >
        {data.map((item, index) => (
          <GridItem key={index}>
            <PartCard/>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};
