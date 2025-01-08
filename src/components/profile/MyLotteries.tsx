import { UseApi } from "@/hooks/useApi";

import {
  HStack,
  Stack,
  Text,
  VStack,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GetUserLotteries } from "@/services/user/getUserLotteries";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";

export const MyLotteries = (props: { clicked: string }) => {
  const { clicked } = props;
  const dispatch = useDispatch();
  const {
    isOpen: rewardModalIsOpen,
    onClose: rewardModalOnClose,
    onOpen: rewardModalOnOpen,
  } = useDisclosure();

  const [
    {
      data: userLotteries,
      isLoading: userLotteriesLoader,
      error: userLotteriesError,
    },
    getUserLotteries,
  ] = UseApi({
    service: GetUserLotteries,
    useAuth: true,
  });

  useEffect(() => {
    if (clicked === "Урамшуулалууд") {
      getUserLotteries();
    }
  }, [clicked]);

  if (userLotteriesLoader)
    return (
      <VStack w="100%" bg="white" borderRadius={8} gap={8} p={4}>
        <Stack w="full" alignItems="center">
          <Skeleton height="20px" width="120px" />
          <Skeleton height="48px" width="180px" />
        </Stack>

        <HStack
          w="full"
          bg="#F3F4F6"
          borderRadius={8}
          p={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton width="60px" borderRadius="full" />

          <VStack align="flex-start" spacing={2} w="70%">
            <Skeleton height="16px" width="80px" />

            <Grid
              templateColumns="repeat(auto-fill, minmax(60px, 1fr))"
              gap={2}
              w="full"
            >
              {Array.from({ length: 15 }).map((_, index) => (
                <Skeleton key={index} height="32px" borderRadius="8px" />
              ))}
            </Grid>
          </VStack>

          <Skeleton height="16px" width="80px" />
        </HStack>
      </VStack>
    );

  return (
    <VStack
      w="100%"
      bg="white"
      borderRadius={8}
      gap={8}
      p={4}
      display={clicked === "Урамшуулалууд" ? "flex" : "none"}
    >
      {userLotteries ? (
        <Stack w="full">
          <VStack alignSelf="center">
            <Text fontSize={20} fontWeight={700}>
              ТОХИРЛЫН ӨДӨР
            </Text>
            <Text fontSize={48} color="#F75B00">
              {`${userLotteries?.enddate?.slice(0, 10)}`}
            </Text>
          </VStack>
          <VStack w="full" gap={"26px"}>
            {userLotteries?.gifts?.map((item: any, index: number) => {
              return (
                <HStack
                  p={4}
                  gap={6}
                  w="full"
                  border="1px solid #E4E7EC"
                  borderRadius={8}
                  key={index}
                >
                  <Stack
                    pos="relative"
                    w={124}
                    h={127}
                    borderRadius={8}
                    overflow="hidden"
                    alignSelf="flex-start"
                    display={{
                      base: "none",
                      sm: "none",
                      md: "none",
                      lg: "flex",
                      xl: "flex",
                    }}
                  >
                    <Image
                      src={item.imgurl || "/product.svg"}
                      alt="garage.mn"
                      fill
                    />
                  </Stack>
                  <VStack
                    gap={6}
                    w="100%"
                    alignSelf="flex-start"
                    justifySelf="flex-end"
                  >
                    <HStack w="full" justify="space-between">
                      <Stack
                        pos="relative"
                        w={59}
                        h={59}
                        borderRadius={8}
                        overflow="hidden"
                        alignSelf="flex-start"
                        display={{
                          base: "flex",
                          sm: "flex",
                          md: "flex",
                          lg: "none",
                          xl: "none",
                        }}
                      >
                        <Image
                          src={item.imgurl || "/product.svg"}
                          alt="garage.mn"
                          fill
                        />
                      </Stack>
                      <Stack
                        w={{
                          base: "fit-content",
                          sm: "fit-content",
                          md: "fit-content",
                          lg: "100%",
                          xl: "100%",
                        }}
                        justify="space-between"
                        flexDirection={{
                          base: "column",
                          sm: "column",
                          md: "column",
                          lg: "row",
                          xl: "row",
                        }}
                        alignSelf="flex-start"
                      >
                        <Text fontSize={18} fontWeight={700}>
                          {item.name}
                        </Text>
                        <Text>{`${userLotteries?.enddate?.slice(0, 10)}`}</Text>
                      </Stack>
                      <Stack
                        bg="#E4E7EC"
                        borderRadius={8}
                        p="4px 8px"
                        alignSelf="flex-start"
                        display={{
                          base: "flex",
                          sm: "flex",
                          md: "flex",
                          lg: "none",
                          xl: "none",
                        }}
                      >
                        <Text>{`x${item.lotteries?.length}`}</Text>
                      </Stack>
                    </HStack>
                    <HStack w="full" justify="space-between">
                      <Grid
                        w="90%"
                        templateColumns={"repeat(auto-fit, minmax(100px, 1fr))"}
                        gap={2}
                        alignSelf="flex-start"
                      >
                        {item.lotteries.map((lotteries: any, index: number) => {
                          return (
                            <Stack
                              key={index}
                              border="1px solid #D0D5DD"
                              borderRadius={8}
                              px={2}
                              bg={
                                item.iswinner
                                  ? "linear-gradient(180deg, #F75B00 0%, #FFD378 100%)"
                                  : "transparent"
                              }
                            >
                              <Text color={item.iswinner ? "#fff" : "#475467"}>
                                {lotteries.lotterynumber}
                              </Text>
                            </Stack>
                          );
                        })}
                      </Grid>
                      <Stack
                        bg="#E4E7EC"
                        borderRadius={8}
                        p="4px 8px"
                        alignSelf="flex-end"
                        display={{
                          base: "none",
                          sm: "none",
                          md: "none",
                          lg: "flex",
                          xl: "flex",
                        }}
                      >
                        <Text>{`x${item.lotteries?.length}`}</Text>
                      </Stack>
                    </HStack>
                  </VStack>
                </HStack>
              );
            })}
          </VStack>
        </Stack>
      ) : (
        <VStack w={"100%"} align="center" justify="center">
          <Stack w={390} h={390} pos="relative">
            <Image src="/svgs/empty.svg" alt="garage.mn" fill priority={true} />
          </Stack>
          <Text color="#667085" fontSize={14} fontWeight={600}>
            Одоогоор танд идэвхтэй сугалаа байхгүй байна
          </Text>
        </VStack>
      )}
    </VStack>
  );
};
