import { VStack, Stack, HStack, Divider, Text } from "@chakra-ui/react";
import Image from "next/image";

type CarBrandCardProps = {
  id: number;
  categoryid: number;
  name: string;
  image: {
    imgurl400: string;
    imgurl800: string;
  };
  isSmall?: boolean;
};

export const NoCarCard = (props: CarBrandCardProps) => {
  const { isSmall, id, categoryid, name, image } = props;
  return (
    <VStack
      w="full"
      padding={isSmall ? "0px 16px 16px 16px" : "16px 16px"}
      gap="16px"
      alignItems="center"
      bg="white"
      border="1px solid transparent"
      _hover={{
        border: "1px solid #F75B00",
        transition: "border-color 300ms ease",
      }}
    >
      <Stack h="120px" w="120px" position="relative">
        <Image
          src={image ? image.imgurl400 : "/image.svg"}
          alt="catalog card img"
          fill
        />
      </Stack>
      <Text
        fontWeight={700}
        h={"48px"}
        textAlign={"center"}
        maxWidth={135}
        textOverflow={"wrap"}
        sx={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {name}
      </Text>
    </VStack>
  );
};
