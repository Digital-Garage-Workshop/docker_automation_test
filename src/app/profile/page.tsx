"use client";
import {
  Bonus,
  DeliveryInfo,
  GaragePoint,
  InviteFriends,
  MyGarage,
  Obd,
  Orders,
  SideBar,
  ViewedProducts,
} from "@/components";
import { PersonalInfo } from "@/components";
import { MyLotteries } from "@/components/profile/MyLotteries";
import { analytics, logEvent } from "@/config/firebaseConfig";
import { useMetadata } from "@/providers/MetadataProvider";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import { HStack, Stack, useBreakpointValue, border } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const { setMetadata } = useMetadata();
  const { data: session } = useSession();
  useEffect(() => {
    setMetadata({
      title: "Профайл",
      description: "",
      image: "",
      keywords: "",
    });
  }, []);

  const { clickedSideBar: clicked } = useSelector(
    (state: any) => state.profile
  );
  useEffect(() => {
    if (analytics) {
      // Example: Log a custom event when the app loads
      logEvent(analytics, "page_view", {
        page_name: "Profile Page",
      });
    }
  }, []);
  const dispatch = useDispatch();

  const sidebarValue = useBreakpointValue({
    base: "sideBar",
    sm: "sideBar",
    md: "sideBar",
    lg: "Хэрэглэгчийн тохиргоо",
    xl: "Хэрэглэгчийн тохиргоо",
  });

  // useEffect(() => {
  //   if (sidebarValue) {
  //     dispatch(setClickedSideBar({ clickedSideBar: sidebarValue }));
  //   }
  // }, [sidebarValue]);

  return (
    <Stack
      w="100vw"
      py={{ base: 14, md: 8 }}
      bg={{
        base: "#fff",
        sm: "#fff",
        md: "#fff",
        lg: "#F1F2F3",
        xl: "#F1F2F3",
      }}
      align="center"
      // pt={"64px"}
      minH={{ base: "fit", sm: "fit", md: "fit", lg: "100vh", xl: "100vh" }}
      mt={{
        base: "60px",
        sm: "60px",
        md: "60px",
        lg: "0",
        xl: "0",
      }}
    >
      <HStack
        w={{ base: "100%", sm: "100%", md: "100%", lg: "82%", xl: "82%" }}
        gap={6}
        align="flex-start"
      >
        <SideBar clicked={clicked} />
        <Stack
          w={{ base: "100%", sm: "100%", md: "100%", lg: "75%", xl: "75%" }}
          display={clicked === "sideBar" ? "none" : "flex"}
        >
          <PersonalInfo clicked={clicked} />
          <DeliveryInfo clicked={clicked} />
          <MyGarage clicked={clicked} />
          <ViewedProducts clicked={clicked} />
          <Orders clicked={clicked} />
          <GaragePoint clicked={clicked} />
          <Bonus clicked={clicked} />
          <InviteFriends clicked={clicked} />
          <Obd clicked={clicked} />
          <MyLotteries clicked={clicked} />
        </Stack>
      </HStack>
    </Stack>
  );
}
