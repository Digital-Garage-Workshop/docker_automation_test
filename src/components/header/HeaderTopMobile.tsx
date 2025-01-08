// HeaderTopMobile.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  HStack,
  Text,
  VStack,
  Input,
  Stack,
  Button,
  Box,
  List,
  ListItem,
  Spinner,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import debounce from "lodash.debounce";
import Link from "next/link";

import {
  DownArrow,
  GarageLogo,
  MyGarageIcon,
  NarrowCart,
  ProfileIcon,
  SearchIcon,
} from "@/icons";
import { SignUpModal } from "../sign-up/SignUpModal";
import { UseApi } from "@/hooks/useApi";
import { SearchPart } from "@/services/search/searchPart";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import { HamburgerIcon } from "@chakra-ui/icons";
import { CategoryDropDown } from "./CategoryDropDown";
import { motion } from "framer-motion";
import { Category, OemNumber, Part } from "../../../types/searchResponse";

export const HeaderTopMobile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    onOpen: mobileSignIn,
    onClose: mobileSignInOnClose,
    isOpen: mobileSignInIsOpen,
  } = useDisclosure();
  const { pickupItems, deliveryItems } = useSelector(
    (state: any) => state.cart
  );
  const {
    isOpen: isSearchModalOpen,
    onOpen: openSearchModal,
    onClose: closeSearchModal,
  } = useDisclosure();

  const [category, setCategory] = useState<Category[]>([]);
  const [part, setPart] = useState<Part[]>([]);
  const [oeNumber, setOeNumber] = useState<OemNumber[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [{ data, isLoading }] = UseApi({
    service: SearchPart,
  });

  const formik = useFormik({
    initialValues: { searchValue: "", categorygroupid: 0, isCategory: false },
    onSubmit: (values) => {
      if (values.isCategory) {
        router.push(
          `/product-list/${encodeURIComponent(values.categorygroupid)}`
        );
      } else {
        router.push(
          `/product-detail/${encodeURIComponent(values.categorygroupid)}`
        );
      }
      setShowSuggestions(false);
      closeSearchModal();
    },
  });

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setCategory([]);
      return;
    }
    const response = await SearchPart({ body: query });
    setCategory(response.data.categories || []);
    setPart(response.data.parts);
    setOeNumber(response.data.oemnumbers);
    setShowSuggestions(true);
  };

  useEffect(() => {
    if (data) {
      setCategory(data.categories);
      setPart(data.parts);
      setOeNumber(data.oemnumbers);
    }
  }, [data]);

  const debouncedFetch = useRef(
    debounce((query: string) => fetchSuggestions(query), 300)
  ).current;

  useEffect(() => {
    debouncedFetch(formik.values.searchValue);
    return () => {
      debouncedFetch.cancel();
    };
  }, [formik.values.searchValue, debouncedFetch]);

  const handleSuggestionClick = (
    categorygroupid: number,
    name: string,
    isCategory: boolean
  ) => {
    formik.setFieldValue("searchValue", name);
    formik.setFieldValue("categorygroupid", categorygroupid);
    formik.setFieldValue("isCategory", isCategory);
    setShowSuggestions(false);
    formik.handleSubmit();
  };

  return (
    <HStack
      display={{ base: "flex", md: "none" }}
      py={{ base: 2, md: 4 }}
      w="100%"
      px={{ base: 0, md: 8 }}
      boxShadow=" 0px 0px 16px 0px rgba(0, 0, 0, 0.20)"
      position="fixed"
      alignSelf={"center"}
      justify="center"
      left={0}
      bg="white"
      zIndex={99}
    >
      {/* Left Section: Logo and Search */}
      <HStack gap={0} w={20}>
        <CategoryDropDown />

        <Stack
          display={{ base: "flex", md: "none" }}
          onClick={openSearchModal}
          cursor="pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="#1E1E1E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Stack>
      </HStack>
      <Stack w={"50%"} align={"center"} display={{ base: "flex", md: "none" }}>
        <Link href="/">
          {/* <GarageLogo /> */}
          <Stack w={150} h={14} position={"relative"}>
            <Image src="/new-year/new-year-logo.png" />
          </Stack>
        </Link>
      </Stack>
      <HStack gap={0} w={20}>
        <Button
          display={{ base: "flex", md: "none" }}
          leftIcon={<NarrowCart color="#1E1E1E" />}
          borderRadius="none"
          variant="ghost"
          color="#1E1E1E"
          border="none"
          onClick={() => router.push("/payment")}
          pos="relative"
        >
          <HStack
            px={1}
            rounded="99px"
            bg="#F75B00"
            pos="absolute"
            top={{ base: 0, md: -1 }}
            right={{ base: "12px", md: "10px" }}
          >
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight={700}
              color="white"
            >
              {pickupItems?.length + deliveryItems?.length}
            </Text>
          </HStack>
        </Button>
        <Stack
          onClick={() => {
            if (session) {
              router.push("/profile");
              dispatch(setClickedSideBar({ clickedSideBar: "sideBar" }));
            } else {
              mobileSignIn();
            }
          }}
          display={{ base: "flex", md: "none" }}
          pr={"12px"}
        >
          <ProfileIcon />
        </Stack>
      </HStack>

      {/* Search Modal */}
      <Modal isOpen={isSearchModalOpen} onClose={closeSearchModal}>
        <ModalOverlay />
        <motion.div>
          <ModalContent>
            <ModalHeader>Сэлбэг хайх</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form
                onSubmit={formik.handleSubmit}
                style={{ position: "relative" }}
              >
                <Input
                  ref={inputRef}
                  onChange={(e) =>
                    formik.setFieldValue("searchValue", e.target.value)
                  }
                  placeholder="Search for products"
                  autoFocus
                  fontSize="md"
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 100)
                  }
                />
                <Divider />

                {category.length > 0 ||
                part.length > 0 ||
                oeNumber.length > 0 ? (
                  <List mt={4} spacing={0}>
                    {isLoading ? ( // Show loader if loading
                      <ListItem padding={2} textAlign="center">
                        <Spinner size="sm" />
                      </ListItem>
                    ) : category.length > 0 ? (
                      <>
                        <Flex mx={2}>
                          <Text fontWeight={700}>Ангилал</Text>
                        </Flex>
                        {category.map((suggestion: Category, index: number) => (
                          <HStack>
                            {suggestion.imgurl === null ? (
                              <Box />
                            ) : (
                              <Image src={`${suggestion.imgurl}`} />
                            )}
                            <ListItem
                              key={index}
                              padding={2}
                              _hover={{
                                backgroundColor: "gray.100",
                                cursor: "pointer",
                              }}
                              onMouseDown={() =>
                                handleSuggestionClick(
                                  suggestion.categoryid,
                                  suggestion.name,
                                  true
                                )
                              }
                            >
                              {suggestion.categoryname}
                            </ListItem>
                          </HStack>
                        ))}
                      </>
                    ) : (
                      <Box />
                    )}

                    {part.length > 0 ? (
                      <>
                        <Flex mx={2}>
                          <Text fontWeight={700}>Сэлбэг</Text>
                        </Flex>
                        {part.map((part: Part, index: number) => (
                          <HStack>
                            <ListItem
                              key={index}
                              padding={2}
                              _hover={{
                                backgroundColor: "gray.100",
                                cursor: "pointer",
                              }}
                              onMouseDown={() =>
                                handleSuggestionClick(
                                  part.articleid,
                                  part.name,
                                  false
                                )
                              }
                            >
                              {part.categoryname}/{part.brandname}/
                              {part.articleno}
                            </ListItem>
                          </HStack>
                        ))}
                      </>
                    ) : (
                      <Box />
                    )}

                    {oeNumber.length > 0 ? (
                      <>
                        <Flex mx={2}>
                          <Text fontWeight={700}>OEM дугаар</Text>
                        </Flex>
                        {oeNumber.map((oeNumber: OemNumber, index: number) => (
                          <ListItem
                            key={index}
                            padding={2}
                            _hover={{
                              backgroundColor: "gray.100",
                              cursor: "pointer",
                            }}
                            onMouseDown={() =>
                              handleSuggestionClick(
                                oeNumber.articleid,
                                oeNumber.oemnumber,
                                false
                              )
                            }
                          >
                            {oeNumber.oemnumber} / {oeNumber.brandname}
                          </ListItem>
                        ))}
                      </>
                    ) : (
                      <Box />
                    )}
                  </List>
                ) : (
                  <Box padding={2} color="gray.500">
                    Илэрц олдсонгүй
                  </Box>
                )}
              </form>
            </ModalBody>
          </ModalContent>
        </motion.div>
      </Modal>
      <SignUpModal isOpen={mobileSignInIsOpen} onClose={mobileSignInOnClose} />
    </HStack>
  );
};
