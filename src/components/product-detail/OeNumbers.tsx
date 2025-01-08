"use client";
import { useState, useEffect } from "react";
import {
  Grid,
  Text,
  VStack,
  GridItem,
  HStack,
  Button,
  Stack,
} from "@chakra-ui/react";
import { UseApi } from "@/hooks/useApi";
import { OeNumber } from "@/services";
import { DownArrow } from "@/icons";

export const OeNumbers = (props: { articleId: string }) => {
  const { articleId } = props;
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: OeNumber,
  });

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (articleId)
      fetch({
        articleId: articleId,
      });
  }, [articleId]);

  const handleShowMore = () => setShowAll(!showAll);

  const itemsToDisplay = showAll ? data : data?.slice(0, 20);

  return (
    <VStack gap={8} w="100%" display={data?.length ? "flex" : "none"}>
      <VStack gap={2} w="100%" align="flex-start">
        <Text fontSize={24} fontWeight={700} color="#1E1E1E">
          OE дугаарууд
        </Text>
        <Text color="#1E1E1E">
          OE лавлах дугаар(ууд) нь оригинал сэлбэгийн дугаартай харьцуулах
          боломжтой:
        </Text>
      </VStack>
      <Grid
        w="full"
        templateColumns={{
          base: `repeat(1, 1fr)`,
          sm: `repeat(2, 1fr)`,
          md: `repeat(3, 1fr)`,
          lg: `repeat(4, 1fr)`,
          xl: `repeat(3, 1fr)`,
        }}
        columnGap="61px"
      >
        {itemsToDisplay?.map((item: any, index: number) => (
          <GridItem key={index}>
            <HStack gap={2}>
              <Text color="#F75B00" fontWeight={600} fontSize={14} as="u">
                {`${item.oemnumber} `}
              </Text>
              <Text color="#F75B00" fontWeight={600} fontSize={14}>
                -
              </Text>
              <Text color="#F75B00" fontWeight={600} fontSize={14} as="u">
                {`${item.brandname}`}
              </Text>
            </HStack>
          </GridItem>
        ))}
      </Grid>
      {data?.length > 20 && (
        <Button
          onClick={handleShowMore}
          colorScheme="orange"
          variant="ghost"
          w={115}
          rightIcon={
            <Stack transform={showAll ? "rotate(180deg)" : "none"}>
              <DownArrow color="#1E1E1E" w="20" h="20" />
            </Stack>
          }
        >
          {showAll ? "Хураах" : "Харах"}
        </Button>
      )}
    </VStack>
  );
};
