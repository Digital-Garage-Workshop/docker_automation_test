"use client";
import { Box, Text, useDisclosure, Button } from "@chakra-ui/react";
import { BurgerMenu } from "@/icons";
import { CategoryDrawer } from "./CategoryDrawer";

export const CategoryDropDown = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="relative">
      <Button
        w={{ base: 5, md: "fit-content" }}
        // h={10}
        gap={2}
        justifyContent="center"
        onClick={onOpen}
        leftIcon={<BurgerMenu />}
        variant="ghost"
        _hover={{ bg: "#F2F4F7" }}
        p="8px 24px"
      >
        <Text
          variant="outline"
          display={{ base: "none", md: "flex" }}
          fontWeight={700}
          fontSize={13}
          color={"#1E1E1E"}
          cursor="pointer"
        >
          Ангилал
        </Text>

        {/* <Stack display={{ base: "none", md: "flex" }}>
          <DownArrow color="#ffffff" w="20" h="20" />
        </Stack> */}
      </Button>
      <CategoryDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
