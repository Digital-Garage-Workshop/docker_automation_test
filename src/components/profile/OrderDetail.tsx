"use client";
import { InfoIcon, LocationIcon } from "@/icons";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { OrderDetailCard } from "./OrderDetailCard";
import { formatCurrency } from "@/utils/number_formation";
import { formatNumber } from "@/utils/formatNumber";
import { useParams, useRouter } from "next/navigation";
import { UseApi } from "@/hooks/useApi";
import { GetOrderDetail } from "@/services/user/orderDetail";
import { UserGpoint } from "@/services/user/userGpoint";
import { SetPoint } from "@/services/createOrder/setPoint";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { CancelOrder } from "@/services/user/cancelOrder";
import { useCustomToast } from "@/hooks/useCustomToast";
import { setPaymentData } from "@/redux/slices/paymentSlice";
import { GetPayment } from "@/services/createOrder/getPayment";
import { setOrderData } from "@/redux/slices/orderDataSlice";

export const OrderDetail = () => {
  const dispatch = useDispatch();
  const [selectedState, setSelectedState] = useState("Бүгд");
  const [isChecked, setIsChecked] = useState(false);
  const params = useParams();
  const router = useRouter();
  const showToast = useCustomToast();
  const [{ data, error, isLoading }, fetch] = UseApi({
    service: GetOrderDetail,
    useAuth: true,
  });
  const [
    { data: paymentData, isLoading: paymentLoader, error: paymentError },
    getPaymentData,
  ] = UseApi({
    service: GetPayment,
    useAuth: true,
  });

  const [
    { data: userGpoint, error: userGpointError, isLoading: userGpointLoader },
    userGpointFetch,
  ] = UseApi({
    service: UserGpoint,
    useAuth: true,
  });
  const [
    { data: usePointData, error: usePointError, isLoading: usePointLoader },
    usePoint,
  ] = UseApi({
    service: SetPoint,
    useAuth: true,
  });

  const [
    {
      data: cancelOrderData,
      error: cancelOrderError,
      isLoading: cancelOrderLoader,
    },
    cancelOrderByUser,
  ] = UseApi({
    service: CancelOrder,
    useAuth: true,
  });
  const [products, setProducts] = useState<any | null>(null);
  const [isPayDisabled, setPayDisabled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const checkPayButton = () => {
    if (data?.status === "Дууссан") {
      setPayDisabled(true);
    }
  };

  useEffect(() => {
    if (params?.orderid) {
      fetch({
        id: params?.orderid,
      });
      userGpointFetch();
      checkPayButton();
    }
  }, []);

  useEffect(() => {
    if (isChecked)
      usePoint({
        orderid: data?.orderid,
        isCheck: isChecked,
      });
  }, [isChecked]);

  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setIsAtBottom(scrollTop + windowHeight >= fullHeight - 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const targetdate = new Date(data?.createdDate);
  targetdate.setMinutes(targetdate.getMinutes() + 30);

  const countdownRenderer: CountdownRendererFn = ({
    minutes,
    seconds,
    completed,
  }) => {
    if (completed || data?.status === "Цуцлагдсан") {
      setPayDisabled(true);
      // eslint-disable-next-line react/no-unescaped-entities
      return (
        <Text alignSelf="flex-end" fontWeight={700}>
          Дууссан байна
        </Text>
      );
    } else {
      return (
        <HStack alignSelf="flex-end">
          <span style={{ fontWeight: 700 }}>{minutes} мин : </span>
          <span style={{ fontWeight: 700 }}>{seconds} сек</span>
        </HStack>
      );
    }
  };

  const uniqueBranches = useMemo(() => {
    const branchNames = new Set();
    data?.details?.forEach((item: any) => {
      if (item.branch?.name) {
        branchNames.add(item.branch.name);
      }
    });
    return Array.from(branchNames);
  }, [data?.details]);

  useEffect(() => {
    if (cancelOrderData) {
      showToast({
        type: "success",
        title: "Амжилттай",
        description: "Таны захиалга амжилттай цуцлагдлаа.",
      });
      setPayDisabled(true);
    }
  }, [cancelOrderData]);

  useEffect(() => {
    if (cancelOrderError) {
      showToast({
        type: "error",
        title: "Амжилтгүй",
        description: "Та дахин оролдоно уу.",
      });
    }
  }, [cancelOrderError]);

  useEffect(() => {
    if (paymentData) {
      dispatch(setPaymentData(paymentData));
      dispatch(setOrderData(data));
      router.push(`/payment/pay`);
    }
  }, [paymentData]);

  if (isLoading) return <Box width={"full"} height={"100vh"} bg="#fff" />;

  return (
    <Stack
      gap={6}
      w={{ base: "100%", sm: "100%", md: "100%", lg: "75%", xl: "75%" }}
      flexDirection={{
        base: "column",
        sm: "column",
        md: "column",
        lg: "row",
        xl: "row",
      }}
      px={{ base: 4, sm: 4, md: 4, lg: 0, xl: 0 }}
    >
      <HStack
        alignSelf="flex-start"
        fontSize={14}
        display={{
          base: "flex",
          sm: "flex",
          md: "flex",
          lg: "none",
          xl: "none",
        }}
        px={{ base: 0, sm: 0, md: 0, lg: 4, xl: 4 }}
      >
        <Text
          onClick={() => {
            router.push("/profile");
          }}
          cursor="pointer"
        >
          Home
        </Text>

        <Text fontSize={14}>|</Text>
        <Text fontWeight={600}>Захиалгын дэлгэрэнгүй</Text>
      </HStack>
      <VStack
        gap={6}
        w={{ base: "100%", sm: "100%", md: "100%", lg: "60%", xl: "60%" }}
        bg={"#fff"}
        borderRadius={8}
        p={{ base: 0, sm: 0, md: 0, lg: 4, xl: 4 }}
        align={"flex-start"}
      >
        <HStack w="full" justify={"space-between"} align={"flex-start"}>
          <Text fontSize={20} fontWeight={700} justifySelf={"flex-start"}>
            Захиалгын дэлгэрэнгүй
          </Text>
          <VStack gap={1} align={"flex-start"}>
            <Text fontSize={14}>Төлбөр төлөх хугацаа</Text>
            <Countdown
              date={targetdate}
              renderer={countdownRenderer}
              intervalDelay={0}
            />
          </VStack>
        </HStack>
        <Divider />
        <HStack w="full" justify={"space-between"}>
          <VStack gap={1} align={"flex-start"}>
            <Text fontSize={14}>Захиалгын дугаар</Text>
            <Text fontWeight={700}>{`#${data?.orderid}`}</Text>
          </VStack>
          <VStack gap={1} align={"flex-end"}>
            <Text fontSize={14}>Захиалга хийсэн огноо</Text>
            <HStack gap={4}>
              <Text>{`${data?.createdDate.slice(0, 10)}`}</Text>
              <Text>{`${data?.createdDate.slice(11, 16)}`}</Text>
            </HStack>
          </VStack>
        </HStack>
        <Divider />
        <HStack
          w="full"
          display={data?.ordertype === "delivery" ? "flex" : "none"}
        >
          <LocationIcon />
          <VStack gap={2} align={"flex-start"}>
            <Text fontSize={14} fontWeight={600}>
              {data?.address}
            </Text>
            <Text fontSize={12}>
              {data?.deliverytype === "Энгийн хүргэлт"
                ? "Энгийн хүргэлт 24-48цаг"
                : "Шуурхай хүргэлт нь 2-5 цагт хүргэгдэнэ."}
            </Text>
          </VStack>
        </HStack>
        <Divider display={data?.ordertype === "delivery" ? "flex" : "none"} />
        <Text fontWeight={700}>Захиалсан бараа</Text>
        <HStack w="full" overflowX="scroll">
          <HStack gap={2} maxW="400%">
            {/* Display "Бүгд" option */}
            <Stack
              p=" 8px 14px"
              bgColor={selectedState === "Бүгд" ? "#F75B0026" : "transparent"}
              borderRadius={32}
              color={selectedState === "Бүгд" ? "#F75B00" : "#717171"}
              onClick={() => setSelectedState("Бүгд")}
              cursor="pointer"
            >
              <Text fontSize={14} fontWeight={700}>
                Бүгд
              </Text>
            </Stack>

            {/* Render branches only if there are multiple items in the list */}
            {uniqueBranches.length > 1 &&
              uniqueBranches.map((branchName: any, index: number) => (
                <Stack
                  key={index}
                  p="8px 14px"
                  bgColor={
                    selectedState === branchName ? "#F75B0026" : "transparent"
                  }
                  borderRadius={32}
                  color={selectedState === branchName ? "#F75B00" : "#717171"}
                  onClick={() => setSelectedState(branchName)}
                  cursor="pointer"
                >
                  <Text fontSize={14} fontWeight={700}>
                    {branchName}
                  </Text>
                </Stack>
              ))}
          </HStack>
        </HStack>
        <HStack
          gap={2}
          w="full"
          borderRadius={8}
          bg="rgba(255, 196, 83, 0.20)"
          p="10px"
          align={"flex-start"}
          display={
            data?.ordertype === "delivery" && data?.details?.length >= 1
              ? "flex"
              : "none"
          }
        >
          <InfoIcon color="#916A00" w="24" h="24" />
          <Text fontSize={14} color="#916A00">
            Та өөр салбаруудаас бараа хүргэлтээр захиалсан бол бүгд дундын
            агуулах дээр ирсний дараа нэгтгэгдэн хүргэлтэнд гарах болно.
          </Text>
        </HStack>
        <VStack
          gap={4}
          w="full"
          align="flex-start"
          border={{
            base: "1px solid #D0D5DD",
            sm: "1px solid #D0D5DD",
            md: "1px solid #D0D5DD",
            lg: "1px solid #000",
            xl: "none",
          }}
          p={{ base: 4, sm: 4, md: 4, lg: 0, xl: 0 }}
          borderRadius={8}
        >
          <Text fontSize={14} fontWeight={700}>
            {data?.ordertype == "delivery" ? "Хүргэлтээр" : "Очиж авах"}
          </Text>
          {data?.details?.map((item: any, index: number) => {
            return (
              <Link
                key={index}
                href={`/product-detail/${item.part?.articleid}`}
                target="_blank"
                style={{ width: "full" }}
              >
                <OrderDetailCard
                  productImage={item.part?.partimage}
                  articleid={item.part?.partid}
                  productName={item.part?.category}
                  articleNumber={item.part?.articleno}
                  rank={5}
                  branchName={item.organization?.name}
                  branchRank={4}
                  price={item.price}
                  quantity={item.quantity}
                  total={0}
                  index={index}
                  brandName={item.part?.brandname}
                />
              </Link>
            );
          })}
        </VStack>
      </VStack>
      <VStack
        w={{ base: "100%", sm: "100%", md: "100%", lg: "40%", xl: "40%" }}
        bg="#fff"
        borderRadius={8}
        gap={6}
        alignSelf={"flex-start"}
        border={{
          base: "1px solid #D0D5DD",
          sm: "1px solid #D0D5DD",
          md: "1px solid #D0D5DD",
          lg: "none",
          xl: "none",
        }}
        p={{ base: 4, sm: 4, md: 4, lg: "24px 16px", xl: "24px 16px" }}
      >
        <HStack w="full" justify={"space-between"}>
          <Text fontWeight={600}>Нийт төлөх үнэ:</Text>
          <Text fontWeight={700} fontSize={20}>
            {formatCurrency(data?.alltotal)}
          </Text>
        </HStack>
        <Divider />
        <HStack w="full" justify={"space-between"}>
          <HStack gap={2}>
            <Checkbox
              disabled={userGpoint?.point === 0}
              isChecked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
              }}
            />
            <Text fontSize={14} fontWeight={600}>
              G-Point оноо
            </Text>
          </HStack>
          <Text color={"#F75B00"} fontWeight={700}>{`G-${formatNumber(
            userGpoint?.point || 0
          )}`}</Text>
        </HStack>
        <VStack gap={2} w="full">
          <HStack w="full" justify={"space-between"}>
            <Text>Бараа тоо:</Text>
            <Text>{data?.allquantity}</Text>
          </HStack>
          <HStack
            w="full"
            justify={"space-between"}
            display={data?.ordertype === "delivery" ? "flex" : "none"}
          >
            <Text>Хүргэлт:</Text>
            <Text>{formatCurrency(data?.deliverytotal)}</Text>
          </HStack>
          <HStack
            w="full"
            justify={"space-between"}
            style={{ display: isChecked ? "flex" : "none" }}
          >
            <Text>Бонус</Text>
            <Text color={"#F75B00"} fontWeight={700}>{`-${formatNumber(
              userGpoint?.point || 0
            )} G`}</Text>
          </HStack>
        </VStack>
        <VStack gap={4} w="full">
          <Button
            isDisabled={isPayDisabled}
            onClick={() =>
              getPaymentData({
                orderid: data?.orderid,
              })
            }
            isLoading={paymentLoader}
            _hover={isPayDisabled ? {} : { bg: "#D63F00" }}
          >
            Төлбөр төлөх
          </Button>
          <Button
            variant="outline"
            isDisabled={isPayDisabled}
            onClick={() =>
              cancelOrderByUser({
                id: data?.orderid,
              })
            }
            isLoading={cancelOrderLoader}
          >
            Захиалга цуцлах
          </Button>
        </VStack>
      </VStack>

      {!isAtBottom && (
        <Stack
          w="100vw"
          bg="white"
          p={4}
          pos="fixed"
          bottom={0}
          display={{
            base: "flex",
            sm: "flex",
            md: "flex",
            lg: "none",
            xl: "none",
          }}
          right={0}
          gap={4}
        >
          <Text>Таны захиалга:</Text>
          <HStack w="full" justify={"space-between"}>
            <Text fontWeight={600}>Нийт төлөх үнэ:</Text>
            <Text fontWeight={700} fontSize={20}>
              {formatCurrency(data?.alltotal)}
            </Text>
          </HStack>
          <HStack
            gap={2}
            w="full"
            borderRadius={8}
            bg="rgba(255, 196, 83, 0.20)"
            p="10px"
            align={"flex-start"}
          >
            <InfoIcon color="#916A00" w="24" h="24" />
            <Text fontSize={14} color="#916A00">
              If you have items with different arrival dates, your order will
              ship once the last item arrives.
            </Text>
          </HStack>
          <Button
            variant="solid"
            fontSize={14}
            fontWeight={600}
            p="8px 14px"
            w="full"
            disabled={isPayDisabled}
          >
            Төлбөр төлөх
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
