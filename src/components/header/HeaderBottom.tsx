"use client";
import {
  HStack,
  Box,
  Text,
  Divider,
  Button,
  Image,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { CategoryDropDown } from "./CategoryDropDown";
import { UseApi } from "@/hooks/useApi";
import { GetHeaderCategory } from "@/services/category/headerCategory";
import { useEffect } from "react";
import { Category } from "../../../types/categoryResponse";
import { SubCategory } from "@/services";

import { useDispatch } from "react-redux";
import { setMainCategoryId } from "@/redux/slices/mainCateSlice";
type HeaderProps = {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
};
const HeaderBottom = (props: HeaderProps) => {
  const { isExpanded, setIsExpanded } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const [{ data, isLoading, error }, fetch] = UseApi({
    service: GetHeaderCategory,
  });
  const [{ data: subData, isLoading: subLoading, error: subError }, subFetch] =
    UseApi({
      service: SubCategory,
    });

  useEffect(() => {
    fetch();
  }, []);
  const pathname = usePathname();
  return (
    <>
      {/* Overlay */}

      <HStack
        bg="white"
        py={2}
        w="100%"
        alignItems="center"
        gap={{ base: 2, md: 6 }}
        display={{ base: "none", md: pathname === "/" ? "flex" : "none" }}
      >
        <Box>
          <CategoryDropDown />
        </Box>
        <Stack w="1px" height="24px" border={"0.5px solid #D0D5DD"} />
        <HStack gap={2} w={"full"}>
          {isLoading ? (
            <HStack gap={6}>
              {[1, 2, 3, 4, 5, 6].map((element) => (
                <Skeleton
                  key={element}
                  width={"70px"}
                  height={"30px"}
                  startColor="#F2F4F7"
                  endColor="#F2F4F7"
                />
              ))}
            </HStack>
          ) : (
            data?.map((item: Category, index: number) => (
              <Button
                variant="ghost"
                cursor={"pointer"}
                p="20px 24px"
                size={"sm"}
                _hover={{ bg: "#F2F4F7" }}
                fontWeight={700}
                key={index}
                onClick={() => {
                  subFetch({ categoryid: item.categoryid });
                  dispatch(setMainCategoryId(item.categoryid));
                  setIsExpanded(true);
                }}
                w="fit-content"
              >
                {item.name}
              </Button>
            ))
          )}
          <Button
            variant="ghost"
            cursor="pointer"
            // fontSize={{ base: "14px", md: "14px" }}
            p={"10px, 24px"}
            _hover={{ bg: "#F2F4F7" }}
            size={"sm"}
            fontWeight={700}
            onClick={() => {
              router.push("/sale-parts");
            }}
            w="fit-content"
            display="flex"
            alignItems="center"
            gap={2} // Adds spacing between the text and the tag
          >
            Хямдарсан бараа
            {/* NEW Tag */}
            {/* <Box
              bg="#F75B00" // Background color for the tag
              color="white"
              fontSize="10px"
              fontWeight="bold"
              px={2}
              py={0.5}
              borderRadius="full"
            >
              NEW
            </Box> */}
          </Button>
        </HStack>
        {/* <Link href="/quotation">
          <HStack gap={2}>
            <Button
              variant="ghost"
              leftIcon={<InfoIcon color="#1E1E1E" />}
              size={"sm"}
              fontWeight={700}
              justifySelf={"flex-end"}
              alignSelf={"flex-end"}
              iconSpacing={2}
            >
              Үнийн санал авах
              <Box
                bg="#F75B00"
                color="white"
                fontSize="12px"
                fontWeight={500}
                px={2}
                ml={2}
                py={0.5}
                borderRadius="full"
              >
                Компани
              </Box>
            </Button>
          </HStack>
        </Link> */}
      </HStack>

      {/* Expanded content */}
      <Divider />

      {isExpanded && (
        <Box
          w="full"
          px={"14px"}
          py="20px"
          display="grid"
          // gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
          gridTemplateColumns={"repeat(6, 1fr)"}
          gap={6}
          position="relative"
          zIndex={11}
        >
          {subLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((element) => (
                <Skeleton
                  key={element}
                  width={"120px"}
                  height={"66px"}
                  startColor="#F2F4F7"
                  endColor="#F2F4F7"
                  borderRadius={8}
                />
              ))
            : subData?.map((item: Category, index: number) => (
                <Box
                  cursor={"pointer"}
                  onClick={() => {
                    setIsExpanded(false);
                    router.push(`/product-list/${item.categoryid}`);
                  }}
                  key={index}
                  textAlign="center"
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Image
                    src={
                      item.image == null
                        ? "/product.svg"
                        : `${item.image.imgurl400}`
                    }
                    alt="Category Image"
                    w={"90px"}
                    h={"90px"}
                    fit={"contain"}
                    alignSelf={"center"}
                    justifySelf={"center"}
                  />
                  <Text
                    _hover={{ color: "#F75B00" }}
                    fontSize={"14px"}
                    fontWeight={700}
                    alignSelf={"center"}
                  >
                    {item.name}
                  </Text>
                </Box>
              ))}
        </Box>
      )}
    </>
  );
};

export default HeaderBottom;
