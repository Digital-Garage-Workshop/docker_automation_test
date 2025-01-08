"use client";
import { UseApi } from "@/hooks/useApi";
import { useCustomToast } from "@/hooks/useCustomToast";
import { LinkIcon, StarIcon, UserIcon } from "@/icons";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import { InvitedFriends } from "@/services/user/invitedFriends";
import {
  Button,
  Divider,
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const InviteFriends = (props: { clicked: string }) => {
  const { clicked } = props;
  const dispatch = useDispatch();
  const showToast = useCustomToast();
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: InvitedFriends,
    useAuth: true,
  });

  useEffect(() => {
    if (clicked === "Найзаа урих") fetch();
  }, [clicked]);

  const copyToClipboard = () => {
    if (data?.refferalcode !== undefined) {
      navigator.clipboard.writeText(data?.refferalcode).then(() => {
        showToast({
          type: "success",
          title: "Амжилттай хуулагдлаа!",
          description: "",
        });
      });
    } else {
      showToast({
        type: "error",
        title: "Амжилтгүй дахин хуулна уу!",
        description: "",
      });
    }
  };

  return (
    <VStack
      gap={8}
      bg="#fff"
      borderRadius={8}
      w="100%"
      p="16px 24px"
      display={clicked === "Найзаа урих" ? "flex" : "none"}
    >
      <HStack
        mt={-4}
        alignSelf="flex-start"
        fontSize={14}
        display={{
          base: "flex",
          sm: "flex",
          md: "flex",
          lg: "none",
          xl: "none",
        }}
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
        <Text fontWeight={600}>Найзаа урих</Text>
      </HStack>
      <VStack gap={6} w="full">
        <HStack w="full" justify="space-between">
          <VStack gap={1} align="flex-start" w="full">
            <Text fontSize={20} fontWeight={700}>
              Найзаа урих
            </Text>
            {/* <Text fontSize={{ base: 12, sm: 12, md: 12, lg: 16, xl: 16 }}>
              Та найзаа уриад 20’000 хүртэлх G point авах боломжтой
            </Text> */}
          </VStack>
          <Button
            variant="outline"
            leftIcon={<LinkIcon color="#1e1e1e" />}
            onClick={copyToClipboard}
            w="fit-content"
            display={{
              base: "none",
              sm: "none",
              md: "none",
              lg: "flex",
              xl: "flex",
            }}
          >
            Хуваалцах
          </Button>
        </HStack>
        <Stack
          w="full"
          gap={0}
          align={"center"}
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          }}
        >
          <HStack
            p={2}
            gap={2}
            rounded={8}
            border="1px solid #E4E7EC"
            w={{ base: "full", md: "fit-content" }}
          >
            <Stack bg="#E4E7EC" px={2} rounded={32} color="#1E1E1E">
              <Text>1</Text>
            </Stack>
            <Text fontSize={12} fontWeight={700}>
              Холбоосыг найзруугаа илгээх
            </Text>
          </HStack>
          <Stack
            w={{ base: "1px", sm: "1px", md: "1px", lg: "32px", xl: "32px" }}
            h={{ base: "16px", sm: "16px", md: "16px", lg: "1px", xl: "1px" }}
            alignSelf={{ base: "flex-start", md: "center" }}
            ml={{ base: "18px", md: 0 }}
            bg="#E4E7EC"
          />
          <HStack
            p={2}
            gap={2}
            rounded={8}
            border="1px solid #E4E7EC"
            w={{ base: "full", md: "fit-content" }}
          >
            <Stack bg="#E4E7EC" px={2} rounded={32} color="#1E1E1E">
              <Text>2</Text>
            </Stack>
            <Text fontSize={12} fontWeight={700} whiteSpace="nowrap">
              Таны найз Digital Garage -д бүртгүүлэх
            </Text>
          </HStack>
          <Stack
            w={{ base: "1px", sm: "1px", md: "1px", lg: "32px", xl: "32px" }}
            h={{ base: "16px", sm: "16px", md: "16px", lg: "1px", xl: "1px" }}
            alignSelf={{ base: "flex-start", md: "center" }}
            ml={{ base: "18px", md: 0 }}
            bg="#E4E7EC"
          />
          <HStack
            p={2}
            gap={2}
            rounded={8}
            border="1px solid #E4E7EC"
            w={{ base: "full", md: "fit-content" }}
          >
            <Stack bg="#E4E7EC" px={2} rounded={32} color="#1E1E1E">
              <Text>3</Text>
            </Stack>
            <Text fontSize={12} fontWeight={700}>
              5 найз 10’000G Point
            </Text>
          </HStack>
        </Stack>
        <Divider />
        <VStack gap={2} align={"flex-start"} w="full">
          <HStack gap={2}>
            <Stack bg="#F75B00" rounded={32} p={"3px"}>
              <StarIcon color="inherit" stroke="#fff" w="18" h="18" />
            </Stack>
            <Text fontWeight={700} fontSize={20}>
              10’000 G Point
            </Text>
          </HStack>
          <Text fontSize={18} fontWeight={600}>
            0 / 3 найзаа урисан байна
          </Text>
        </VStack>
        <HStack w="full" gap={2}>
          {Array(5)
            .fill(1)
            .map((item, index) => {
              if (data?.invitedusers?.length > index) {
                return (
                  <Stack
                    key={index}
                    h={2}
                    flex={1}
                    borderRadius={8}
                    bg="#53BC00"
                  />
                );
              } else {
                return (
                  <Stack
                    key={index}
                    h={2}
                    flex={1}
                    borderRadius={8}
                    bg="#EDEDED"
                  />
                );
              }
            })}
        </HStack>
        {isLoading ? (
          Array(data?.lenght)
            .fill("")
            .map((item: any, index: number) => {
              return (
                <HStack key={item}>
                  <Skeleton height="40px" width="100%" />
                  <SkeletonText noOfLines={2} spacing="4" width="100%" />
                </HStack>
              );
            })
        ) : data?.invitedusers?.length !== 0 ? (
          data?.invitedusers?.map((item: any, index: number) => (
            <HStack
              key={index}
              border={"1px solid #EDEDED"}
              borderRadius={8}
              gap={4}
              p="8px 16px"
              w="full"
            >
              <UserIcon color="#1e1e1e" />
              <Text fontWeight={600}>{item}</Text>
            </HStack>
          ))
        ) : (
          <VStack w={"100%"} align="center" justify="center" pb={20}>
            <Stack pos="relative" justify={"center"} alignSelf="center">
              <Image
                src="/svgs/empty.svg"
                alt="garage.mn"
                width={390}
                height={294}
              />
            </Stack>
            <Text color="#667085" fontSize={14} fontWeight={600}>
              Танд урьсан найз одоогоор байхгүй байна
            </Text>
          </VStack>
        )}
      </VStack>

      <Stack
        w="100vw"
        bg="white"
        p={4}
        pos="fixed"
        bottom={0}
        display={{
          base: "flex",
          sm: "flex",
          md: "flex",
          lg: "none",
          xl: "none",
        }}
      >
        <Button
          variant="solid"
          fontSize={14}
          fontWeight={600}
          p="8px 14px"
          w="full"
          onClick={copyToClipboard}
          leftIcon={<LinkIcon color="#fff" />}
        >
          Хуваалцах
        </Button>
      </Stack>
    </VStack>
  );
};
