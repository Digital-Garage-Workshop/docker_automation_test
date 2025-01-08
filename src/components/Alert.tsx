"use client";

import { AlertIcon } from "@/icons";
import { Stack, HStack, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { parse } from "path";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const Alert = (props: { isRow: boolean }) => {
  const [isHidden, setIsHidden] = useState(true);
  const { isRow } = props;
  const carDetails = useSelector((state: any) => state.car);
  const pathname = usePathname();

  return (
    <Stack
      w="100vw"
      alignItems="center"
      bg="#F75B00"
      py={2}
      display={{
        base: "none",
        md: carDetails.carId ? "none" : isRow ? "flex" : "none",
      }}
      pt={{ base: 8, md: 2 }}
    >
      <HStack w="82%" gap={4} align="center" justify="center" ml={4}>
        <AlertIcon />
        <Text fontSize={14} color="white">
          Та тээврийн хэрэгслээ сонгож хайлтаа хийгээрэй, машинаа оруулаагүй
          тохиолдолд та машиндаа тохирохгүй зүйлийг худалдаж авч болзошгүй.
          Манай улсын дугаарын хайлт эсвэл модель сонгож хайлт хийнэ үү.
        </Text>
      </HStack>
    </Stack>
  );
};
