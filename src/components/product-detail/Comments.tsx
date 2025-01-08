import { Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import Rate from "../Rate";

export const Comments = (props: { commentData: any }) => {
  const { commentData } = props;

  return (
    <VStack
      w="full"
      gap={8}
      display={commentData?.length === 0 ? "none" : "flex"}
    >
      <Text fontSize={24} fontWeight={700} alignSelf="flex-start">
        Тухайн сэлбэгийн талаарх сэтгэгдэлүүд
      </Text>
      <HStack w="full" overflow="scroll">
        <Grid w="full" gap={6} templateColumns="repeat(4, 1fr)">
          {commentData?.map((item: any, index: number) => {
            if (index < 4) {
              return (
                <GridItem key={index}>
                  <VStack
                    gap={4}
                    p={6}
                    align="flex-start"
                    border="2px solid #EDEDED"
                    borderRadius={8}
                    h={228}
                  >
                    <VStack gap={1} w="full" align="flex-start">
                      <Text fontSize={12} color="#667085">
                        {item.date?.slice(0, 10)}
                      </Text>
                      <Text color="#717171" fontWeight={700}>
                        {item.name ? item.name : item.email}
                      </Text>
                    </VStack>
                    <Rate
                      rank={parseInt(item.star) || 5}
                      w="24"
                      h="24"
                      fill="#F75B00"
                    />
                    <Text>{item.comment}</Text>
                  </VStack>
                </GridItem>
              );
            }
          })}
        </Grid>
      </HStack>
    </VStack>
  );
};
