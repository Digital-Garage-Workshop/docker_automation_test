"use client";
import {
  HStack,
  Stack,
  Text,
  VStack,
  Grid,
  Button,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  DownArrow,
  InfoIcon,
  PockerZero,
  ShoppingCart,
  StorePay,
} from "@/icons";
import { useEffect, useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { ProductDetailModal } from "./ProductDetailModal";
import { formatCurrency } from "@/utils/number_formation";
import Rate from "../Rate";
import { useSelector } from "react-redux";
import { CircleCheck } from "@/icons/CircleCheck";
import { WarningIcon } from "@/icons/WarningIcon";

type AboutProductType = {
  mainImg: string;
  images?: string[];
  data: any;
};

export const Aboutproduct = (props: AboutProductType) => {
  const { mainImg, images, data } = props;
  const [showMore, setShowMore] = useState(false);
  const [branchShow, setBranchShow] = useState(false);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const carDetails = useSelector((state: any) => state.car);
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleBranchShowMore = () => {
    setBranchShow(!branchShow);
  };

  const attributes = Array.isArray(data?.attributes) ? data?.attributes : [];

  const attributesToShow = showMore ? attributes : attributes.slice(0, 7);
  const branchparts = data?.branchparts || [];
  const [selectedBranchPart, setSelectedBranchPart] = useState(branchparts[0]);

  useEffect(() => {
    setSelectedImage(mainImg);
  }, []);
  return (
    <Stack
      align="flex-start"
      w="100%"
      gap={6}
      flexDirection={{
        base: "column",
        sm: "column",
        md: "column",
        lg: "column",
        xl: "row",
      }}
    >
      <Stack
        gap="24px"
        align="flex-start"
        w={{ base: "100%", sm: "100%", md: "100%", lg: "100%", xl: "70%" }}
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
        }}
      >
        <Stack
          gap={"24px"}
          w={{ base: "100%", sm: "100%", md: "100%", lg: "100%", xl: 404 }}
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "column",
            xl: "column",
          }}
        >
          <Stack
            w={{ base: "100%", sm: "100%", md: "100%", lg: 380, xl: 404 }}
            height={{
              base: "361px",
              sm: "400px",
              md: "500px",
              lg: 380,
              xl: 404,
            }}
            pos="relative"
            bg="white"
            align="center"
            justify="center"
          >
            {data?.suitablecar !== null && (
              <HStack
                pos="absolute"
                top={-4}
                left={0}
                bg={data?.suitablecar ? "#039855" : "#F79009"}
                borderRadius="full"
                p={1}
                zIndex={11}
                role="group"
                overflow="hidden"
                width="auto"
                spacing={0}
              >
                {data?.suitablecar ? <CircleCheck /> : <WarningIcon />}
                <Text
                  color="white"
                  fontSize={12}
                  fontWeight={700}
                  maxW="full"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {data?.suitablecar
                    ? "Таны машинд тохироно"
                    : "Таны машинд тохирохгүй"}
                </Text>
              </HStack>
            )}
            <Image
              src={selectedImage || "/product.svg"}
              alt="garage.mn"
              fill
              style={{ objectFit: selectedImage ? "contain" : "cover" }}
            />
          </Stack>
          <Stack w="full" overflowX="auto">
            {" "}
            {/* Set horizontal scroll on Stack */}
            <Grid
              templateColumns={`repeat(${data?.images.length}, 80px)`} // Set fixed width for each item
              gap="14px"
            >
              {data?.images?.map((item: any, index: number) => (
                <Stack
                  key={index}
                  border={
                    selectedImage === item.imgurl400 ? "1px solid #F75B00" : ""
                  }
                  pos="relative"
                  width="80px"
                  height="80px"
                  bg="white"
                  onClick={() => setSelectedImage(item.imgurl400)}
                >
                  <Image
                    src={item.imgurl400 || "/product.svg"}
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Stack>
              ))}
            </Grid>
          </Stack>
        </Stack>
        //mobile
        <VStack
          gap={2}
          w="full"
          align="flex-start"
          display={{
            base: "flex",
            sm: "flex",
            md: "flex",
            lg: "none",
            xl: "none",
          }}
        >
          <Text fontSize={28} fontWeight={700} as="h1">
            {`${data?.brandname} ${data?.category}`}
          </Text>
          <HStack
            w="full"
            divider={<Stack borderColor="#1E1E1E" height="12px" />}
            gap={2}
          >
            <Text>{`Article number: ${data?.articleno}`}</Text>

            <Rate
              rank={data?.star || 4}
              fill="#F75B00"
              w="16"
              h="16"
              stroke="#F75B00"
            />
          </HStack>
        </VStack>
        //attr
        <VStack
          gap={2}
          w={{ base: "100%", sm: "100%", md: "100%", lg: "100%", xl: "50%" }}
        >
          <VStack gap={2} w="full">
            <HStack w="full" align="start">
              <Text
                fontSize={14}
                fontWeight={600}
                alignSelf="flex-start"
                flexShrink={0}
              >
                {`Брэнд:`}
              </Text>

              <Text fontSize={14} sx={{ wordBreak: "break-word" }} as="h1">
                {data?.brandname}
              </Text>
            </HStack>
            <Divider borderColor="#CFCFCF" />
          </VStack>
          <VStack gap={2} w="full">
            <HStack w="full" align="start">
              <Text
                fontSize={14}
                fontWeight={600}
                alignSelf="flex-start"
                flexShrink={0}
              >
                Эдийн дугаар:
              </Text>

              <Text fontSize={14} sx={{ wordBreak: "break-word" }}>
                {data?.articleno}
              </Text>
            </HStack>
            <Divider borderColor="#CFCFCF" />
          </VStack>
          {attributesToShow.map((attribute: any, index: number) => {
            return (
              <VStack gap={2} w="full" key={index}>
                <HStack w="full" align="start">
                  <Text
                    fontSize={14}
                    fontWeight={600}
                    // flexBasis="160px"
                    alignSelf="flex-start"
                    flexShrink={0}
                  >
                    {`${attribute.attributename}:`}
                  </Text>

                  <Text
                    fontSize={14}
                    // ml="32px"
                    sx={{ wordBreak: "break-word" }}
                    // flex="1"
                  >
                    {attribute.attributevalue}
                  </Text>
                </HStack>
                {index !== attributesToShow.length - 1 && (
                  <Divider borderColor="#CFCFCF" />
                )}
              </VStack>
            );
          })}

          {attributes.length > 9 && !showMore && (
            <Button
              p="8px 14px"
              rightIcon={<DownArrow color="#1e1e1e" w="20" h="20" />}
              variant="ghost"
              alignSelf="center"
              onClick={handleShowMore}
            >
              Илүүг харах
            </Button>
          )}
        </VStack>
      </Stack>
      //branch
      <VStack
        w={{ base: "100%", sm: "100%", md: "100%", lg: "40%", xl: "30%" }}
      >
        <VStack
          bg="white"
          p={"16px"}
          border={"1px solid #E4E7EC"}
          borderRadius={8}
          gap={4}
          w={"100%"}
          align="flex-start"
          alignSelf={{
            base: "flex-end",
            sm: "flex-end",
            md: "flex-end",
            lg: "flex-end",
            xl: "flex-start",
          }}
        >
          {data?.branchparts?.map((item: any, index: number) => {
            const isShown = index === 0;

            return (
              <VStack gap={4} w="full" key={index}>
                <HStack
                  key={item.branch}
                  w="100%"
                  align="center"
                  justify="space-between"
                >
                  //branch
                  <VStack gap={4} align="start">
                    <Text
                      fontSize={isShown ? 14 : 12}
                      color="#717171"
                      sx={{ display: isShown ? "flex" : "none" }}
                    >
                      Салбар:
                    </Text>
                    <VStack gap={1} align="flex-start">
                      <Stack
                        px={1.5}
                        bg="#E4E7EC"
                        borderRadius={8}
                        display={item.quantity !== 0 ? "none" : "flex"}
                      >
                        <Text fontSize={10} fontWeight={600} maxWidth={"100px"}>
                          Дууссан
                        </Text>
                      </Stack>
                      <Text
                        fontWeight={700}
                        maxWidth={120}
                        // height={}
                        sx={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.branch}
                      </Text>
                      {/* <Rate fill="#53BC00" rank={5} w="12" h="12" /> */}
                    </VStack>
                  </VStack>
                  <HStack gap={8}>
                    //price
                    <VStack gap={4} align="start">
                      <Text
                        fontSize={isShown ? 14 : 12}
                        color="#717171"
                        sx={{ display: isShown ? "flex" : "none" }}
                      >
                        Үнэ:
                      </Text>
                      <VStack gap={0} align="flex-end">
                        <HStack
                          justify="space-between"
                          align="flex-start"
                          gap={1}
                          sx={{ display: item.salepercent ? "flex" : "none" }}
                        >
                          <Text
                            fontSize={10}
                            fontWeight={700}
                            color="critical"
                          >{`${item.salepercent}%`}</Text>
                          <Text
                            as="del"
                            fontSize={10}
                            fontWeight={700}
                            color="#717171"
                            alignSelf="flex-end"
                          >
                            {formatCurrency(item.price)}
                          </Text>
                        </HStack>
                        <Text fontWeight={700} mt={item.quantity !== 0 ? 0 : 4}>
                          {formatCurrency(
                            item.pricesale ? item.pricesale : item.price
                          )}
                        </Text>
                      </VStack>
                    </VStack>
                    <Stack
                      cursor={item.quantity === 0 ? "not-allowed" : "pointer"}
                      w={10}
                      h={10}
                      align="center"
                      justify={"center"}
                      borderRadius="full"
                      bg={item.quantity === 0 ? "#F2F4F7" : "primary.500"}
                      alignSelf="flex-end"
                      _hover={{
                        bg: item.quantity === 0 ? "" : "primary.600",
                      }}
                      onClick={() => {
                        if (item.quantity !== 0) {
                          setSelectedBranchPart(item);
                          onOpen();
                        } else {
                          // showToast({
                          //   type: "warning",
                          //   title: "Сэлбэг дууссан байна",
                          //   description: "",
                          // });
                        }
                      }}
                    >
                      <ShoppingCart
                        color={item.quantity === 0 ? "#98A2B3" : "#FFF"}
                      />

                      {data && (
                        <ProductDetailModal
                          isOpen={isOpen}
                          onClose={onClose}
                          part={{
                            ...data,
                            branchparts: [selectedBranchPart],
                            images: { imgurl400: mainImg },
                          }}
                        />
                      )}
                    </Stack>
                  </HStack>
                </HStack>
                {index + 1 < data?.branchparts?.length && (
                  <Divider variant="dashed" borderColor="#CFCFCF" />
                )}
              </VStack>
            );
          })}

          {data?.branchparts?.length > 4 && !branchShow && (
            <Button
              p="8px 14px"
              rightIcon={<DownArrow color="#F75B00" w="20" h="20" />}
              variant="filled"
              alignSelf="center"
              color="#F75B00"
              onClick={handleBranchShowMore}
            >
              {`Өөр ${data?.branchparts?.length - 4} саналыг харах`}
            </Button>
          )}

          <HStack
            display={carDetails?.carId ? "none" : "flex"}
            borderRadius={8}
            bg="#FFFAEB"
            p="10px"
            align="flex-start"
          >
            <InfoIcon color="#DC6803" />
            <Text color="#DC6803" fontSize={14}>
              Тохирох хэсгүүдийг олохын тулд тээврийн хэрэгслийн мэдээллийг
              нэмнэ үү.
            </Text>
          </HStack>
        </VStack>
        <VStack gap={2} w="100%" mt={6}>
          <HStack w="100%" p="8px 16px" gap={2} bg="#fff" borderRadius="8px">
            <StorePay />
            <VStack gap={0} align="flex-start">
              <Text fontWeight={600} color="#1E1E1E" lineHeight="22px">
                Storepay
              </Text>
              <Text fontSize={12} color="#1E1E1E" lineHeight="16px">
                Storepay ашиглан 4 хуваан төлөх боломжтой
              </Text>
            </VStack>
          </HStack>
          <HStack w="100%" p="8px 16px" gap={2} bg="#fff" borderRadius="8px">
            <PockerZero />
            <VStack gap={0} align="flex-start">
              <Text fontWeight={600} color="#1E1E1E" lineHeight="22px">
                Pocket Zero
              </Text>
              <Text fontSize={12} color="#1E1E1E" lineHeight="16px">
                PocketZero ашиглан 4 хуваан төлөх боломжтой
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </Stack>
  );
};
