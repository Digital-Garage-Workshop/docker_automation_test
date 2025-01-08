"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Grid,
  GridItem,
  Box,
  HStack,
  Text,
  Spinner,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Divider,
  Skeleton,
  SkeletonText,
  Heading,
} from "@chakra-ui/react";
import { CatalogCard } from "./index";
import { UseApi } from "@/hooks/useApi";
import { SubCategory } from "@/services";
import { CloseIcon, DownArrow } from "@/icons";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ChakraNextImage } from "../global/image";
import { useCustomToast } from "@/hooks/useCustomToast";
import { setMainCategoryId } from "@/redux/slices/mainCateSlice";
import { SubCategories } from "../no-car-selected-search-comps/SubCategories";
import { useScrollContext } from "@/providers/ScrollContext";

type CatalogGridProps = {
  data: any;
  isExpandable: boolean;
  isAll: boolean;
};

export const CatalogGrid = (props: CatalogGridProps) => {
  const { data, isExpandable, isAll } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState<number | null>(
    null
  );
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [clickedRow, setClickedRow] = useState<number | null>(null);
  const [clickedSubcategory, setClickedSubcategory] = useState<number>(1);
  const [visibleItems, setVisibleItems] = useState<number>(
    isAll ? 1000 : isExpandable ? 6 : 12
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const subcategoryRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the subcategory row when it's opened
    if (isSubcategoryOpen !== null && subcategoryRowRef.current) {
      subcategoryRowRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isSubcategoryOpen]);
  // const [subCategory, setSubCategory] = useState<any[]>([]);
  // const [isSubcategoryLoading, setIsSubcategoryLoading] =
  //   useState<boolean>(false);

  const [
    { data: subCategory, isLoading: subLoader, error: subError },
    subFetch,
  ] = UseApi({
    service: SubCategory,
  });

  const carDetails = useSelector((state: any) => state.car);
  const showToast = useCustomToast();

  // const fetchSubcategories = async (categoryId: number, carId?: number) => {
  //   try {
  //     setIsSubcategoryLoading(true);
  //     const res = await fetch(
  //       `/api/subcategories?categoryId=${categoryId}&carId=${carId}`
  //     );
  //     const { data } = await res.json();
  //     setSubCategory(data);
  //     console.log(data, "dataa");
  //   } catch (error) {
  //     console.log("Error fetching subcategories:", error);
  //     setSubCategory([]);
  //   } finally {
  //     setIsSubcategoryLoading(false);
  //   }
  // };

  const toggleSubcategory = async (
    categoryid: number,
    index: number,
    categoryName: string,
    categoryImage: string
  ) => {
    if (clickedSubcategory === categoryid && isSubcategoryOpen !== null) {
      setIsSubcategoryOpen(null);
    } else {
      setIsSubcategoryOpen(index);
      setClickedSubcategory(categoryid);
      const row = Math.floor(index / 6);
      setClickedRow(row);

      if (carDetails.carId) {
        subFetch({ categoryid: categoryid, carid: carDetails.carId });

        // const sub = await getSubcategories(categoryid, carDetails.carId);
        // setSubCategory(sub.data);
      } else {
        subFetch({ categoryid: categoryid });
      }
    }
  };
  const { ref, scrollToSection } = useScrollContext();
  const jumpSubCategory = (categoryid: number, carid: boolean) => {
    if (!carid || carDetails?.carId) {
      router.push(`/product-list/${categoryid}`);
      dispatch(setMainCategoryId(clickedSubcategory));
    } else {
      showToast({
        type: "warning",
        title: "Анхааруулга",
        description: "Та авто машинаа сонгосны дараа сэлбэг ээ хайна уу",
      });
      scrollToSection();
    }
  };

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 6);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showPartModal = async (categoryid: number) => {
    if (carDetails.carId) {
      // setIsSubcategoryLoading(true);

      // const sub = await getSubcategories(categoryid, carDetails.carId);
      // setSubCategory(sub.data);
      subFetch({ categoryid: categoryid, carid: carDetails.carId });
    } else {
      subFetch({ categoryid: categoryid });
    }
    openModal();
  };

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
          xl: "repeat(6, 1fr)",
        }}
        gap={{ base: 2, md: 4 }}
        w="full"
        position="relative"
      >
        {data?.map((item: any, index: number) => {
          const isInSameRow = clickedRow === Math.floor(index / 6);
          const isSelectedCard = isSubcategoryOpen === index;

          return (
            index < visibleItems && (
              <React.Fragment key={index}>
                <GridItem
                  cursor="pointer"
                  onClick={() => {
                    isMobile
                      ? showPartModal(item.categoryid)
                      : toggleSubcategory(
                          item.categoryid,
                          index,
                          item.name,
                          item.image.imgurl400
                        );
                    // handleCategoryClick(item.categoryid);
                  }}
                  border="1px solid transparent"
                  pos="relative"
                  zIndex={10}
                >
                  <Stack>
                    <CatalogCard
                      {...item}
                      isSubcategoryOpen={isSelectedCard}
                      isInSameRow={isInSameRow}
                    />
                  </Stack>
                </GridItem>

                {isSubcategoryOpen !== null &&
                  clickedRow === Math.floor(index / 6) &&
                  (index + 1) % 6 === 0 && (
                    <GridItem
                      ref={subcategoryRowRef}
                      display={{ base: "none", md: "block" }}
                      colSpan={{ base: 2, md: 6 }}
                      w="100%"
                      key={`subcat-${item.categoryid}-${index + 1}`}
                      pos="relative"
                    >
                      <Box
                        w="100%"
                        p={{ base: "16px", md: "24px 48px" }}
                        bg={"white"}
                        border="1px solid #F75B00"
                        zIndex={9}
                        borderRadius="8px"
                      >
                        <Stack
                          alignSelf="flex-end"
                          justifySelf="flex-end"
                          pos="absolute"
                          top={4}
                          right={4}
                          onClick={() => {
                            setIsSubcategoryOpen(null);
                          }}
                          cursor="pointer"
                        >
                          <CloseIcon />
                        </Stack>
                        <Grid
                          templateColumns={{
                            base: "repeat(2, 1fr)",
                            sm: "repeat(3, 1fr)",
                            md: "repeat(4, 1fr)",
                          }}
                          gap={6}
                        >
                          {subLoader ? (
                            // <HStack gap={6} w={"full"}>
                            [1, 2, 3, 4].map((element) => (
                              <Skeleton
                                key={`skeleton-${element}`}
                                gap={4}
                                w="full"
                                h={"56px"}
                                borderRadius={8}
                                startColor="gray.50"
                                endColor="gray.50"
                              />
                            ))
                          ) : // </HStack>/
                          subCategory?.length !== 0 ? (
                            subCategory?.map((sub: any, subIndex: number) => (
                              <GridItem
                                key={`subcategory-${sub.categoryid}-${subIndex}`}
                                w="full"
                              >
                                <HStack
                                  onClick={() =>
                                    jumpSubCategory(sub.categoryid, sub.carid)
                                  }
                                  h="56px"
                                  w="100%"
                                  gap={4}
                                >
                                  <Box w="40px" h="40px" pos="relative">
                                    <Image
                                      src={
                                        sub.image?.imgurl800 ||
                                        sub.image?.imgurl400 ||
                                        "/product.svg"
                                      }
                                      width={40}
                                      height={40}
                                      alt={`${sub.name}`}
                                      style={{ borderRadius: "8px" }}
                                    />
                                  </Box>
                                  <Heading
                                    _hover={{
                                      textDecoration: "underline",
                                      color: "primary.500",
                                      cursor: "pointer",
                                    }}
                                    fontSize={{ base: "sm", md: "14px" }}
                                    fontWeight={600}
                                    w="100%"
                                    maxWidth={{ base: "100px", md: "150px" }}
                                    style={{
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {sub.name}
                                  </Heading>
                                </HStack>
                              </GridItem>
                            ))
                          ) : (
                            <GridItem
                              colSpan={{ base: 2, md: 6 }}
                              h={14}
                              alignItems={"center"}
                              justifyContent={"center"}
                            >
                              <Text
                                fontSize={16}
                                alignSelf={"center"}
                                justifySelf="center"
                              >
                                Таны машинд тохирох тус ангиллын сэлбэг байхгүй
                                байна.
                              </Text>
                            </GridItem>
                          )}
                        </Grid>
                      </Box>
                    </GridItem>
                  )}
              </React.Fragment>
            )
          );
        })}
      </Grid>

      {isExpandable && visibleItems < data?.length && (
        <Button
          onClick={loadMoreItems}
          variant="filled"
          rightIcon={<DownArrow color="black" w="20" h="20" />}
          mt={4}
          fontSize={{ base: "sm", md: "md" }}
          padding={{ base: "8px 16px", md: "12px 24px" }}
        >
          More
        </Button>
      )}

      <Modal isCentered isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent mx={4} maxH={600} overflow="scroll">
          <ModalCloseButton />
          <ModalBody p={4}>
            <Box h={4} />
            {subLoader ? (
              <Skeleton height={56} style={{ marginBottom: 12 }} />
            ) : subCategory?.length === 0 ? (
              <Text>Ангилал байхгүй</Text>
            ) : (
              subCategory?.map((sub: any) => (
                <GridItem key={`subCategories-${sub.categoryid}`} w="full">
                  <HStack
                    onClick={() => jumpSubCategory(sub.categoryid, sub.carid)}
                    h="56px"
                    w="90%"
                    gap={4}
                  >
                    <Box w="48px" h="48px" pos="relative">
                      <Image
                        src={
                          sub.image?.imgurl800 ||
                          sub.image?.imgurl400 ||
                          "/product.svg"
                        }
                        alt={`${sub.name}`}
                        fill
                        style={{ borderRadius: "8px" }}
                      />
                    </Box>
                    <Text
                      _hover={{
                        textDecoration: "underline",
                        color: "primary.500",
                        cursor: "pointer",
                      }}
                      fontSize={{ base: "sm", md: "md" }}
                      fontWeight={600}
                      maxW="90%"
                      overflow="hidden"
                      textOverflow={"ellipsis"}
                      whiteSpace="nowrap"
                      maxWidth={{ base: "100%", md: "150px" }}
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {sub.name}
                    </Text>
                  </HStack>
                  <Divider />
                </GridItem>
              ))
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
