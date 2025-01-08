"use client";
import { DeliveryIcon, FastDeliveryIcon, FilledInfo, GrayInfo } from "@/icons";
import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { GoogleMapWithSearch } from "./GoogleMap";
import { SelectProvince } from "./SelectProvince";
import UbDelivery from "./UbDelivery";

export const SelectAddress = () => {
  const [isUb, setUb] = useState(true);

  const orderData = useAppSelector((state) => state.order.orderData);

  if (!orderData) {
    return null;
  }
  return (
    <VStack
      gap={"16px"}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      w={{ base: "100%", md: "82%" }}
      pb={20}
      p={{ base: 4, md: 0 }}
    >
      <HStack gap={0} p={1} borderRadius={8} bg="white">
        <Button onClick={() => setUb(true)} variant={isUb ? "navy" : "ghost"}>
          Улаанбаатар доторх
        </Button>

        <Button onClick={() => setUb(false)} variant={!isUb ? "navy" : "ghost"}>
          Хөдөө орон нутаг
        </Button>
      </HStack>
      <Box
        w={"full"}
        p={{ base: 4, md: 0 }}
        borderRadius={8}
        bg={{ base: "white", md: "transparent" }}
      >
        <SelectProvince isUb={isUb} orderData={orderData} />
        <HStack
          p={{ base: 0, md: "24px 32px" }}
          gap="24px"
          bg={{ base: "transparent", md: "white" }}
          flexDir={{ base: "column", md: "row" }}
          borderRadius={8}
          sx={{ display: isUb ? "flex" : "none" }}
          w="full"
        >
          <Stack w={{ base: "100%", md: "50%" }}>
            <GoogleMapWithSearch />
          </Stack>

          <Stack w={{ base: "100%", md: "50%" }}>
            <UbDelivery isUb={isUb} orderData={orderData} />
          </Stack>
        </HStack>
      </Box>
    </VStack>
  );
};
