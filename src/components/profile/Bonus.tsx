"use client";
import { UseApi } from "@/hooks/useApi";
import { BorderlessUserIcon, RightArrow } from "@/icons";
import { GetReward } from "@/services/reward/getReward";

import {
  Button,
  Divider,
  HStack,
  Stack,
  Text,
  VStack,
  Highlight,
  Heading,
  Grid,
  GridItem,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";

import Image from "next/image";
import { useEffect, useState } from "react";
import { RewardModal } from "./RewardModal";
import { BonusModal } from "./BonusModal";
import { useDispatch } from "react-redux";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import { useRouter } from "next/navigation";
import { GetLotteries } from "@/services/user/getLotteries";

export const Bonus = (props: { clicked: string }) => {
  const { clicked } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeLotteries, setActiveLotteries] = useState(0);
  const [reward, setReward] = useState<any>("");
  const [giftid, setGiftid] = useState<any>(0);

  const {
    isOpen: rewardModalIsOpen,
    onClose: rewardModalOnClose,
    onOpen: rewardModalOnOpen,
  } = useDisclosure();

  const {
    isOpen: bonusModalIsOpen,
    onClose: bonusModalOnClose,
    onOpen: bonusModalOnOpen,
  } = useDisclosure();

  const [
    { data: rewardData, isLoading: rewardLoader, error: rewardError },
    rewardFetch,
  ] = UseApi({
    service: GetReward,
    useAuth: true,
  });

  const [
    { data: lotteriesData, isLoading: lotteriesLoader, error: lotteriesError },
    getLotteries,
  ] = UseApi({
    service: GetLotteries,
    useAuth: true,
  });

  useEffect(() => {
    if (clicked === "Урамшуулал" || clicked === "Урамшуулалууд") {
      rewardFetch();
      getLotteries();
    }
  }, [clicked]);

  useEffect(() => {
    setActiveLotteries(lotteriesData?.totallotteries);
  }, [lotteriesData]);

  const participateReward = (item: any, id: number) => {
    setGiftid(id);
    setReward(item);
  };

  return (
    <VStack
      w="100%"
      bg="white"
      borderRadius={8}
      p={{ base: 4, sm: 4, md: 4, lg: 0, xl: 0 }}
      gap={{ base: 4, sm: 4, md: 4, lg: 0, xl: 0 }}
      display={
        clicked === "Урамшуулал"
          ? "flex"
          : clicked === "Урамшуулалууд"
            ? "flex"
            : "none"
      }
      minH="100vh"
    >
      <VStack
        w="full"
        p={0}
        display={{
          base: "flex",
          sm: "flex",
          md: "flex",
          lg: "none",
          xl: "none",
        }}
      >
        <HStack
          mt={{ base: -8, md: 0 }}
          alignSelf="flex-start"
          fontSize={14}
          display={{
            base: "flex",
            sm: "flex",
            md: "flex",
            lg: "none",
            xl: "none",
          }}
          p={0}
          pb={4}
        >
          <Text
            onClick={() => {
              dispatch(setClickedSideBar({ clickedSideBar: "sideBar" }));
            }}
            cursor="pointer"
          >
            Home
          </Text>
          <Text fontSize={14}>|</Text>
          <Text fontWeight={600}>Бэлэгний жагсаалт</Text>
        </HStack>
        <HStack
          w="full"
          gap={0}
          display={{
            base: "flex",
            sm: "flex",
            md: "flex",
            lg: "none",
            xl: "none",
          }}
          p={1}
          bg="#F2F4F7"
          borderRadius={8}
        >
          <Button
            bg={clicked === "Урамшуулал" ? "#0B192C" : "#F2F4F7"}
            color={clicked !== "Урамшуулал" ? "#1e1e1e" : "#FFF"}
            onClick={() => {
              dispatch(setClickedSideBar({ clickedSideBar: "Урамшуулал" }));
            }}
            _hover={"none"}
          >
            Бэлэгний жагсаалт
          </Button>
          <Button
            color={clicked !== "Урамшуулал" ? "#fff" : "#1e1e1e"}
            bg={clicked !== "Урамшуулал" ? "#0B192C" : "#F2F4F7"}
            _hover={"none"}
            onClick={() => {
              dispatch(setClickedSideBar({ clickedSideBar: "Урамшуулалууд" }));
            }}
          >
            Таны сугалаа
          </Button>
        </HStack>
      </VStack>
      <VStack
        w="100%"
        bg="white"
        borderRadius={8}
        gap={8}
        display={clicked === "Урамшуулал" ? "flex" : "none"}
      >
        {rewardLoader ? (
          <Stack w="full">
            <Skeleton w="full" h={20} />
          </Stack>
        ) : rewardData ? (
          <VStack w="full" gap={8}>
            <VStack gap={6} w="full">
              <HStack
                w="full"
                justify="space-between"
                display={{
                  base: "none",
                  sm: "none",
                  md: "none",
                  lg: "flex",
                  xl: "flex",
                }}
              >
                <Text fontSize={20} fontWeight={700}>
                  Бэлэгний жагсаалт
                </Text>
                <Button
                  w="150px"
                  rightIcon={<RightArrow color="#fff" />}
                  onClick={() => {
                    dispatch(
                      setClickedSideBar({ clickedSideBar: "Урамшуулалууд" })
                    );
                    // router.push("/profile/lotteries");
                  }}
                >
                  Таны сугалаа
                </Button>
              </HStack>

              <Divider />
              <Stack
                w="full"
                height={{ base: 101, sm: 101, md: 101, lg: 186, xl: 186 }}
                pos={"relative"}
                borderRadius={16}
                overflow="hidden"
              >
                <Image
                  src={
                    rewardData?.reward?.imgurl || "/Profile-Bonus/image 48.png"
                  }
                  alt="garage.mn"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Stack>
              <Heading fontSize={{ base: 20, sm: 20, md: 20, lg: 24, xl: 24 }}>
                <Highlight
                  query={activeLotteries?.toString() || "0"}
                  styles={{ color: "#F75B00" }}
                >
                  {`Танд ${activeLotteries} сугалааны эрх байна`}
                </Highlight>
              </Heading>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    rewardData?.reward?.description ||
                    "<div>Одоогоор идэвхтэй сугалаа байхгүй</div>",
                }}
              ></div>
              <Button onClick={bonusModalOnOpen}>Сугалаа авах</Button>
              <BonusModal
                isOpen={bonusModalIsOpen}
                onClose={bonusModalOnClose}
              />
            </VStack>
            <VStack gap={6} w="full" align={"flex-start"}>
              <Text fontSize={20} fontWeight={700}>
                Хонжворын жагсаалт
              </Text>
              <Grid
                w="full"
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gap={4}
              >
                {rewardData?.reward?.gifts.map((item: any, index: number) => {
                  return (
                    <GridItem key={index}>
                      <VStack
                        w="full"
                        p={4}
                        border="1px solid #EDEDED"
                        borderRadius={8}
                        gap="16px"
                        align={"flex-start"}
                      >
                        <Stack
                          w="full"
                          h={{ base: 157, sm: 157, md: 157, lg: 238, xl: 238 }}
                          pos="relative"
                        >
                          <Image
                            src={item.imgurl || "/product.svg"}
                            alt="garage.mn"
                            fill
                          />
                        </Stack>
                        <Text fontSize={{ base: 14, md: 16 }} fontWeight={700}>
                          {item.name.toString()}
                        </Text>
                        <HStack gap={2}>
                          <BorderlessUserIcon />
                          <Text
                            fontSize={{ base: 12, md: 14 }}
                            fontWeight={600}
                          >{`${item.lotterycount} хүн оролцож байна`}</Text>
                        </HStack>
                        <Button
                          onClick={() => {
                            participateReward(item, item.giftid);
                            rewardModalOnOpen();
                          }}
                          fontSize={{ base: 13, md: 16 }}
                        >{`Оролцох  ${item.perlottery}/0`}</Button>
                      </VStack>
                    </GridItem>
                  );
                })}
              </Grid>
            </VStack>
          </VStack>
        ) : (
          <VStack w={"100%"} align="center" justify="center">
            <HStack
              w="full"
              justify="space-between"
              display={{
                base: "none",
                sm: "none",
                md: "none",
                lg: "flex",
                xl: "flex",
              }}
            >
              <Text fontSize={20} fontWeight={700}>
                Бэлэгний жагсаалт
              </Text>
              <Button
                w="150px"
                rightIcon={<RightArrow color="#fff" />}
                onClick={() => {
                  dispatch(
                    setClickedSideBar({ clickedSideBar: "Урамшуулалууд" })
                  );
                  // router.push("/profile/lotteries");
                }}
              >
                Таны сугалаа
              </Button>
            </HStack>
            <Divider my={4} />
            <Stack w={390} h={294} pos="relative">
              <Image
                src="/svgs/empty.svg"
                alt="garage.mn"
                fill
                priority={true}
              />
            </Stack>
            <Text color="#667085" fontSize={14} fontWeight={600}>
              Одоогоор идэвхтэй урамшуулал сугалаа байхгүй байна
            </Text>
          </VStack>
        )}
      </VStack>

      <RewardModal
        isOpen={rewardModalIsOpen}
        onClose={rewardModalOnClose}
        item={reward}
        userLotteries={activeLotteries?.toString() || "0"}
        giftid={giftid}
        setActiveLotteries={setActiveLotteries}
      />
    </VStack>
  );
};
