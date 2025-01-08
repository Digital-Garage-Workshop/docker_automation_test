"use client";
// app/not-found.tsx
"use client";
import { Button, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <VStack w="100vw" h="100vh" align="center" justify="center" bg="white">
      <VStack gap={8}>
        <Stack w={540} h={360} pos="relative">
          <Image src="/404.png" alt="garage.mn" fill />
        </Stack>
        <VStack gap={4}>
          <VStack gap={2} align="center">
            <Text fontSize={28} fontWeight={700} alignSelf="center">
              Энэ хуудас байхгүй бололтой!
            </Text>
            <Text alignSelf="center">
              Нүүр хуудас руу буцан үргэлжлүүлэн хайлтаа хийгээрэй
            </Text>
          </VStack>
          <Link href={"/"}>
            <Button w="214px" alignSelf="center">
              Нүүр хуудас руу буцах
            </Button>
          </Link>
        </VStack>
      </VStack>
    </VStack>
  );
}
