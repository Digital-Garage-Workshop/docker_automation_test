import { PockeyZeroModal } from "./PocketZeroModal";
import { Key, useEffect } from "react";
import { UseApi } from "@/hooks/useApi";
import { CheckPayment } from "@/services/createOrder/checkPayment";
import { useRouter } from "next/navigation";
import { setOrderData } from "@/redux/slices/orderDataSlice";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/slices/cartSlice";
import { OrderData, Split } from "../../../types";
import {
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useAppSelector } from "@/hooks/hooks";
import { Qr } from "./step-five";
import { formatCurrency } from "@/utils/number_formation";
import { DownArrow } from "@/icons";
import { StorePayModal } from "./StorePayModal";

type StepFiveProps = {
  step: number;
};

export const PaymentProcessArch = (props: StepFiveProps) => {
  const { step } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    isOpen: PocketIsOpen,
    onClose: PocketOnClose,
    onOpen: PocketOnOpen,
  } = useDisclosure();
  const {
    isOpen: storepayIsOpen,
    onClose: storepayOnClose,
    onOpen: storepayOnOpen,
  } = useDisclosure();
  const paymentData = useAppSelector((state) => state.payment.paymentData);
  const orderData = useAppSelector((state) => state.order.orderData);
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: CheckPayment,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      if (paymentData?.orderid) {
        fetch({
          orderid: paymentData?.orderid,
          invoiceid: paymentData?.applications?.qpay?.invoice_id,
          paymentid: paymentData?.applications?.paymentid,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [paymentData]);
  useEffect(() => {
    if (data) {
      router.push(`/payment/success`);

      data.details.map((e: any) => {
        dispatch(
          removeFromCart({
            partid: e.part.partid,
            shippingMethod: e.ordertype,
          })
        );
      });

      dispatch(setOrderData(data));
    }
  }, [data]);
  return (
    <VStack
      w="82%"
      bg="white"
      p={8}
      borderRadius={8}
      align="center"
      gap={8}
      mb="80px"
      sx={{ display: step === 5 ? "flex" : "none", flexDirection: "column" }}
    >
      <VStack gap={2}>
        <Text fontSize={20} fontWeight={700}>
          QPay -р төлөх
        </Text>
        <Text fontSize={16}>
          Та банкны аппаараа доорх QR кодыг уншуулна уу.
        </Text>
      </VStack>
      <Qr image={paymentData?.applications?.qpay?.qr_text ?? ""} />
      <VStack w="658px" bg="#F6F7F8" borderRadius={8} gap={0} p={4}>
        <Text fontSize={14}>Төлөх дүн:</Text>
        <Text fontSize={20} fontWeight={700}>
          {formatCurrency(orderData?.paidtotal ?? 0)}
        </Text>
        {/* <Text
          fontSize={14}
          pt={2}
        >{`(Төлбөр буцаан олгохгүйг анхаарна уу.)`}</Text> */}
      </VStack>
      <VStack gap={6}>
        <Text fontSize={18} fontWeight={700}>
          Хувааж төлөх нөхцөл
        </Text>

        <HStack w={{ base: "100%", md: "658px" }}>
          {paymentData?.splits?.map(
            (e: Split, index: Key | null | undefined) => (
              <HStack
                key={index}
                w="100%"
                p="8px 16px"
                borderRadius="8px"
                cursor="pointer"
                border="1px solid #CFCFCF"
                justify="space-between"
                onClick={e.name == "STORE PAY" ? storepayOnOpen : PocketOnOpen}
              >
                <HStack gap={2}>
                  {/* <StorePay /> */}
                  <Image
                    src={e.icon ?? ""}
                    alt={e.name ?? ""}
                    width={"40px"}
                    height={"40px"}
                    borderRadius={8}
                  />
                  <VStack gap={0} align="flex-start">
                    <Text fontWeight={600} color="#1E1E1E" lineHeight="22px">
                      {e.name}
                    </Text>
                    <Text fontSize={12} color="#1E1E1E" lineHeight="16px">
                      Одоо аваад дараа төл
                    </Text>
                  </VStack>
                </HStack>
                <Stack sx={{ transform: "rotate(-90deg)" }}>
                  <DownArrow color="#A0A0A0" w="24" h="24" />
                </Stack>
                <StorePayModal
                  orderid={orderData?.orderid.toString() ?? ""}
                  isOpen={storepayIsOpen}
                  paymentid={
                    paymentData?.splits?.[0]?.paymentid?.toString() ?? ""
                  }
                  onClose={storepayOnClose}
                />
                <PockeyZeroModal
                  isOpen={PocketIsOpen}
                  onClose={PocketOnClose}
                  total={orderData?.alltotal!}
                  qrcode={e.qrcode ?? ""}
                />
              </HStack>
            )
          )}
        </HStack>
      </VStack>
    </VStack>
  );
};
