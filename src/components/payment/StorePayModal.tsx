"use client";
import {
  VStack,
  Text,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { storepayRequest } from "@/services/createOrder/storepayRequest";
import { UseApi } from "@/hooks/useApi";
import { useCustomToast } from "@/hooks/useCustomToast";

type StorePayModal = {
  onClose: () => void;
  isOpen: boolean;
  orderid: string;
  paymentid: string;
};

export const StorePayModal = (props: StorePayModal) => {
  const { isOpen, onClose, orderid, paymentid } = props;
  const [digits, setDigits] = useState(Array(8).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: storepayRequest,
    useAuth: true,
  });

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const showToast = useCustomToast();

  useEffect(() => {
    if (data) {
      showToast({
        type: "success",
        title: "Амжилттай",
        description: "Хүсэлт илгээгдлээ",
      });
      onClose();
    }
    if (error) {
      showToast({
        type: "error",
        title: "Алдаа",
        description: `${error}`,
      });
    }
  }, [data, error]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="24px" maxW="800px" gap={8}>
        <ModalHeader alignSelf="center" textAlign="center" w="full" p={0}>
          <VStack w="full" pos="relative" height={125}>
            <Image src="/storepay.jpg" alt="garage.mn" fill />
          </VStack>
        </ModalHeader>
        <ModalBody p={0}>
          <VStack gap={{ base: 4, md: 8 }}>
            <Text fontSize={{ base: 14, md: 18 }} fontWeight={700}>
              Та бүртгэлтэй утасны дугаараа оруулан аппликейшн дээр нэхэмжлэлээ
              авна уу.
            </Text>

            <SimpleGrid w="full" columns={8} spacing={{ base: 2, md: 4 }} p={5}>
              {digits.map((digit, index) => (
                // eslint-disable-next-line react/jsx-key
                <Input
                  key={index}
                  variant="unstyled"
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  textColor={"black"}
                  textAlign="center"
                  placeholder="-"
                  bg={"#F1F2F3"}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  maxLength={1}
                  fontWeight="bold"
                  size="xl"
                  fontSize={{ base: 14, md: 32 }}
                  inputMode="numeric"
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !digits[index] && index > 0) {
                      inputRefs.current[index - 1]?.focus();
                    }
                  }}
                  width={"100%"}
                  height={{ base: "40px", md: "80px" }}
                />
              ))}
            </SimpleGrid>

            <Text>
              Та Storepay-д бүртгэлтэй утасны дугаараа оруулан хүсэлт илгээн
              үүссэн нэхэмжлэхийн дагуу худалдан авалтаа баталгаажуулснаар бараа
              бүтээгдэхүүн, үйлчилгээгээ авах боломжтой.
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter p={0}>
          <HStack w="full" gap={6}>
            <Button variant="outline" onClick={onClose}>
              Буцах
            </Button>
            <Button
              isLoading={isLoading}
              onClick={() => {
                fetch({ orderid, phone: digits.join(""), paymentid });
              }}
            >
              Хүсэлт илгээх
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
