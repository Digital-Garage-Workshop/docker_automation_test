"use client";
import { HStack, Text, Box, Stack } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import {
  resetCarDetails,
  setCarCompShow,
  setChanged,
} from "@/redux/slices/carSlice";

export const VehicleDetail = () => {
  const dispatch = useDispatch();

  const carDetails = useSelector((state: any) => state.car);

  return (
    <HStack w="100%" display={carDetails.carId ? "flex" : "none"}>
      <Stack gap={{ base: 2, md: 8 }} flexDir={{ base: "column", md: "row" }}>
        <Text fontSize={18} fontWeight={600}>
          {carDetails.brandName} {carDetails.modelName} {carDetails.carName}
        </Text>

        <Text
          onClick={() => dispatch(setCarCompShow(true))}
          fontSize={14}
          fontWeight={700}
          color={"primary.500"}
          decoration={"underline"}
          cursor={"pointer"}
          display={carDetails.isCarCompShow ? "none" : "flex"}
        >
          Автомашин өөрчлөх
        </Text>

        {carDetails.isCarCompShow == true ? (
          <Text
            onClick={() => {
              dispatch(resetCarDetails());
              dispatch(setChanged());
            }}
            fontSize={14}
            fontWeight={700}
            color={"primary.500"}
            decoration={"underline"}
            cursor={"pointer"}
          >
            Автомашин устгах
          </Text>
        ) : null}
      </Stack>
    </HStack>
  );
};
