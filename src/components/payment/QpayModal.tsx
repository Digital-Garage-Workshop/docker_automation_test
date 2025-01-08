import {
  HStack,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Qr } from "./step-five";
import { formatCurrency } from "@/utils/number_formation";
import { useAppSelector } from "@/hooks/hooks";
import { CapitronBank, RightArrow, QpayIcon } from "@/icons";
import { setPaymentid } from "@/redux/slices/paymentSlice";
import { BankInfoModal } from "./BankInfoModal";
import { Url } from "../../../types";
import Link from "next/link";

export const QpayModal = (props: { isOpen: boolean; onClose: () => void }) => {
  const { isOpen, onClose } = props;
  const paymentData = useAppSelector((state) => state.payment.paymentData);
  const orderData = useAppSelector((state) => state.order.orderData);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent maxW={488} mx={4}>
        <ModalCloseButton />
        <VStack
          w="100%"
          bg="white"
          p={8}
          borderRadius={8}
          align="center"
          gap={8}
          display={{ base: "none", md: "flex" }}
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
          <VStack w="full" bg="#F6F7F8" borderRadius={8} gap={0} p={4}>
            <Text fontSize={14}>Төлөх дүн:</Text>
            <Text fontSize={20} fontWeight={700}>
              {formatCurrency(orderData?.paidtotal ?? 0)}
            </Text>
            {/* <Text
      fontSize={14}
      pt={2}
    >{`(Төлбөр буцаан олгохгүйг анхаарна уу.)`}</Text> */}
          </VStack>
        </VStack>
        <VStack gap={4} w="full" display={{ base: "flex", md: "none" }} p={6}>
          <VStack gap={2}>
            <Text fontSize={20} fontWeight={700}>
              Банкаар төлөх
            </Text>
            <Text>Та банкны аппаараа төлнө үү</Text>
          </VStack>
          <VStack gap={4} w="full" maxH={400} overflow={"scroll"}>
            {paymentData?.applications?.qpay?.urls?.map(
              (item: Url, index: number) => {
                return (
                  <Link
                    href={item.link || "#"}
                    style={{ width: "full" }}
                    key={index}
                  >
                    <HStack
                      p="8px 16px"
                      borderRadius={8}
                      border="1px solid #F2F4F7"
                      bg="#F9FAFB"
                      w="312px"
                      justify="space-between"
                    >
                      <HStack gap={2}>
                        <Image src={item.logo} w={8} h={8} borderRadius={8} />
                        <Text fontSize={16} fontWeight={700}>
                          {item.description}
                        </Text>
                      </HStack>
                      <RightArrow color="#1E1E1E" w="24" h="24" />
                    </HStack>
                  </Link>
                );
              }
            )}
          </VStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
