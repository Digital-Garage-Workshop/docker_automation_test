"use client";

import {SignIn as _SignIn} from "@/services/auth/auth";
import {Divider, HStack, Stack, Text, VStack} from "@chakra-ui/react";

import Image from "next/image";

export default function Login() {
  return (
    <Stack
      gap={"32px"}
      direction={"row"}
      padding={8}
      height={"100vh"}
      width={"100%"}
    >
      <VStack
        width={"50%"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"32px"}
      >
        <VStack maxWidth={380} gap={"32px"}>
          {/* <SignUpWithSocials /> */}
          <HStack width={"100%"}>
            <Divider orientation="horizontal" color={"#CFCFCF"} />
            <Text px={2} color={"#717171"} fontSize={"xs"} fontWeight={500}>
              ЭСВЭЛ
            </Text>
            <Divider />
          </HStack>
          {/* <SignUpFormControl /> */}
        </VStack>
      </VStack>
      <Stack
        width={"50%"}
        height="100%"
        position="relative"
        borderRadius="32px"
        overflow="hidden"
      >
        <Image src="/img.svg" fill alt="img" style={{objectFit: "cover"}} />
      </Stack>
    </Stack>
  );
}
