"use client";
import { UseApi } from "@/hooks/useApi";
import { useCustomToast } from "@/hooks/useCustomToast";
import { MinusIcon, PlusIcon } from "@/icons";
import { ParticipateLottery } from "@/services/user/participateLottery";
import {
  Button,
  Divider,
  Heading,
  Highlight,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type RewardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  userLotteries: string;
  giftid: number;
  setActiveLotteries: Dispatch<SetStateAction<number>>;
};

export const RewardModal = (props: RewardModalProps) => {
  const { onClose, isOpen, item, userLotteries, giftid, setActiveLotteries } =
    props;
  const [lotteryCount, setLotteryCount] = useState(0);
  const showToast = useCustomToast();

  const [
    {
      data: participateLotteryData,
      isLoading: participateLotteryLoader,
      error: participateLotteryError,
    },
    participateLottery,
  ] = UseApi({
    service: ParticipateLottery,
    useAuth: true,
  });

  const handleParticipate = () => {
    if (lotteryCount > 0)
      participateLottery({
        giftid: giftid,
        lotteries: lotteryCount,
      });
    showToast({
      type: "warning",
      title: "Анхааруулга",
      description: "Та сугалаанд оролцох эрхгүй байна.",
    });
  };

  useEffect(() => {
    if (participateLotteryData === "" || participateLotteryData) {
      showToast({
        type: "success",
        title: "Амжилттай",
        description: "Та сугалаанд амжилттай оролцлоо",
      });
      setActiveLotteries((prev) => prev - lotteryCount);
    }
  }, [participateLotteryData]);

  useEffect(() => {
    if (participateLotteryError) {
      showToast({
        type: "error",
        title: "Амжилтгүй",
        description: "Та дахин оролцоно уу",
      });
    }
  }, [participateLotteryError]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent w="480px" gap={6} p={6} m={4}>
        <ModalHeader w="full" p={0}>
          <Text fontSize={20} fontWeight={700}>
            Сугалаанд оролцох
          </Text>
          <ModalCloseButton />
        </ModalHeader>
        <Divider />
        <ModalBody w="full" p={0}>
          <Stack h={"250"} w={"250px"} pos="relative" justifySelf="center">
            <Image src={item.imgurl || "/product.svg"} fill alt="garage.mn" />
          </Stack>
          <VStack>
            <Text fontSize={20} fontWeight={700}>
              {item.name}
            </Text>
            <Text>{item.description}</Text>
          </VStack>
        </ModalBody>
        <Divider variant="dashed" />
        <ModalFooter alignItems="center" justifyContent="center" w="full" p={0}>
          <VStack w="full" gap={6}>
            <Heading fontSize={14}>
              <Highlight query={userLotteries} styles={{ color: "#F75B00" }}>
                {`Танд ${userLotteries} сугалааны эрх байна`}
              </Highlight>
            </Heading>
            <HStack w="full" gap={6}>
              <HStack gap={4}>
                <Stack
                  p={1}
                  bg="#F2F4F7"
                  borderRadius="full"
                  onClick={() => {
                    if (lotteryCount > 0) {
                      setLotteryCount((prev) => prev - 1);
                    }
                  }}
                >
                  <MinusIcon />
                </Stack>
                <Text fontWeight={600}>{lotteryCount}</Text>
                <Stack
                  p={1}
                  bg="#F2F4F7"
                  borderRadius="full"
                  onClick={() => {
                    if (lotteryCount < parseInt(userLotteries)) {
                      setLotteryCount((prev) => prev + 1);
                    }
                  }}
                >
                  <PlusIcon />
                </Stack>
              </HStack>
              <Button
                onClick={handleParticipate}
                isLoading={participateLotteryLoader}
              >
                Оролцох
              </Button>
            </HStack>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
