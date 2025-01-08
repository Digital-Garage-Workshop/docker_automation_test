import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  VStack,
  HStack,
  Text,
  Stack,
  Box,
  Skeleton,
  SkeletonText,
  Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useBreakpointValue, border } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { UseApi } from "@/hooks/useApi";
import { AllCategory } from "@/services";
import { CloseIcon, DownArrow } from "@/icons";
import { setMainCategoryId } from "@/redux/slices/mainCateSlice";

type CategoryDrawerProp = {
  isOpen: boolean;
  onClose: () => void;
};

export const CategoryDrawer = (props: CategoryDrawerProp) => {
  const { isOpen, onClose } = props;
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"categories" | "subcategories">(
    "categories"
  );
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [{ data, isLoading }, fetch] = UseApi({
    service: AllCategory,
  });

  const carDetails = useSelector((state: any) => state.car);

  useEffect(() => {
    if (isOpen) {
      fetch();
    }
  }, [isOpen]);

  const handleCategoryClick = (index: number) => {
    if (isMobile) {
      setSelectedCategory(index);
      setViewMode("subcategories");
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!isMobile) {
      setSelectedCategory(index);
    }
  };

  const handleBackToCategories = () => {
    setViewMode("categories");
    setSelectedCategory(null);
  };
  const dispatch = useDispatch();
  const handleClick = (id: number) => {
    if (carDetails.carId !== undefined) {
      router.push(`/product-list/${id}`);
      dispatch(setMainCategoryId(data[selectedCategory || 0]?.categorygroupid));
      onClose();
    } else {
      router.push(`/search/not-found${id}`);
      onClose();
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        maxW={{
          base: "300px",
          md: selectedCategory !== null ? "600px" : "300px",
        }}
        h="100%"
        maxH="100%"
        p={0}
        gap={0}
        transition=".1s ease"
      >
        <DrawerBody position="relative" p={0} gap={0}>
          <Box h="100%" w="100%" p={0}>
            <HStack align="start" w="100%" gap={0}>
              {/* Categories View */}
              {(viewMode === "categories" || !isMobile) && (
                <VStack align="start" overflow="scroll" gap={0}>
                  {/* Mobile Header */}
                  <HStack
                    p="10px 16px"
                    mt={4}
                    justify="space-between"
                    w="full"
                    display={{ base: "flex", md: "none" }}
                  >
                    <Text fontSize={18} fontWeight={700}>
                      Ангиллууд
                    </Text>
                    <Stack
                      h={6}
                      w={6}
                      justify="center"
                      align="center"
                      transform="rotate(-90deg)"
                      bg="#E4E7EC"
                      borderRadius={8}
                      onClick={onClose}
                    >
                      <CloseIcon width={16} height={16} />
                    </Stack>
                  </HStack>
                  <Divider display={{ base: "flex", md: "none" }} />

                  {isLoading ? (
                    Array.from({ length: 12 }).map((_, index) => (
                      <HStack
                        key={index}
                        w={300}
                        justifyContent="space-between"
                        padding="10px 16px"
                        gap={2}
                      >
                        <Skeleton
                          height="24px"
                          width="24px"
                          borderRadius={4}
                          startColor="#F2F4F7"
                          endColor="#F2F4F7"
                        />
                        <Skeleton
                          h={6}
                          w="full"
                          borderRadius={4}
                          startColor="#F2F4F7"
                          endColor="#F2F4F7"
                        />
                      </HStack>
                    ))
                  ) : (
                    <VStack gap={{ base: 2, md: 0 }} w={300}>
                      {data?.map((item: any, index: number) => (
                        <HStack
                          key={index}
                          w={300}
                          justifyContent="space-between"
                          _hover={{ bg: "#F75B00", color: "white" }}
                          padding="10px 16px"
                          onClick={() => handleCategoryClick(index)}
                          onMouseEnter={() => handleMouseEnter(index)}
                          bg={selectedCategory === index ? "#F75B00" : "white"}
                          color={
                            selectedCategory === index ? "white" : "#1E1E1E"
                          }
                          cursor="pointer"
                        >
                          <HStack gap={4} w="100%">
                            {item.image ? (
                              <Stack width={6} height={6} pos="relative">
                                <Image src={item.image} alt={item.name} fill />
                              </Stack>
                            ) : (
                              <Stack width={6} height={6} pos="relative">
                                <Image
                                  src={"/no-image.png"}
                                  alt={item.name}
                                  fill
                                />
                              </Stack>
                            )}
                            <Text
                              fontSize={14}
                              fontWeight={600}
                              maxW="100%"
                              style={{
                                overflow: "hidden",
                                whiteSpace: "normal",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.name}
                            </Text>
                          </HStack>
                          <Stack transform="rotate(-90deg)">
                            <DownArrow
                              color={
                                selectedCategory === index ? "white" : "#717171"
                              }
                              w="16"
                              h="16"
                            />
                          </Stack>
                        </HStack>
                      ))}
                    </VStack>
                  )}
                </VStack>
              )}

              {/* Subcategories View */}
              {((viewMode === "subcategories" && isMobile) ||
                (!isMobile && selectedCategory !== null)) && (
                <VStack
                  align="start"
                  overflow="scroll"
                  gap={{ base: 2, md: 0 }}
                  w="300px"
                  position={{ base: "static", lg: "fixed" }}
                  left={{ base: 0, md: 300 }}
                  height={"100vh"}
                >
                  {/* Mobile Subcategories Header */}
                  <HStack
                    p="10px 16px"
                    justify="space-between"
                    w="300px"
                    display={{ base: "flex", md: "none" }}
                    mt={4}
                    gap={4}
                  >
                    <HStack gap={4}>
                      <Stack
                        h={6}
                        w={6}
                        justify="center"
                        align="center"
                        transform="rotate(90deg)"
                        bg="#E4E7EC"
                        borderRadius={8}
                        onClick={handleBackToCategories}
                      >
                        <DownArrow w="16" h="16" color="#1e1e1e" />
                      </Stack>
                      <Text fontSize={18} fontWeight={700}>
                        {data?.[selectedCategory || 0]?.name}
                      </Text>
                    </HStack>
                    <Stack
                      h={6}
                      w={6}
                      justify="center"
                      align="center"
                      bg="#E4E7EC"
                      borderRadius={8}
                      onClick={onClose}
                    >
                      <CloseIcon width={16} height={16} />
                    </Stack>
                  </HStack>
                  <Divider display={{ base: "flex", md: "none" }} />

                  {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <HStack
                        key={index}
                        w={300}
                        justifyContent="space-between"
                        padding="10px 16px"
                        gap={2}
                      >
                        <Skeleton
                          height="24px"
                          width="24px"
                          borderRadius={4}
                          startColor="#F2F4F7"
                          endColor="#F2F4F7"
                        />
                        <Skeleton
                          startColor="#F2F4F7"
                          endColor="#F2F4F7"
                          w="full"
                          h={6}
                          borderRadius={4}
                        />
                      </HStack>
                    ))
                  ) : data[selectedCategory || 0]?.subcategories?.length !==
                    0 ? (
                    data[selectedCategory || 0]?.subcategories?.map(
                      (subItem: any, subIndex: number) => (
                        <HStack
                          key={subIndex}
                          w={300}
                          onClick={() => handleClick(subItem.categorygroupid)}
                          justifyContent="space-between"
                          _hover={{ bg: "#F75B00", color: "white" }}
                          padding="10px 16px"
                          cursor="pointer"
                        >
                          <HStack gap={4}>
                            {subItem.image ? (
                              <Stack width={6} height={6} pos="relative">
                                <Image
                                  src={subItem.image}
                                  alt={subItem.name}
                                  fill
                                />
                              </Stack>
                            ) : (
                              <Stack width={6} height={6} pos="relative">
                                <Image
                                  src={"/no-image.png"}
                                  alt={subItem.name}
                                  fill
                                />
                              </Stack>
                            )}
                            <Text fontSize={14} fontWeight={600}>
                              {subItem.name}
                            </Text>
                          </HStack>
                        </HStack>
                      )
                    )
                  ) : (
                    <HStack p="8px 16px">
                      <Text fontSize={14}>Уучлаарай сэлбэг олдсонгүй</Text>
                    </HStack>
                  )}
                </VStack>
              )}
            </HStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
