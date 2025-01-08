"use client";
import {
  VStack,
  Text,
  background,
  Divider,
  HStack,
  Box,
  Button,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

import {useEffect, useState} from "react";
import {DotLottieSuccess} from "../global";

import {GoogleMap, Marker} from "@react-google-maps/api";

import {useDispatch, useSelector} from "react-redux";

import {useRouter} from "next/navigation";
import {useAppSelector} from "@/hooks/hooks";
import {formatCurrency} from "@/utils/number_formation";
import {clearOrderData} from "@/redux/slices/orderDataSlice";
import {setClickedSideBar} from "@/redux/slices/profileSlice";
import {clearPaymentData} from "@/redux/slices/paymentSlice";

export const containerStyle = {
  width: "100%",
  height: "650px",
  borderRadius: 8,
  border: "none",
  outline: "none",
};
export const PaymentSuccess = () => {
  const {shippingMethod} = useSelector((state: any) => state.shippingMethod);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const dispatch = useDispatch();
  const orderData = useAppSelector((state) => state.order.orderData);
  useEffect(() => {
    DotLottieSuccess();
    dispatch(clearPaymentData());
  }, []);
  const router = useRouter();

  const center = {
    lat: 47.918598,
    lng: 106.917907,
  };

  return (
    <HStack
      w={{base: "100%", md: "80%"}}
      flexDir={{base: "column-reverse", md: "row"}}
      gap={6}
      align={"flex-start"}
    >
      <Stack
        w={{base: "90%", md: "50%"}}
        p={6}
        bg={"white"}
        gap={3.5}
        mx={{base: "auto", md: 0}}
        borderRadius={8}
        justify={"flex-start"}
        display={shippingMethod === "delivery" ? "none" : "flex"}
      >
        <Text fontSize={20} fontWeight={700}>
          Таны очиж авах хаяг:
        </Text>

        {!isMapLoaded && (
          <Skeleton width="606px" height="440px" borderRadius={8} />
        )}

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          onLoad={() => setIsMapLoaded(true)}
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: false,
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      </Stack>
      <VStack
        mx={{base: "auto", md: "auto"}}
        w={{base: "90%", md: "458px"}}
        bg="white"
        gap={6}
        borderRadius={8}
        p="24px 40px"
        mb={{bae: "0px", md: "100px"}}
      >
        <VStack gap={2}>
          <canvas
            id="dotlottie-canvas"
            style={{width: 88, height: 88}}
          ></canvas>
          <Text fontSize={24} fontWeight={700}>
            {formatCurrency(orderData?.paidtotal ?? 0)}
          </Text>
          <Text>Төлбөр амжилттай төлөгдлөө</Text>
        </VStack>
        <Stack pos="relative" w="full">
          <Divider variant="dashed" />
          <Stack
            w="40px"
            h="40px"
            borderRadius={"99px"}
            bg="#F1F2F3"
            pos="absolute"
            top={"-20px"}
            left={"-60px"}
          />
          <Stack
            w="40px"
            h="40px"
            borderRadius={"99px"}
            bg="#F1F2F3"
            pos="absolute"
            top={"-20px"}
            right={"-60px"}
          />
        </Stack>

        <VStack gap={4} w="full">
          <VStack gap={2} w="full">
            <HStack justify="space-between" w="full">
              <Text>Автомашины мэдээлэл:</Text>
              <Text>{`${orderData?.platenumber}`}</Text>
            </HStack>
            {shippingMethod === "delivery" && (
              <HStack justify="space-between" w="full">
                <Text>Хүргэлтийн төлөв:</Text>
                <Text>{`${orderData?.deliverytype?.slice(16, 100)} цаг`}</Text>
              </HStack>
            )}

            <HStack justify="space-between" w="full">
              <Text>Захиалгын дугаар:</Text>
              <Text>{`#${orderData?.orderid}`}</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text>G-point</Text>
              <Text color={"green"}>{`+${orderData?.addpoint}G`}</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text>Бараа тоо:</Text>
              <Text>{`${orderData?.details.length}`}</Text>
            </HStack>

            {/* <HStack justify="space-between" w="full">
              <Text>G-point:</Text>
              <Text color={"green"}>{`+1,000G`}</Text>
            </HStack> */}
            {orderData?.point && (
              <HStack justify="space-between" w="full">
                <Text>G-point:</Text>
                <Text color={"red"}>{`-${orderData.point}G`}</Text>
              </HStack>
            )}

            {shippingMethod === "delivery" && (
              <HStack justify="space-between" w="full">
                <Text>Хүргэлт үнэ:</Text>
                <Text>{`${formatCurrency(orderData?.deliverytotal!)}`}</Text>
              </HStack>
            )}
            {shippingMethod === "pickup" && (
              <HStack justify="space-between" w="full">
                <Text>Захиалгын төрөл</Text>
                <Text>{`Очиж авах`}</Text>
              </HStack>
            )}
          </VStack>
          <Divider variant="dashed" />
          <HStack justify="space-between" w="full">
            <Text fontWeight={600}>Нийт үнэ:</Text>
            <Text fontWeight={700} fontSize={24}>
              {formatCurrency(orderData?.paidtotal ?? 0)}
            </Text>
          </HStack>
        </VStack>
        <Button
          onClick={() => {
            dispatch(clearOrderData());
            router.push("/profile");
            dispatch(setClickedSideBar({clickedSideBar: "Захиалгууд"}));
          }}
          fontWeight={600}
        >
          Захиалгын дэлгэрэнгүй
        </Button>
      </VStack>
    </HStack>
  );
};
