"use client";
import { OrderDetail, SideBar } from "@/components";
import { useMetadata } from "@/providers/MetadataProvider";
import { HStack, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const { setMetadata } = useMetadata();

  useEffect(() => {
    setMetadata({
      title: "Захиалгын дэлгэрэнгүй",
      description: "",
      image: "",
      keywords: "",
    });
  }, []);
  const { clickedSideBar: clicked } = useSelector(
    (state: any) => state.profile
  );
  const dispatch = useDispatch();
  return (
    <Stack
      w="100vw"
      py={{ base: 16, md: 8 }}
      bg={{
        base: "#fff",
        sm: "#fff",
        md: "#fff",
        lg: "#F1F2F3",
        xl: "#F1F2F3",
      }}
      align="center"
      minH="100vh"
      mt={14}
    >
      <HStack
        w={{ base: "100%", sm: "100%", md: "100%", lg: "82%", xl: "82%" }}
        gap={6}
        align="flex-start"
      >
        <SideBar clicked={clicked} isInOrderDetail={true} />
        <OrderDetail />
      </HStack>
    </Stack>
  );
}
