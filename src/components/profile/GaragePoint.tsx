"use client";
import { UseApi } from "@/hooks/useApi";
import { GaragePointCard, GaragePointLogo } from "@/icons";
import { GpointHistory } from "@/services/user/gpointHistory";
import { UserGpoint } from "@/services/user/userGpoint";
import { formatNumber } from "@/utils/formatNumber";
import {
  Divider,
  HStack,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PointDetailModal } from "./PointDetailModal";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import { useDispatch } from "react-redux";

export const GaragePoint = (props: { clicked: string }) => {
  const { clicked } = props;
  const dispatch = useDispatch();
  const [histories, setHistories] = useState<any[]>([]);
  const [orderDetail, setOrderDetail] = useState<{
    point: number;
    type: string;
    orderid: number;
  } | null>(null);
  const {
    isOpen: pointDetailIsOpen,
    onClose: pointDetailOnClose,
    onOpen: pointDetailOnOpen,
  } = useDisclosure();
  const [
    { data: pointData, isLoading: pointIsloading, error: pointError },
    pointFetch,
  ] = UseApi({
    service: UserGpoint,
    useAuth: true,
  });

  const [
    {
      data: pointHistoryData,
      isLoading: pointHistoryIsloading,
      error: pointHistoryError,
    },
    pointHistoryFetch,
  ] = UseApi({
    service: GpointHistory,
    useAuth: true,
  });

  useEffect(() => {
    if (clicked === "Garage point") {
      pointFetch();
      pointHistoryFetch();
    }
  }, [clicked]);

  useEffect(() => {
    if (orderDetail && orderDetail.orderid && orderDetail.type) {
      pointDetailOnOpen();
    }
  }, [orderDetail]);

  useEffect(() => {
    if (pointHistoryData) {
      setHistories(pointHistoryData);
    }
  }, [pointHistoryData]);

  return (
    <VStack
      gap={6}
      w="100%"
      borderRadius={8}
      p={4}
      alignItems={"flex-start"}
      display={clicked === "Garage point" ? "flex" : "none"}
      minH={{ base: "86vh", sm: "86vh", md: "86vh", lg: "fit", xl: "fit" }}
      bg={{
        base: "transparent",
        sm: "transparent",
        md: "transparent",
        lg: "white",
        xl: "white",
      }}
    >
      <HStack
        mt={-4}
        alignSelf="flex-start"
        fontSize={14}
        display={{
          base: "flex",
          sm: "flex",
          md: "flex",
          lg: "none",
          xl: "none",
        }}
      >
        <Text
          onClick={() => {
            dispatch(setClickedSideBar({ clickedSideBar: "sideBar" }));
          }}
          cursor="pointer"
        >
          Home
        </Text>
        <Text fontSize={14}>|</Text>
        <Text fontWeight={600}>Garage Point</Text>
      </HStack>
      <Text fontSize={20} fontWeight={700}>
        Garage point
      </Text>
      <Divider />
      <Stack
        w="full"
        height={186}
        pos={"relative"}
        rounded={24}
        overflow={"hidden"}
      >
        <Image
          src="/garage-point.jpg"
          alt="garage.mn"
          fill
          style={{ objectFit: "cover" }}
        />
        <Text
          pos="absolute"
          top={6}
          left={8}
          color={"white"}
          fontSize={{ base: 14, sm: 14, md: 14, lg: 18, xl: 18 }}
        >
          ТАНЫ GARAGE POINT
        </Text>
        <Text
          pos="absolute"
          top={"130px"}
          left={8}
          color={"white"}
          fontSize={{ base: 20, sm: 20, md: 20, lg: 28, xl: 28 }}
          fontWeight={700}
        >
          {`${formatNumber(pointData?.point || 0)} G`}
        </Text>
        <Stack
          pos="absolute"
          bottom={"24px"}
          w={"93px"}
          h={"32px"}
          right={"24px"}
        >
          <Image src="/gpoint/gpointLogo.png" alt="gpoint" fill />
        </Stack>
      </Stack>
      {pointIsloading ? (
        <VStack w="full" gap={6}>
          {[...Array(3)].map((_, index) => (
            <VStack w="full" gap={4} key={index}>
              <Skeleton
                height="73px"
                width="full"
                borderRadius={8}
                startColor="#F9FAFB"
                endColor="#F9FAFB"
              />
            </VStack>
          ))}
        </VStack>
      ) : histories?.length !== 0 ? (
        histories?.map((item: any, index: number) => {
          return (
            <HStack
              key={item.id}
              w="full"
              justifyContent={"space-between"}
              p={{
                base: "8px 16px",
                sm: "8px 16px",
                md: "8px 16px",
                lg: "8px 32px",
                xl: "8px 32px",
              }}
              border={"1px solid #E4E7EC"}
              borderRadius={8}
              onClick={() => {
                setOrderDetail({
                  orderid: item.orderid,
                  point: item.point,
                  type: item.type,
                });
              }}
            >
              <HStack gap={4}>
                <GaragePointLogo />
                <VStack align={"flex-start"} gap={"6px"}>
                  <Text fontSize={18} fontWeight={700}>
                    {item.type === "in" ? "Орлого" : "Зарлага"}
                  </Text>
                  <HStack>
                    <Text
                      fontSize={{ base: 14, sm: 14, md: 14, lg: 16, xl: 16 }}
                    >
                      {item.date?.slice(0, 10)}
                    </Text>
                    <Text
                      fontSize={{ base: 14, sm: 14, md: 14, lg: 16, xl: 16 }}
                    >
                      {item.date?.slice(11, 16)}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              <HStack gap={"4px"}>
                <Text
                  color={item.type === "in" ? "#008060" : "#D72C0D"}
                  fontWeight={700}
                >
                  {item.type === "in" ? "+G" : "-G"}
                </Text>
                <Text
                  color={item.type === "in" ? "#008060" : "#D72C0D"}
                  fontWeight={700}
                >
                  {formatNumber(item.point)}
                </Text>
              </HStack>
            </HStack>
          );
        })
      ) : (
        <VStack w={"100%"} align="center" justify="center">
          <Stack w={822} pos="relative" justify="center" align="center">
            <Image
              src="/svgs/empty.svg"
              alt="garage.mn"
              width={390}
              height={294}
            />
          </Stack>
          <Text color="#667085" fontSize={14} fontWeight={600}>
            Танд G-Point ашигласан түүх одоогоор байхгүй байна
          </Text>
        </VStack>
      )}

      <PointDetailModal
        isOpen={pointDetailIsOpen}
        onClose={pointDetailOnClose}
        type={orderDetail?.type || ""}
        point={orderDetail?.point || 0}
        orderid={orderDetail?.orderid ? orderDetail?.orderid : 0 || 0}
      />
    </VStack>
  );
};
