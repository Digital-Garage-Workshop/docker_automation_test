// components/Footer.js
import {
  Box,
  Flex,
  Text,
  Link,
  VStack,
  HStack,
  Icon,
  Divider,
} from "@chakra-ui/react";

import { Facebook } from "@/icons/Facebook";
import { GarageLogoGrey } from "@/icons/GarageLogoGrey";
import { Instagram } from "@/icons/Instagram";
import { RightArrow } from "@/icons";

const Footer = () => {
  // Function to handle scroll-to-top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      bg="#1E1E1E"
      color="white"
      px="72px"
      py="64px"
      display={{ base: "none", md: "block" }}
      pos="sticky"
      bottom={0}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        mx="auto"
        h={260}
      >
        <VStack align="start" spacing={3}>
          <Text opacity={0.4} fontWeight="bold" fontSize={12}>
            ТУСЛАМЖ
          </Text>
          {/* <Link opacity={0.6} fontSize={14} href="/terms-and-condition">
            Үйлчилгээний нөхцөл
          </Link> */}
          <Link opacity={0.6} fontSize={14} href="/faq">
            Түгээмэл асуулт & хариулт
          </Link>
          {/* <Link opacity={0.6} fontSize={14} href="/privacy-and-policy">
            Нууцлалын бодлого
          </Link> */}
        </VStack>
        {/* <VStack align="start" spacing={3}>
          <Text opacity={0.4} fontSize={12} fontWeight="bold">
            МЭДЭЭЛЭЛ
          </Text>
          <Link fontSize={14} opacity={0.6} href="#">
            Бидний тухай
          </Link>
          <Link fontSize={14} opacity={0.6} href="#">
            Холбогдох
          </Link>
        </VStack> */}
        <Box w={2} h={2} />

        <VStack align="end" spacing={3} h={"100%"} justify={"space-between"}>
          <Icon as={GarageLogoGrey} boxSize="50px" mb={2} />
          <Divider w={45} />
          <VStack gap={4} align="flex-end">
            <Text opacity={0.6}>+976 7200 3003</Text>
            <Text opacity={0.6}>info@garage.mn</Text>
            <Text opacity={0.6} maxW={220} textAlign="end">
              Business Tower 18 давхарт, 2 тоот, Улаанбаатар, Монгол
            </Text>
          </VStack>
        </VStack>
      </Flex>

      <Divider my={5} borderColor="gray.700" />

      <Flex
        justify="space-between"
        align="center"
        mx="auto"
        direction={{ base: "column", md: "row" }}
      >
        <HStack spacing={40}>
          <Link href="https://www.facebook.com/digital.garage.mn" isExternal>
            <HStack spacing={30} justifyContent={"space-between"}>
              <Text opacity={0.6}>Facebook</Text>
              <Icon as={Facebook} boxSize={5} />
            </HStack>
          </Link>
          <Link
            href="https://www.instagram.com/digital_garage_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            isExternal
          >
            <HStack spacing={30} justifyContent={"space-between"}>
              <Text opacity={0.6}>Instagram</Text>
              <Icon as={Instagram} boxSize={5} />
            </HStack>
          </Link>
        </HStack>
      </Flex>
      <Box h={10} />
      <HStack justifyContent={"space-between"}>
        <Text opacity={0.4} mt={{ base: 5, md: 0 }}>
          © 2020 - 2024. Digital Garage LLC
        </Text>
        <Box onClick={scrollToTop} cursor="pointer">
          <Flex
            border={"1px solid white"}
            p={3}
            borderRadius={"50%"}
            transform="rotate(-90deg)"
          >
            {/* <ArrowUpIcon boxSize={6} /> */}
            <RightArrow color="white" />
          </Flex>
        </Box>
      </HStack>
    </Box>
  );
};

export default Footer;
