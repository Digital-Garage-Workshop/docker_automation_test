import { VStack, Stack, HStack, Divider, Text } from "@chakra-ui/react";
import Image from "next/image";

type CarBrandCardProps = {
  images: {
    imgurl200: string;
    imgurl400: string;
  };
  name: string;
};

export const CarBrandCard = (props: CarBrandCardProps) => {
  const { images, name } = props;
  return (
    <VStack
      w="full"
      padding="16px 24px"
      alignItems="center"
      bg="white"
      border="1px solid #EDEDED"
      borderRadius={8}
    >
      <Text
        fontWeight={700}
        fontSize={14}
        textAlign="center"
        h={25}
        noOfLines={1}
      >
        {name}
      </Text>
    </VStack>
  );
};
