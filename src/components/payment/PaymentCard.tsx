"use client";

import {
  HStack,
  Stack,
  VStack,
  Text,
  Divider,
  Button,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";
import Rate from "../Rate";
import { CloseIcon, MinusIcon, PlusIcon } from "@/icons";
import { formatCurrency } from "@/utils/number_formation";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import { BranchPart, Images } from "../../../types"; // Ensure this path is correct
import { usePathname } from "next/navigation";

export interface PaymentCardProps {
  articleid: number;
  category: string;
  articleno: string;
  brandname: string;
  star: number | null;
  images: any;
  reward: boolean;
  branchparts: BranchPart;
  carid: string;
  onCheck: (isChecked: boolean) => void;
  quantity: number;
  isChecked: boolean;
  isDelivery: boolean;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  articleid,
  category,
  articleno,
  star,
  images,
  branchparts,
  onCheck,
  quantity,
  isChecked,
  isDelivery,
}) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(
      removeFromCart({
        partid: branchparts.partid,
        shippingMethod: isDelivery ? "delivery" : "pickup",
      })
    );
  };

  const handleQuantityIncrease = () => {
    dispatch(
      updateQuantity({
        partid: branchparts.partid,
        quantity: quantity + 1,
        shippingMethod: isDelivery ? "delivery" : "pickup",
      })
    );
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      dispatch(
        updateQuantity({
          partid: branchparts.partid,
          quantity: quantity - 1,
          shippingMethod: isDelivery ? "delivery" : "pickup",
        })
      );
    }
  };
  const pathname = usePathname();

  return (
    <>
      <HStack w="100%" justify="space-between">
        <HStack gap={4} w="100%">
          <HStack alignSelf={"flex-start"} justifySelf={"flex-start"}>
            <Stack
              display={
                pathname?.toString().includes("checkout") ? "none" : "flex"
              }
              alignSelf={"flex-start"}
            >
              <Checkbox
                isChecked={isChecked}
                onChange={(e) => onCheck(e.target.checked)}
                alignSelf={"flex-start"}
                justifySelf="flex-start"
                variant={"outline"}
              />
            </Stack>
            <Stack
              w={{ base: "88px", md: "129px" }}
              h={{ base: "88px", md: "129px" }}
              pos="relative"
            >
              <Image
                src={images?.imgurl400 || images?.imgurl800 || "/No-Image.svg"}
                alt={`${category}`}
                fill
                style={{ objectFit: "contain" }}
              />
            </Stack>
          </HStack>

          <Stack
            flexDir={{ base: "row", lg: "row" }}
            w={"85%"}
            justify="space-between"
          >
            <Stack flexDir={{ base: "column", lg: "row" }} w="85%">
              <Stack
                gap={2}
                w={{ base: "100%", md: "70%" }}
                mt={{ base: 2, md: 0 }}
              >
                {/* Product Details */}
                <VStack gap={1} w="full" align="flex-start">
                  <Rate
                    display={{ base: "flex", md: "none" }}
                    rank={star || 4}
                    fill="#F75B00"
                    w="16"
                    h="16"
                  />
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: 14, md: 16 }}
                    lineHeight="150%"
                    alignSelf={"flex-start"}
                  >
                    {category}
                  </Text>
                  <HStack gap={2} w="100%">
                    <Text
                      w={{ base: "fit-content", md: "fit-content" }}
                      fontSize={12}
                    >{`Article number: ${articleno}`}</Text>
                    <Stack
                      display={{ base: "none", md: "flex" }}
                      bgColor="black"
                      h="10px"
                      w="1px"
                    />
                    <Rate
                      display={{ base: "none", md: "flex" }}
                      rank={star || 4}
                      fill="#F75B00"
                      w="12"
                      h="12"
                    />
                  </HStack>
                </VStack>
                <VStack gap={1} w="100%" align="start" justify="flex-start">
                  <Text fontSize={12}>Салбар:</Text>
                  <Text
                    fontWeight="bold"
                    fontSize={16}
                    lineHeight="150%"
                    w={{ base: "200%", md: "fit-content" }}
                  >
                    {branchparts.organization}
                  </Text>
                  {/* <Rate fill="#53BC00" rank={star || 5} w="12" h="12" /> */}
                </VStack>
              </Stack>

              <Divider
                display={{ base: "none", md: "flex" }}
                borderColor="#EDEDED"
                orientation="vertical"
                h="125px"
              />
              <VStack gap={0} align="flex-start" alignSelf="start" w="120px">
                <HStack
                  justify="space-between"
                  w="100%"
                  sx={{ display: branchparts?.salepercent ? "flex" : "none" }}
                >
                  <Text as="del" fontSize={12} fontWeight={700} color="#717171">
                    {formatCurrency(branchparts.price)}
                  </Text>
                  <Stack px={1} bgColor="#F75B00" borderRadius={24}>
                    <Text fontSize={12} fontWeight={700} color="white">
                      -{branchparts.salepercent}%
                    </Text>
                  </Stack>
                </HStack>
                <Text fontSize={20} fontWeight={700}>
                  {formatCurrency(branchparts.pricesale ?? branchparts.price)}
                </Text>
                <Text fontSize={12} color="#717171">
                  НӨАТ багтсан үнэ
                </Text>
                <HStack gap={2} w="100%" mt={4}>
                  <Stack
                    cursor={"pointer"}
                    onClick={handleQuantityDecrease}
                    display={
                      pathname?.toString().includes("checkout")
                        ? "none"
                        : "flex"
                    }
                  >
                    <MinusIcon />
                  </Stack>
                  <Stack px="24px" bgColor="#EDEDED" borderRadius={24}>
                    <Text color="#1E1E1E" fontWeight={600}>
                      {quantity}
                    </Text>
                  </Stack>
                  <Stack
                    cursor={"pointer"}
                    onClick={handleQuantityIncrease}
                    display={
                      pathname?.toString().includes("checkout")
                        ? "none"
                        : "flex"
                    }
                  >
                    <PlusIcon />
                  </Stack>
                </HStack>
              </VStack>
            </Stack>
            <Stack
              alignSelf={"flex-start"}
              onClick={handleRemove}
              display={
                pathname?.toString().includes("checkout") ? "none" : "flex"
              }
            >
              <CloseIcon />
            </Stack>
          </Stack>
        </HStack>
      </HStack>
    </>
  );
};
