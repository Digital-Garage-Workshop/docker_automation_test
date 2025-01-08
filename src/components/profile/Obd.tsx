"use client";

import { Grid, GridItem, HStack, Stack, Text, VStack } from "@chakra-ui/react";

import { AppStore, GooglePlay } from "@/icons";
import Image from "next/image";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

const sequence = [
  {
    number: 1,
    title: "Plug to Car",
    description: "Plug the device into your car’s OBD2 port. And do it",
  },
  {
    number: 2,
    title: "Plug to Car",
    description: "Plug the device into your car’s OBD2 port. And do it",
  },
  {
    number: 3,
    title: "Plug to Car",
    description: "Plug the device into your car’s OBD2 port. And do it",
  },
];

const functions = [
  {
    image: "/Profile-OBD/obd.svg",
    title: "Diagnostics",
    description:
      "Хэдэн минутын дотор машиныхаа системийг сканнердах. Асуудлын кодыг хялбархан оношлох, чухал асуудлуудыг тодорхойлж, жижиг алдааг өөрөө арилгана.",
  },
  {
    image: "/Profile-OBD/obd.svg",
    title: "Customizations",
    description:
      "Нэг товшилтоор машины тав тух, үйлчилгээний онцлогийг идэвхжүүлж, унтрааж, тохируулаарай. Бид танд зориулж кодчилол хийсэн.",
  },
  {
    image: "/Profile-OBD/obd.svg",
    title: "VAG Coding",
    description:
      "SFD түгжигдсэн функцүүдэд нэвтэрч, туршлагатай машин сонирхогчид болон семинарт зориулсан кодчилол, дасан зохицох тусламжтайгаар машины тохиргоог дараагийн түвшинд ав.",
  },
];
export const Obd = (props: { clicked: string }) => {
  const { clicked } = props;
  const dispatch = useDispatch();

  return (
    <VStack
      gap={8}
      borderRadius={8}
      overflow="hidden"
      bg="white"
      w={"100%"}
      display={clicked === "OBD" ? "flex" : "none"}
      pb={53}
    >
      <HStack
        alignSelf="flex-start"
        fontSize={14}
        display={{
          base: "flex",
          sm: "flex",
          md: "flex",
          lg: "none",
          xl: "none",
        }}
        px={4}
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
        <Text fontWeight={600}>OBD</Text>
      </HStack>
      <VStack gap={20} w="full" align="flex-start">
        <VStack
          pos="relative"
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "flex",
            xl: "flex",
          }}
          align="flex-start"
          justify="flex-start"
          w="full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="870"
            height="434"
            viewBox="0 0 870 434"
            fill="none"
            style={{ alignSelf: "flex-start", position: "relative", left: 0 }}
          >
            <path
              d="M0 0H870L834.568 74.4185C685.93 386.607 313.25 520.386 0 374V0Z"
              fill="url(#paint0_linear_2428_118264)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2428_118264"
                x1="119"
                y1="71"
                x2="100%"
                y2="427"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0B192C" />
                <stop offset="1" stopColor="#255392" />
              </linearGradient>
            </defs>
          </svg>

          <VStack
            gap={8}
            maxW={400}
            align="flex-start"
            pos="absolute"
            top="77px"
            left={20}
          >
            <VStack gap={4}>
              <Text fontSize={32} fontWeight={700} color="white">
                Жолооч бүрт хялбар машины оношилгоо
              </Text>
              <Text color="white">
                Ухаалаг утсан дээрээ хэдхэн товшилтоор алдааг оношилж,
                функцуудыг тохируулж, машиныхаа гүйцэтгэлийг сайжруулаарай.
              </Text>
            </VStack>
            <HStack gap={4}>
              <GooglePlay />
              <AppStore />
            </HStack>
          </VStack>
          <VStack w={283} h={402} pos="absolute" top={53} right={20}>
            <Image src="/Profile-OBD/iphone.svg" alt="OBD" fill />
          </VStack>
        </VStack>
        <Stack
          bg="linear-gradient(110deg, #0B192C 13.01%, #255392 89.96%)"
          w="full"
          h={360}
          align="center"
          justify="center"
          display={{
            base: "flex",
            sm: "flex",
            md: "flex",
            lg: "none",
            xl: "none",
          }}
          p={4}
        >
          <VStack gap={8} maxW={400}>
            <VStack gap={4}>
              <Text
                fontSize={32}
                fontWeight={700}
                color="white"
                textAlign="center"
              >
                Жолооч бүрт хялбар машины оношилгоо
              </Text>
              <Text color="white" textAlign="center">
                Ухаалаг утсан дээрээ хэдхэн товшилтоор алдааг оношилж,
                функцуудыг тохируулж, машиныхаа гүйцэтгэлийг сайжруулаарай.
              </Text>
            </VStack>
            <HStack gap={4}>
              <Link href="https://play.google.com/store/apps/details?id=com.garage.digital_garage">
                <GooglePlay />
              </Link>
              <Link href=" https://apps.apple.com/mn/app/tsakhim-digital-garage/id6476136787">
                <AppStore />
              </Link>
            </HStack>
          </VStack>
        </Stack>
        <VStack
          w={283}
          h={402}
          pos="relative"
          justifySelf="center"
          alignSelf="center"
          display={{
            base: "flex",
            sm: "flex",
            md: "flex",
            lg: "none",
            xl: "none",
          }}
          right={10}
        >
          <Image src="/Profile-OBD/iphone.svg" alt="OBD" fill />
        </VStack>
        <VStack gap={8} px={{ base: 4, sm: 4, md: 4, lg: 20, xl: 20 }} w="full">
          <Text fontSize={20} fontWeight={700}>
            Яаж ажилладаг вэ?
          </Text>
          <Grid
            w="full"
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap="15px"
          >
            {sequence.map((item: any, index: number) => {
              return (
                <GridItem key={index} w="full">
                  <VStack
                    p="16px 24px"
                    border="1px solid #E4E7EC"
                    borderRadius={8}
                    gap={8}
                    align="flex-start"
                  >
                    <HStack gap={2} w="full">
                      <Stack
                        w={6}
                        h={6}
                        borderRadius="full"
                        bg="linear-gradient(180deg, #F75B00 0%, #FFA146 100%)"
                        align="center"
                        justify="center"
                        color="white"
                      >
                        <Text fontWeight={700} fontSize={14}>
                          {item.number}
                        </Text>
                      </Stack>
                      <Text fontWeight={700} fontSize={14}>
                        {item.title}
                      </Text>
                    </HStack>
                    <Text fontSize={14}>{item.description}</Text>
                  </VStack>
                </GridItem>
              );
            })}
          </Grid>
        </VStack>
        <VStack gap={8} px={{ base: 4, sm: 4, md: 4, lg: 20, xl: 20 }}>
          <Text fontSize={20} fontWeight={700}>
            Танд таалагдах функцууд
          </Text>
          <Grid
            w="full"
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap="15px"
          >
            {functions.map((item: any, index: number) => {
              return (
                <GridItem key={index} w="full">
                  <VStack
                    p="16px"
                    border="1px solid #E4E7EC"
                    borderRadius={8}
                    gap={4}
                    h={{ base: "fit", sm: "fit", md: "fit", lg: 410, xl: 410 }}
                  >
                    <Stack
                      w={"full"}
                      h={209}
                      pos="relative"
                      borderRadius={8}
                      overflow="hidden"
                    >
                      <Image
                        src={item.image}
                        alt="OBD"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Stack>
                    <VStack gap={1} w="full" align="flex-start">
                      <Text fontWeight={700} fontSize={14}>
                        {item.title}
                      </Text>
                      <Text fontSize={12}>{item.description}</Text>
                    </VStack>
                  </VStack>
                </GridItem>
              );
            })}
          </Grid>
        </VStack>
      </VStack>
    </VStack>
  );
};
