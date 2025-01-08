"use client";
import { NarrowEditIcon, OrangePlusIcon, TrashbinIcon } from "@/icons";
import {
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  useDisclosure,
  Skeleton,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { AreYouSureModal } from "./AreYouSureModal";
import { PartCard } from "../best-seller";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  remove,
  selectViewedProducts,
} from "@/redux/slices/viewedProductSlice";
import { setClickedSideBar } from "@/redux/slices/profileSlice";

export const ViewedProducts = (props: { clicked: string }) => {
  const { clicked } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const data = useSelector(selectViewedProducts);

  const emptyProducts = () => {
    dispatch(clear());
    onClose();
  };

  return (
    <VStack
      p={"16px 24px"}
      gap={8}
      borderRadius={8}
      w={"100%"}
      display={clicked === "Үзсэн" ? "flex" : "none"}
      bg={{
        base: "transparent",
        sm: "transparent",
        md: "transparent",
        lg: "white",
        xl: "white",
      }}
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
        <Text fontWeight={600}>Миний үзсэн бараа </Text>
      </HStack>
      <HStack w="full" justify="space-between">
        <VStack gap={1} align="flex-start">
          <Text fontSize={20} fontWeight={700}>
            Миний үзсэн бараа ({data?.length})
          </Text>
          {/* <Text fontSize={12}>
            Та хүргэлтийн хаягаа оруулснаар захиалга хийхдээ тухайн хаягийг
            хялбар ашиглах боломжтой
          </Text> */}
        </VStack>
        {data?.length > 0 && (
          <Button
            variant="outline"
            fontSize={14}
            fontWeight={600}
            p="8px 14px"
            w="fit-content"
            leftIcon={<TrashbinIcon color="#1E1E1E" w="20" h="20" />}
            onClick={onOpen}
          >
            Хоослох
          </Button>
        )}
        <AreYouSureModal
          isOpen={isOpen}
          onClose={onClose}
          title="Та үзсэн бараануудаа хоослохдоо итгэлтэй байна уу?"
          description=""
          buttonString="Хоослох"
          action={emptyProducts}
        />
      </HStack>
      <Divider />

      {data?.length === 0 ? (
        <VStack w={"75%"} align="center">
          <Stack w={390} h={294} pos="relative">
            <Image src="/svgs/empty.svg" alt="garage.mn" fill priority={true} />
          </Stack>
          <Text color="#667085" fontSize={14} fontWeight={600}>
            Танд үзсэн бүтээгдэхүүн одоогоор байхгүй байна
          </Text>
        </VStack>
      ) : (
        <Grid
          w="full"
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {data?.map((item: any, index: number) => (
            <GridItem key={index}>
              <PartCard part={item} isBordered={true} />
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  );
};
