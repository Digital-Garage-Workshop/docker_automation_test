"use client";
import { DownArrow, RightArrow, ShoppingCart } from "@/icons";
import {
  HStack,
  Text,
  VStack,
  Button,
  Stack,
  useDisclosure,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Rate from "../Rate";
import { formatCurrency } from "@/utils/number_formation";
import { ProductDetailModal } from "../product-detail";
import { useDispatch } from "react-redux";
import { add } from "@/redux/slices/viewedProductSlice";
import { ChakraNextImage } from "../global/image";
import { CircleCheck } from "@/icons/CircleCheck";
import { WarningIcon } from "@/icons/WarningIcon";

type PartCardProps = {
  part?: any;
  isInWishlist?: boolean;
  isBordered?: boolean;
  isInPp?: boolean;
};

export const PartCard = (props: PartCardProps) => {
  const { part, isInWishlist, isBordered, isInPp } = props;
  const dispatch = useDispatch();
  const branchparts = part?.branchparts || [];
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [selectedBranchPart, setSelectedBranchPart] = useState(branchparts[0]);

  const router = useRouter();

  const handleAddToViewedList = () => {
    dispatch(add(part ? part : null));
  };

  return (
    <VStack
      cursor={"pointer"}
      p={4}
      gap={4}
      bg="white"
      w="100%"
      border={isBordered ? "1px solid #EDEDED" : "1px solid transparent"}
      _hover={{
        border: "1px solid #F75B00",
        transition: "border-color 300ms ease",
      }}
      borderRadius="8px"
      pos="relative"
      onClick={(e) => {
        e.preventDefault();
        handleAddToViewedList();

        if (e.button === 2) {
          window.open(`/product-detail/${part?.articleid}`, "_blank");
        } else if (e.button === 0) {
          router.push(`/product-detail/${part?.articleid}`);
        }
      }}
    >
      {part?.brandlogo && (
        <Stack pos={"absolute"} top={4} left={4} zIndex={11}>
          <ChakraNextImage
            src={part?.brandlogo?.imgurl400 || part?.brandlogo?.imgurl200}
            alt={`${part?.category || ""}`}
            style={{ objectFit: "cover" }}
            width={78}
            height={6}
          />
        </Stack>
      )}
      {part?.suitablecar !== null && (
        <HStack
          pos="absolute"
          top={4}
          right={4}
          bg={part?.suitablecar ? "#039855" : "#F79009"}
          borderRadius="full"
          p={1}
          // px={2}
          zIndex={11}
          role="group"
          overflow="hidden"
          display={isInWishlist ? "none" : "flex"}
          width="28px"
          _hover={{
            width: "auto",
          }}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          spacing={0}
        >
          {part?.suitablecar ? <CircleCheck /> : <WarningIcon />}
          <Text
            color="white"
            fontSize={12}
            fontWeight={700}
            maxW={0}
            overflow="hidden"
            _groupHover={{
              maxW: "200px",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            whiteSpace="nowrap"
          >
            {part?.suitablecar
              ? "Таны машинд тохироно"
              : "Таны машинд тохирохгүй"}
          </Text>
        </HStack>
      )}

      <Stack
        width={isInWishlist ? 226 : 243}
        height={136}
        pos="relative"
        onClick={(e) => {
          e.preventDefault();
          handleAddToViewedList();

          if (e.button === 2) {
            window.open(`/product-detail/${part?.articleid}`, "_blank");
          } else if (e.button === 0) {
            router.push(`/product-detail/${part?.articleid}`);
          }
        }}
      >
        <ChakraNextImage
          src={part?.images?.imgurl400 || "/product.svg"}
          alt={`${part?.category || "garage.mn"}`}
          style={{ objectFit: "contain" }}
          width={isInWishlist ? 226 : 243}
          height={136}
          loading="lazy"
        />
      </Stack>
      <VStack w="full" align="flex-start">
        {part && (
          <Rate
            rank={part.star || 4}
            fill="#F75B00"
            w="16"
            h="16"
            stroke="#F75B00"
          />
        )}
        <Heading
          fontWeight="bold"
          fontSize={"16px"}
          lineHeight="150%"
          maxW={{ base: "200px", lg: "fit-content" }}
          h={12}
          // style={{
          //   whiteSpace: "nowrap",
          //   overflow: "hidden",
          //   textOverflow: "ellipsis",
          // }}
          onClick={(e) => {
            // router.push(`/product-detail/${part?.articleid}`);
            e.preventDefault();
            handleAddToViewedList();

            if (e.button === 2) {
              window.open(`/product-detail/${part?.articleid}`, "_blank");
            } else if (e.button === 0) {
              router.push(`/product-detail/${part?.articleid}`);
            }
          }}
        >
          {`${part?.brandname} ${part?.category}`}
        </Heading>
        <Text fontSize={12} w="full">
          {part?.frontattribute || part?.category || ""}
        </Text>
      </VStack>
      <Text color="#717171" fontSize={12} w="full">
        {`Эдийн дугаар: ${part?.articleno}`}
      </Text>
      <VStack w="100%" h="130px" pos={"relative"}>
        {branchparts?.map((branchPart: any, index: any) => {
          if (index < 2 && part) {
            const isOutOfStock = branchPart.quantity === 0;

            return (
              <Stack w="full" key={index}>
                <HStack
                  w="100%"
                  justify="space-between"
                  align={"center"}
                  spacing={4}
                >
                  {/* Left Section - Branch Info */}
                  <VStack flex={1} align="flex-start" minW="0" spacing={2}>
                    {index === 0 && (
                      <Text fontSize="14px" color="#717171">
                        Салбар:
                      </Text>
                    )}
                    <VStack align="flex-start" spacing={0.5}>
                      {isOutOfStock && (
                        <Stack px={1.5} py={0.5} bg="#E4E7EC" borderRadius={8}>
                          <Text fontSize="10px" fontWeight={600}>
                            Дууссан
                          </Text>
                        </Stack>
                      )}
                      <Text
                        fontSize="14px"
                        fontWeight={700}
                        maxW={{
                          base: "90px",
                          // xl: "120px",
                          "2xl": isInPp ? "fit-content" : "90px",
                        }}
                        isTruncated
                      >
                        {branchPart.branch}
                      </Text>
                    </VStack>
                  </VStack>

                  {/* Middle Section - Price Info */}
                  <VStack align="flex-start" gap={2}>
                    {index === 0 && (
                      <Text
                        fontSize="14px"
                        color="#717171"
                        pos={"absolute"}
                        top={0}
                      >
                        Үнэ:
                      </Text>
                    )}
                    <VStack
                      align="flex-end"
                      gap={"2px"}
                      top={index === 0 ? 3.5 : 0}
                      pos={"relative"}
                    >
                      {branchPart.salepercent && (
                        <HStack gap="4px" mt={2}>
                          <Text
                            fontSize="10px"
                            fontWeight={700}
                            color="critical"
                          >
                            {branchPart.salepercent}%
                          </Text>
                          <Text
                            as="del"
                            fontSize="10px"
                            fontWeight={700}
                            color="#717171"
                            whiteSpace="nowrap"
                          >
                            {formatCurrency(branchPart.price)}
                          </Text>
                        </HStack>
                      )}
                      <Text
                        fontSize="14px"
                        fontWeight={700}
                        whiteSpace="nowrap"
                      >
                        {formatCurrency(
                          branchPart.pricesale || branchPart.price
                        )}
                      </Text>
                    </VStack>
                  </VStack>

                  {/* Right Section - Cart Button */}
                  <IconButton
                    pos={"relative"}
                    top={index === 0 ? 3 : 0}
                    icon={
                      <ShoppingCart
                        color={branchPart.quantity === 0 ? "#98A2B3" : "#FFF"}
                      />
                    }
                    aria-label="Add to cart"
                    variant="unstyled"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w={8}
                    h={10}
                    p={2}
                    borderRadius="99px"
                    bg={isOutOfStock ? "#F2F4F7" : "primary.500"}
                    color={isOutOfStock ? "#98A2B3" : "white"}
                    cursor={isOutOfStock ? "not-allowed" : "pointer"}
                    _hover={{
                      bg: isOutOfStock ? "#F2F4F7" : "primary.600",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isOutOfStock) {
                        setSelectedBranchPart(branchPart);
                        onOpen();
                      }
                    }}
                  />
                </HStack>

                {/* Divider */}
                {index === 0 && branchparts?.length >= 2 && (
                  <Stack
                    h="1px"
                    sx={{
                      borderBottomWidth: "1px",
                      borderBottomStyle: "dashed",
                      borderBottomColor: "#D0D5DD",
                    }}
                    my={2}
                  />
                )}
              </Stack>
            );
          }
          return null;
        })}
      </VStack>

      {branchparts?.length > 2 ? (
        <Button
          mt={2}
          variant="link"
          alignSelf="center"
          color={"#1e1e1e"}
          p="10px 24px"
          textDecor="underline"
          onClick={(e) => {
            // router.push(`/product-detail/${part?.articleid}`);
            e.preventDefault();
            handleAddToViewedList();

            if (e.button === 2) {
              window.open(`/product-detail/${part?.articleid}`, "_blank");
            } else if (e.button === 0) {
              router.push(`/product-detail/${part?.articleid}`);
            }
          }}
        >
          {` Өөр ${branchparts?.length - 2} саналыг харах`}
        </Button>
      ) : (
        <Button
          mt={2}
          variant={"outline"}
          borderRadius="8px"
          fontSize="14px"
          fontWeight="bold"
          rightIcon={<RightArrow color={"#1E1E1E"} />}
          onClick={(e) => {
            handleAddToViewedList();
            e.preventDefault();

            if (e.button === 2) {
              window.open(`/product-detail/${part?.articleid}`, "_blank");
            } else if (e.button === 0) {
              router.push(`/product-detail/${part?.articleid}`);
            }
          }}
        >
          Дэлгэрэнгүй
        </Button>
      )}

      {part && (
        <ProductDetailModal
          isOpen={isOpen}
          onClose={onClose}
          part={{ ...part, branchparts: [selectedBranchPart] }}
        />
      )}
    </VStack>
  );
};
