"use client";
import { Stack, VStack, Text, HStack, Divider } from "@chakra-ui/react";
import { use, useEffect, useState } from "react";
import { SignUpFormControl, SignUpWithSocials } from "../sign-up";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/hooks";
import { UseApi } from "@/hooks/useApi";
import { CreateOrderDelivery } from "@/services/createOrder/createOrderDelivery";
import { CreateOrderPickUp } from "@/services/createOrder/createOrderPickup";
import { RootState } from "@/redux/store";
import { setOrderData } from "@/redux/slices/orderDataSlice";
import { useDispatch } from "react-redux";

export const PaymentLogin = () => {
  const [isLogin, setLogin] = useState(1);
  const { data: session } = useSession();
  const [{ data, isLoading, error }, fetchDeliveryOrder] = UseApi({
    service: CreateOrderDelivery,
    useAuth: true,
  });
  const [
    { data: pickupData, isLoading: pickupIsLoading, error: pickupError },
    fetchPickupOrder,
  ] = UseApi({
    service: CreateOrderPickUp,
    useAuth: true,
  });
  const dispatch = useDispatch();
  const shippingMethod = useAppSelector(
    (state) => state.shippingMethod.shippingMethod
  );
  const product = useAppSelector((state) => state.selectedProduct.products);
  const router = useRouter();
  const carDetails = useAppSelector((state: RootState) => state.car);
  useEffect(() => {
    if (!product) {
      console.error("Product is null");
      return;
    }
    const orderData = {
      carid: carDetails.carId,
      platenumber: carDetails.plate,
      items: product.map((item) => ({
        partid: item.branchparts?.[0]?.partid ?? 0,
        quantity: item.quantity,
        type: item.shippingMethod,
      })),
    };

    if (shippingMethod === "delivery") {
      fetchDeliveryOrder(orderData);
    } else {
      fetchPickupOrder(orderData);
    }
    if (session) {
      if (shippingMethod === "delivery") {
        router.push("/payment/address");
      } else {
        router.push("/payment/checkout");
      }
    }
  }, [session, shippingMethod]);
  useEffect(() => {
    if (data) {
      router.push("/payment/address");
      dispatch(setOrderData(data));
    } else if (pickupData) {
      dispatch(setOrderData(pickupData));
      router.push("/payment/checkout");
    }
  }, [data, pickupData, session]);
  return (
    <VStack
      bg="white"
      w={{ base: "100%", md: "485px" }}
      borderRadius={8}
      sx={{ display: 2 === 2 ? "flex" : "none", flexDirection: "column" }}
      justifySelf="center"
    >
      <VStack p="24px" w={{ base: "100%", md: "500px" }} gap={6}>
        <Stack alignSelf="center" textAlign="center" w="100%">
          <VStack gap={"10px"} w="full">
            <Text fontSize={28} fontWeight={700}>
              {isLogin === 1
                ? "Нэвтрэх"
                : isLogin === 2
                  ? "Бүртгүүлэх"
                  : "Нууц үг мартсан"}
            </Text>
            {/* <Text fontSize={16} fontWeight={400} w="full">
              {isLogin === 1
                ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"
                : isLogin === 2
                  ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has beens"
                  : "Таны И-Мэйлийг шалгаж линк дээр дарж нууц үгээ сольсноор нэвтрэх боломжтой."}
            </Text> */}
          </VStack>
        </Stack>
        <VStack gap={"10px"} w="full">
          {isLogin === 3 ? (
            <Text fontSize={14} fontWeight={400}>
              Таны бүртгэлтэй и-мэйл хаягаар нууц үг сэргээх баталгаажуулах
              кодыг илгээх болно.
            </Text>
          ) : (
            <Text
              fontSize={14}
              fontWeight={400}
              w="full"
              mt={-2}
              textAlign={"center"}
            >
              И-мэйл хаяг оруулан үргэлжлүүлэх товчийг дарж Garage.mn вебсайтад
              нэвтэрснээр Таныг тус вебсайтын{" "}
              <span
                onClick={() => {
                  router.push("/terms-and-condition");
                }}
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {" "}
                Үйлчилгээний нөхцөл{" "}
              </span>{" "}
              болон{" "}
              <span
                onClick={() => {
                  router.push("/privacy-and-policy");
                }}
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {" "}
                Нууцлалын бодлогыг{" "}
              </span>{" "}
              хүлээн зөвшөөрсөнд тооцно.
            </Text>
          )}
        </VStack>
        {/* <ModalCloseButton /> */}
        <VStack w="100%">
          <SignUpWithSocials isLogIn={isLogin} />
          <HStack
            width={"100%"}
            my="24px"
            sx={{ display: isLogin === 3 ? "none" : "flex" }}
          >
            <Divider orientation="horizontal" color={"#CFCFCF"} />
            <Text px={2} color={"#717171"} fontSize={"xs"} fontWeight={500}>
              ЭСВЭЛ
            </Text>
            <Divider />
          </HStack>
          <SignUpFormControl
            isLogIn={isLogin}
            setLogin={setLogin}
            onClose={function (): void {
              setLogin(1);
            }}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};
