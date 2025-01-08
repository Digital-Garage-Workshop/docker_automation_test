"use client";
import {
  HStack,
  Stack,
  VStack,
  Text,
  Divider,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import Image from "next/image";
import Rate from "../Rate";
import { CloseIcon, DownArrow, MinusIcon, PlusIcon } from "@/icons";
import { formatCurrency } from "@/utils/number_formation";
import { useState } from "react";
import { useDispatch } from "react-redux";

type PaymentCardProps = {
  articleid: number;
  productImage?: string;
  productName: string;
  articleNumber: string;
  rank: number;
  branchName: string;
  branchRank: number;
  discount?: number;
  price: number;
  salePrice?: number;
  quantity: number;
  total: number;
  index: number;
  brandName: string;
};

export const OrderDetailCard = (props: PaymentCardProps) => {
  const {
    articleid,
    productImage,
    productName,
    articleNumber,
    rank,
    branchName,
    branchRank,
    discount,
    price,
    salePrice,
    quantity,
    total,
    index,
    brandName,
  } = props;

  const [productQuantity, setQuantity] = useState<number>(quantity);
  const dispatch = useDispatch();

  return (
    <HStack justify="space-between" w="100%">
      <Stack
        w="120px"
        h="120px"
        pos="relative"
        alignSelf={"flex-start"}
        justifySelf="flex-start"
      >
        <Image
          src={productImage || "product.svg"}
          alt="product image"
          fill
          style={{ objectFit: "contain" }}
        />
      </Stack>
      <Stack
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
        }}
      >
        <VStack gap={2}>
          <VStack gap={1} w="full">
            <Text
              fontWeight="bold"
              fontSize={14}
              lineHeight="150%"
              alignSelf={"flex-start"}
            >
              {`${brandName} ${productName}`}
            </Text>
            <HStack gap={2} w="100%">
              <Text fontSize={12}>{`Article number: ${articleNumber}`}</Text>
              <Stack bgColor="black" h="10px" w="1px" />
              {/* <Rate rank={rank || 5} fill="#F75B00" w="16" h="16" /> */}
            </HStack>
          </VStack>
          <VStack gap={1} w="100%" align="start" justify="flex-start" m={0}>
            <Text fontWeight="bold" fontSize={12} lineHeight="150%" w="100%">
              {` ${branchName}`}
            </Text>
            <Rate fill="#53BC00" rank={branchRank || 5} w="12" h="12" />
          </VStack>
          <Stack align="flex-start" w="100%" m={0}>
            {/* <Button
            variant="filled"
            w="112px"
            color="#717171"
            rightIcon={<DownArrow color="#717171" w="20" h="20" />}
            fontSize={13}
          >
            Дэлгэрэнгүй
          </Button> */}
          </Stack>
        </VStack>
        <Divider
          borderColor="#EDEDED"
          orientation="vertical"
          h="125px"
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "flex",
            xl: "flex",
          }}
        />
        <VStack gap={0} align="flex-start" alignSelf="start">
          <HStack
            justify="space-between"
            align="flex-start"
            w="100%"
            sx={{ display: discount ? "flex" : "none" }}
          >
            <Text
              as="del"
              fontSize={12}
              fontWeight={700}
              color="#717171"
              alignSelf="flex-end"
            >
              {formatCurrency(price)}
            </Text>
            <Stack px={1} bgColor="#F75B00" borderRadius={24}>
              <Text
                fontSize={12}
                fontWeight={700}
                color="white"
              >{`-${discount}%`}</Text>
            </Stack>
          </HStack>
          <Text fontSize={20} fontWeight={700}>
            {formatCurrency(salePrice ? salePrice : price)}
          </Text>
          <Text fontSize={12} color="#717171">
            НӨАТ багтсан үнэ
          </Text>
          <HStack gap={2} w="100%" mt={4}>
            <Text color="#1E1E1E" fontSize={12}>
              {`Тоо ширхэг:`}
            </Text>
            <Text bg="#EDEDED" borderRadius={4} px={1}>
              {quantity}
            </Text>
          </HStack>
        </VStack>
      </Stack>
    </HStack>
  );
};
