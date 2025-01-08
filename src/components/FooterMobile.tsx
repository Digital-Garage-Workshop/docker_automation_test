// components/Footer.js
import { RightArrow } from "@/icons";
import { Facebook } from "@/icons/Facebook";
// import {ArrowUpIcon} from "@chakra-ui/icons/ArrowUp";
import {
  Box,
  Flex,
  Text,
  Link,
  VStack,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
} from "@chakra-ui/react";

const FooterMobile = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box
      display={{ base: "block", md: "none" }}
      bg="white"
      color="#344054"
      py={"24px"}
      px={"16px"}
    >
      <VStack direction={{ base: "column", md: "row" }} justify="space-between">
        {/* Accordion for mobile view */}
        <Accordion allowToggle display={{ base: "block", md: "none" }} w="100%">
          <AccordionItem>
            <h2>
              <AccordionButton py="16px">
                <Box flex="1" textAlign="left" fontWeight="bold">
                  ТУСЛАМЖ
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="start" spacing={3}>
                <Link href="#">Үйлчилгээний Нөхцөл</Link>
                <Link href="#">Түгээмэл Асуулт Хариулт</Link>
                <Link href="#">Нууцлалын бодлого</Link>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton py="16px">
                <Box flex="1" textAlign="left" fontWeight="bold">
                  МЭДЭЭЛЭЛ
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="start" spacing={3}>
                <Link href="#">Бидний тухай</Link>
                <Link href="#">Холбогдох</Link>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box h={10} />
        {/* Contact Information */}
        <HStack>
          <VStack align="start" spacing={3} mt={{ base: 5, md: 0 }} w="100%">
            <Text fontWeight="bold">Холбоо барих</Text>
            <Text>+976 7200 3003</Text>
            <Text>info@garage.mn</Text>
            <Text>Business Tower 18 давхарт, 2 тоот, Улаанбаатар, Монгол</Text>
          </VStack>
          <Box onClick={scrollToTop} cursor="pointer">
            <Flex
              border={"1px solid #1E1E1E"}
              p={3}
              borderRadius={"50%"}
              transform="rotate(-90deg)"
            >
              {/* <ArrowUpIcon boxSize={6} /> */}
              <RightArrow color="#1E1E1E" />
            </Flex>
          </Box>
        </HStack>
      </VStack>

      {/* Social Media Icons */}
      <Flex justify="center" mt={10} wrap="wrap" maxW="1200px" mx="auto">
        <HStack spacing={5}>
          <Link href="https://facebook.com" isExternal>
            <Icon as={Facebook} boxSize={6} />
          </Link>
          <Link href="https://instagram.com" isExternal>
            <Icon as={Facebook} boxSize={6} />
          </Link>
        </HStack>
      </Flex>

      {/* Copyright Section */}
      <Text textAlign="start" mt={5} fontSize="sm" color="gray.500">
        © 2024 — Copyright
      </Text>
    </Box>
  );
};

export default FooterMobile;
