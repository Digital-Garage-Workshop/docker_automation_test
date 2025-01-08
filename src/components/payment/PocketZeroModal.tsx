"use client";
import {
  Stack,
  VStack,
  Text,
  HStack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MinusIcon, PlusIcon, ShoppingCart } from "@/icons";
import Rate from "../Rate";
import { formatCurrency } from "@/utils/number_formation";
import { PockerZero } from "../../icons/PocketZero";
import { Qr } from "./step-five";

type PocketZeroModal = {
  onClose: () => void;
  isOpen: boolean;
  total: number;
  qrcode: string;
};

export const PockeyZeroModal = (props: PocketZeroModal) => {
  const { isOpen, onClose, total, qrcode } = props;
  const [quantity, setQuantity] = useState(1);
  const [isDelivery, setIsDelivery] = useState(true);
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="24px" maxW="488px" gap={8}>
        <ModalHeader
          alignSelf="center"
          textAlign="center"
          fontWeight={"none"}
          w="full"
          p={0}
        >
          <VStack gap={2} w="full">
            <PockerZero />
            <Text fontSize={20} fontWeight={700}>
              Pocket Zero -р төлөх
            </Text>
            <Text fontSize={16} fontWeight={400}>
              Та Pocket аппаараа доорх QR кодыг уншуулна уу.
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <VStack gap={8}>
            <Qr image={qrcode} size="193" />
            <VStack py={4} gap={2} bg={"#F6F7F8"} borderRadius={8} w="full">
              <VStack gap={0}>
                <Text fontSize={14}>Төлөх дүн:</Text>
                <Text fontSize={20} fontWeight={700}>
                  {formatCurrency(total)}
                </Text>
                <Text fontSize={14}>
                  (Төлбөр буцаан олгохгүйг анхаарна уу.)
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
