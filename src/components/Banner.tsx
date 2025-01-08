import { AppStore, GooglePlay } from "@/icons";
import { Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export const Banner = () => {
  return (
    <VStack
      sx={{
        background:
          "url(https://images.unsplash.com/photo-1658285226355-7490109e090f?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90bywYWdlfHx8fGVufDB8fHx8fA%3D%3D) center/cover no-repeat",
      }}
      w={{ base: "100%", md: "100vw" }}
      minH={{ base: "354px", md: "344px", lg: "344px" }}
      alignItems="center"
      justifyContent="center"
      borderRadius={{ base: 8, md: 0 }}
      overflow="hidden"
      // p={{base: 4, md: 8}}
    >
      <Stack
        w="full"
        h="full"
        minH={{ base: "354px", md: "344px", lg: "344px" }}
        backdropFilter="auto"
        backdropBrightness="40%"
        py={{ base: 6, md: 8 }}
        gap={{ base: 8, md: 8 }}
        align="center"
        justify="center"
        textAlign="center"
      >
        <Stack gap={{ base: 2, md: "10px" }} align="center">
          <Heading
            color="#F75B00"
            fontWeight={600}
            fontSize={{ base: "16px", md: "18px" }}
          >
            DIGITAL GARAGE APP
          </Heading>
          <Text
            fontWeight={700}
            fontSize={{ base: "24px", md: "36px", lg: "40px" }}
            lineHeight={{ base: "28px", md: "42px", lg: "48px" }}
            color="white"
          >
            Манай Аппыг
            <br />
            Үнэгүй Суулгаарай
            {/* <br />
            авалтаа хийгээрэй. */}
          </Text>
        </Stack>
        <HStack gap={{ base: "16px", md: "21px" }}>
          <Link
            href="https://play.google.com/store/apps/details?id=com.garage.digital_garage"
            target="_blank"
          >
            <GooglePlay />
          </Link>
          <Link
            href=" https://apps.apple.com/mn/app/tsakhim-digital-garage/id6476136787"
            target="_blank"
          >
            <AppStore />
          </Link>
        </HStack>
      </Stack>
    </VStack>
  );
};
