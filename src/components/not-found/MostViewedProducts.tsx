import { Grid, GridItem, Stack, VStack, Text } from "@chakra-ui/react";
import { PartCard } from "../best-seller";


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
];

export const MostViewedProducts = () => {
  return (
    <VStack gap="32px" w="100%">
      <Stack gap="8px" alignItems="flex-start" w="100%">
        <Text fontWeight={700} color="#1E1E1E" fontSize="20px">
          Шилдэг бүтээгдэхүүн
        </Text>
        <Text>Шилдэг бүтээгдэхүүнтэй танилцаарай</Text>
      </Stack>
      <Grid
        w="100%"
        templateColumns="repeat(4, 1fr)"
        rowGap="16px"
        columnGap="24px"
      >
        {/* {data.map((item, index) => (
          <GridItem key={index}>
            <PartCard part={item} />
          </GridItem>
        ))} */}
      </Grid>
    </VStack>
  );
};
