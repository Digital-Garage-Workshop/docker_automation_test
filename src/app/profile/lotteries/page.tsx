"use client";
import { OrderDetail, SideBar } from "@/components";
import { MyLotteries } from "@/components/profile/MyLotteries";
import { HStack, Stack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const { clickedSideBar: clicked } = useSelector(
    (state: any) => state.profile
  );
  const dispatch = useDispatch();
  return (
    <Stack
      w="100vw"
      py={8}
      bg={{
        base: "#fff",
        sm: "#fff",
        md: "#fff",
        lg: "#F1F2F3",
        xl: "#F1F2F3",
      }}
      align="center"
      pt={"64px"}
      minH="100vh"
    >
      <HStack
        w={{ base: "100%", sm: "100%", md: "100%", lg: "82%", xl: "82%" }}
        gap={6}
        align="flex-start"
      >
        <SideBar clicked={clicked} isInOrderDetail={true} />
        <MyLotteries clicked={clicked} />
      </HStack>
    </Stack>
  );
}
