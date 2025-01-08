"use client";
import {
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { OrderDetailCard } from "./OrderDetailCard";
import { UseApi } from "@/hooks/useApi";
import { GetOrderDetail } from "@/services/user/orderDetail";
import { useEffect } from "react";
import { formatCurrency } from "@/utils/number_formation";
import { type } from "os";
import { formatNumber } from "@/utils/formatNumber";

type PointDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  point: number;
  orderid: number;
};

export const PointDetailModal = (props: PointDetailModalProps) => {
  const { isOpen, onClose, type, point, orderid } = props;
  const [
    {
      data: pointDetailData,
      error: pointDetailError,
      isLoading: pointDetaiLoader,
    },
    pointDetailFetch,
  ] = UseApi({
    service: GetOrderDetail,
    useAuth: true,
  });

  useEffect(() => {
    if (orderid)
      pointDetailFetch({
        id: orderid,
      });
  }, [type]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        mt={"120px"}
        maxW={{ base: 360, sm: 360, md: 360, lg: 534, xl: 534 }}
        p={6}
        gap={4}
      >
        <ModalHeader alignItems="center" justifyContent="center" p={0} gap={4}>
          <Text textAlign="center">Garage Point дэлгэрэнгүй</Text>
          <ModalCloseButton />
        </ModalHeader>
        <Divider />
        <ModalBody gap={4} p={0}>
          <VStack gap={4} w="full" align="flex-start">
            <HStack w="full" justify="space-between">
              <VStack gap={1} align="flex-start">
                <Text fontSize={14}>Захиалгын дугаар</Text>
                <Text fontWeight={700}>{`#${pointDetailData?.orderid}`}</Text>
              </VStack>
              <VStack gap={1} align="flex-end">
                <Text fontSize={14}>Захиалга хийсэн огноо</Text>
                <Text fontWeight={700}>{pointDetailData?.createdDate}</Text>
              </VStack>
            </HStack>
            <Divider />
            <VStack gap={4} align="flex-start" w="full">
              <Text fontWeight={700}>Авсан бараа</Text>
              {pointDetailData?.details?.map((item: any, index: number) => {
                return (
                  <OrderDetailCard
                    key={index}
                    articleid={item.part?.articleid}
                    productImage={item.part?.partimage}
                    productName={item.part?.category}
                    articleNumber={item.part?.articleno}
                    rank={4}
                    branchName={item.organization?.name}
                    branchRank={4}
                    price={item.price}
                    quantity={item.quantity}
                    total={item.totalamount}
                    index={index}
                    brandName={item.part?.brandname}
                  />
                );
              })}
              <Divider variant="dashed" />
            </VStack>
            <VStack gap={2} w="full">
              <HStack w="full" justify="space-between">
                <Text>Бараа тоо:</Text>
                <Text>{pointDetailData?.allquantity}</Text>
              </HStack>
              <HStack w="full" justify="space-between">
                <Text>Хүргэлт:</Text>
                <Text>
                  {pointDetailData?.deliverytotal
                    ? formatCurrency(pointDetailData?.deliverytotal)
                    : formatCurrency(0)}
                </Text>
              </HStack>
              <HStack w="full" justify="space-between">
                <Text>Нийт:</Text>
                <Text>{formatCurrency(pointDetailData?.paidtotal)}</Text>
              </HStack>
            </VStack>
            <Divider />
            <HStack w="full" justify="space-between">
              <Text fontWeight={600}>
                {type === "in" ? "Нэмэгдсэн бонус" : "Хасагдсан бонус"}:
              </Text>
              <Text color="#F75B00" fontSize={20} fontWeight={700}>
                {type === "in"
                  ? `+ ${formatNumber(point)} G`
                  : `- ${formatNumber(point)} G`}
              </Text>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
