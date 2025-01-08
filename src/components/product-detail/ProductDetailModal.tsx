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
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MinusIcon, PlusIcon, ShoppingCart } from "@/icons";
import Rate from "../Rate";
import { formatCurrency } from "@/utils/number_formation";
import { useAppDispatch } from "@/hooks/hooks";
import { addToCart, updateQuantity } from "@/redux/slices/cartSlice";
import { Product, ShippingMethod } from "../../../types";
import { useCustomToast } from "@/hooks/useCustomToast";

type ProductDetailModalProps = {
  onClose: () => void;
  isOpen: boolean;
  part: any;
};

export const ProductDetailModal = ({
  onClose,
  isOpen,
  part,
}: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [shippingMethods, setShippingMethods] = useState<
    Record<number, ShippingMethod>
  >({});
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const router = useRouter();

  // Handlers with memoization
  const handleMinus = useCallback(() => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      toast({
        title: "Minimum quantity reached",
        description: "Quantity cannot be less than 1.",
        type: "warning",
      });
    }
  }, [quantity, toast]);

  const handlePlus = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const handleShippingMethodChange = useCallback(
    (articleid: number, method: ShippingMethod) => {
      setShippingMethods((prev) => ({ ...prev, [articleid]: method }));
    },
    []
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      const shippingMethod =
        shippingMethods[product.branchparts[0].partid] || "delivery";

      dispatch(addToCart({ product, shippingMethod, quantity }));

      // Dispatch the updateQuantity action properly to Redux

      toast({
        title: "Амжилттай",
        description: `${product.category} бүтээгдэхүүн ${shippingMethod === "delivery" ? "хүргэлтийн" : "очиж авах"} нөхцөлөөр амжилттай сагсанд нэмэгдлээ.`,
        type: "success",
      });

      onClose();
    },
    [dispatch, quantity, shippingMethods, toast]
  );

  const handleBuy = useCallback(() => {
    // onClose();
    router.push("/payment");
    handleAddToCart(part);
  }, [onClose, router, handleAddToCart, part]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={"24px"} maxW="488px" gap={8} m={4}>
        <ModalHeader
          alignSelf="center"
          textAlign="center"
          fontSize={20}
          fontWeight={700}
          p={0}
        >
          {`${part?.brandname} ${part?.category}`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <HStack gap={6}>
            <Stack
              width={{ base: "40%", md: "181px" }}
              h="200px"
              pos="relative"
              alignSelf={"flex-start"}
              justifySelf={"flex-start"}
            >
              <Image
                src={
                  part.images === null
                    ? "/product.svg"
                    : part?.images?.imgurl400
                }
                alt="product img"
                fill
                style={{ objectFit: "contain" }}
              />
            </Stack>
            <VStack
              justifyContent={"start"}
              alignItems={"start"}
              gap={4}
              w="60%"
            >
              <Text fontSize={14} fontWeight={700} color="#1E1E1E">
                Худалдан авах хэлбэр:
              </Text>
              <RadioGroup
                onChange={(value: ShippingMethod) =>
                  handleShippingMethodChange(
                    part.branchparts?.[0]?.partid,
                    value
                  )
                }
                defaultValue="delivery"
              >
                <HStack
                  gap={8}
                  flexDir={{ base: "column", md: "row" }}
                  alignItems="start"
                >
                  <Radio colorScheme="primary" value="delivery">
                    <Text fontSize={14} fontWeight={700} color="#1E1E1E">
                      Хүргүүлэх
                    </Text>
                  </Radio>
                  <Radio colorScheme="primary" value="pickup">
                    <Text fontSize={14} fontWeight={700} color="#1E1E1E">
                      Очиж авах
                    </Text>
                  </Radio>
                </HStack>
              </RadioGroup>
              <Divider borderColor="#EDEDED" />
              <VStack gap={1} align="start">
                <Text fontSize={12}>Салбар:</Text>
                <Text fontSize={16} fontWeight={700}>
                  {part.branchparts?.[0]?.organization}
                </Text>
                {/* <Rate fill="#53BC00" rank={part.star || 4} w="12" h="12" /> */}
              </VStack>
              <HStack gap={2}>
                <Stack onClick={handleMinus}>
                  <MinusIcon />
                </Stack>
                <Stack px="24px" bgColor="#EDEDED" borderRadius={24}>
                  <Text fontWeight={600}>{quantity}</Text>
                </Stack>
                <Stack onClick={handlePlus}>
                  <PlusIcon />
                </Stack>
              </HStack>
              <VStack gap={0} align="flex-start">
                <Text fontSize={32} fontWeight={700}>
                  {formatCurrency(
                    part.branchparts?.[0]?.pricesale ??
                      part.branchparts?.[0]?.price ??
                      0
                  )}
                </Text>
                <Text fontSize={12} color="#717171">
                  НӨАТ багтсан үнэ
                </Text>
              </VStack>
              <HStack gap={2} w="full" display={{ base: "none", md: "flex" }}>
                <Button
                  variant="outline"
                  borderRadius={8}
                  p="8px 14px"
                  w="full"
                  leftIcon={<ShoppingCart color="#1E1E1E" />}
                  color="#1E1E1E"
                  fontWeight="bold"
                  fontSize={"13px"}
                  onClick={() => handleAddToCart(part)}
                >
                  Сагслах
                </Button>
                <Button
                  variant="filled"
                  borderRadius={8}
                  p="8px 14px"
                  bgColor="#F75B00"
                  w="full"
                  color="white"
                  fontWeight="bold"
                  fontSize={"13px"}
                  onClick={handleBuy}
                >
                  Худалдан авах
                </Button>
              </HStack>
            </VStack>
          </HStack>
          <HStack
            gap={2}
            w="full"
            display={{ base: "flex", md: "none" }}
            mt="20px"
          >
            <Button
              variant="outline"
              borderRadius={8}
              p="8px 14px"
              w="full"
              leftIcon={<ShoppingCart color="#1E1E1E" />}
              color="#1E1E1E"
              fontWeight="bold"
              fontSize={"13px"}
              onClick={() => handleAddToCart(part)}
            >
              Сагслах
            </Button>
            <Button
              variant="filled"
              borderRadius={8}
              p="8px 14px"
              bgColor="#F75B00"
              w="full"
              color="white"
              fontWeight="bold"
              fontSize={"13px"}
              onClick={handleBuy}
            >
              Худалдан авах
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
