"use client";

import {
  DownArrow,
  UserIcon,
  MapIcon,
  CarIcon,
  HistoryIcon,
  GiftIcon,
  LittleHomeIcon,
  FriendIcon,
  LogOutIcon,
} from "@/icons";
import { LittleStar } from "@/icons/LittleStar";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import { HStack, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { AreYouSureModal } from "./AreYouSureModal";
import { ObdIcon } from "@/icons/ObdIcon";

export const SideBar = (props: {
  // setClicked: Dispatch<SetStateAction<string>>;
  clicked: string;
  isInOrderDetail?: boolean;
}) => {
  const { clicked, isInOrderDetail } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    isOpen: sureToLogOut,
    onClose: logOutOnClose,
    onOpen: logOutOnOpen,
  } = useDisclosure();

  const data = [
    {
      name: "Хэрэглэгчийн тохиргоо",
      activeIcon: <UserIcon color="white" />,
      inactiveIcon: <UserIcon color="#1E1E1E" />,
      action: () => {},
    },
    {
      name: "Миний гараж",
      activeIcon: <LittleHomeIcon color="white" />,
      inactiveIcon: <LittleHomeIcon color="#1E1E1E" />,
      action: () => {},
    },
    {
      name: "Хүргэлтийн хаяг",
      activeIcon: <MapIcon color="white" />,
      inactiveIcon: <MapIcon color="#1E1E1E" />,
      action: () => {},
    },
    {
      name: "Захиалгууд",
      activeIcon: <CarIcon color="#fff" />,
      inactiveIcon: <CarIcon color="#1E1E1E" />,
      action: () => {},
    },

    {
      name: "Garage point",
      activeIcon: <GiftIcon color="white" />,
      inactiveIcon: <GiftIcon color="#1E1E1E" />,
      action: () => {},
    },
    {
      name: "Урамшуулал",
      activeIcon: <LittleStar color="white" />,
      inactiveIcon: <LittleStar color="#1E1E1E" />,
      action: () => {},
    },

    {
      name: "Үзсэн",
      activeIcon: <HistoryIcon color="white" />,
      inactiveIcon: <HistoryIcon color="#1E1E1E" />,
      action: () => {},
    },
    {
      name: "Найзаа урих",
      activeIcon: <FriendIcon color="white" />,
      inactiveIcon: <FriendIcon color="#1E1E1E" />,
      action: () => {},
    },

    {
      name: "Системээс гарах",
      activeIcon: <LogOutIcon color="white" />,
      inactiveIcon: <LogOutIcon color="#1E1E1E" />,
      action: () => {
        logOutOnOpen();
      },
    },
  ];

  return (
    <VStack
      w={{ base: "100%", sm: "100%", md: "100%", lg: "25%", xl: "25%" }}
      borderRadius={"8px"}
      gap={2}
      bg={{
        base: "transparent",
        sm: "transparent",
        md: "transparent",
        lg: "white",
        xl: "white",
      }}
      overflow="hidden"
      display={{
        base: clicked === "sideBar" ? "flex" : "none",
        sm: clicked === "sideBar" ? "flex" : "none",
        md: clicked === "sideBar" ? "flex" : "none",
        lg: "flex",
        xl: "flex",
      }}
      p={{ base: 4, sm: 4, md: 4, lg: 0, xl: 0 }}
      minH={{
        base: "86vh",
        sm: "86vh",
        md: "86vh",
        lg: "fit-content",
        xl: "fit-content",
      }}
    >
      <Text
        fontWeight={700}
        fontSize={20}
        alignSelf="flex-start"
        display={{
          base: "flex",
          sm: "flex",
          md: "flex",
          lg: "none",
          xl: "none",
        }}
      >
        Your Account
      </Text>
      <VStack w="full" gap={{ base: 2, md: 0 }}>
        {data.map((item, index) => (
          <HStack
            key={item.name}
            onClick={() => {
              item.action();
              if (item.name !== "Системээс гарах") {
                if (isInOrderDetail) {
                  dispatch(setClickedSideBar({ clickedSideBar: item.name }));
                  router.push("/profile");
                } else {
                  dispatch(setClickedSideBar({ clickedSideBar: item.name }));
                }
              }
            }}
            w="full"
            p="16px"
            justify="space-between"
            bg={clicked.includes(item.name) ? "#F75B00" : "white"}
            cursor={"pointer"}
            align="flex-start"
            mt={item.name === "Системээс гарах" ? 6 : 0}
            borderRadius={8}
            border={{
              base: "1px solid #D0D5DD",
              sm: "1px solid #D0D5DD",
              md: "1px solid #D0D5DD",
              lg: "none",
              xl: "none",
            }}
          >
            <HStack gap={2}>
              {clicked.includes(item.name)
                ? item.activeIcon
                : item.inactiveIcon}
              <Text
                fontSize={14}
                fontWeight={600}
                color={clicked.includes(item.name) ? "white" : "#1E1E1E"}
              >
                {item.name.toString()}
              </Text>
            </HStack>
            <Stack sx={{ transform: "rotate(-90deg)" }}>
              <DownArrow
                color={clicked.includes(item.name) ? "white" : "#717171"}
                w="16"
                h="16"
              />
            </Stack>
          </HStack>
        ))}
      </VStack>
      <AreYouSureModal
        title="Та системээс гарахдаа итгэлтэй байна уу?"
        description=""
        isOpen={sureToLogOut}
        onClose={logOutOnClose}
        buttonString="Гарах"
        action={() => {
          signOut({ redirect: true, callbackUrl: "/" });
          dispatch(
            setClickedSideBar({ clickedSideBar: "Хэрэглэгчийн тохиргоо" })
          );
        }}
        setToDefault={true}
      />
    </VStack>
  );
};
