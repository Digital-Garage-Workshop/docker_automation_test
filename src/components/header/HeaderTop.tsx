import { useState, useEffect, useRef } from "react";
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
  Divider,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import debounce from "lodash.debounce";
import Link from "next/link";
import { SignUpModal } from "../sign-up/SignUpModal";
import { UseApi } from "@/hooks/useApi";
import { SearchPart } from "@/services/search/searchPart";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import {
  GarageLogo,
  SearchIcon,
  MyGarageIcon,
  DownArrow,
  ProfileIcon,
  NarrowCart,
  CarIcon,
  FriendIcon,
  GiftIcon,
  HistoryIcon,
  LittleHomeIcon,
  LittleStar,
  LogOutIcon,
  MapIcon,
  UserIcon,
  RightArrow,
} from "@/icons";
import { Category, OemNumber, Part } from "../../../types/searchResponse";
import { AreYouSureModal } from "../profile";
import { useScrollContext } from "@/providers/ScrollContext";
import {
  resetCarDetails,
  setCarCompShow,
  setCarDetails,
  setChanged,
} from "@/redux/slices/carSlice";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { UserCar } from "@/services/user/userCar";
import { RootState } from "@/redux/store";
import { clearCars } from "@/redux/slices/carHistory";
import { setMainCategoryId } from "@/redux/slices/mainCateSlice";
import React from "react";
import { useCustomToast } from "@/hooks/useCustomToast";
type HeaderTopProps = {
  setIsExpanded: (isExpanded: boolean) => void;
};

export const HeaderTop = (props: HeaderTopProps) => {
  const { setIsExpanded } = props;
  const { data: session } = useSession();
  const { ref, scrollToSection } = useScrollContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const { pickupItems, deliveryItems } = useSelector(
    (state: any) => state.cart
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: sureToLogOut,
    onClose: logOutOnClose,
    onOpen: logOutOnOpen,
  } = useDisclosure();

  const [category, setCategory] = useState<Category[]>([]);
  const [part, setPart] = useState<Part[]>([]);
  const [oeNumber, setOeNumber] = useState<OemNumber[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [{ data, isLoading }, fetch] = UseApi({ service: SearchPart });
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [garageDropDown, setGarageDropDown] = useState(false);
  const carDetails = useSelector((state: any) => state.car);
  const [cars, setCars] = useState<any[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const showToast = useCustomToast();
  const [
    { data: userCars, isLoading: userCarsLoader, error: userCarError },
    getUerCars,
  ] = UseApi({
    service: UserCar,
    useAuth: true,
  });

  const profiles = [
    {
      name: "Хэрэглэгчийн тохиргоо",
      activeIcon: <UserIcon color="white" />,
      inactiveIcon: <UserIcon color="#1E1E1E" />,
      action: () => {
        dispatch(
          setClickedSideBar({ clickedSideBar: "Хэрэглэгчийн тохиргоо" })
        );
        router.push("/profile");
      },
    },
    {
      name: "Миний гараж",
      activeIcon: <LittleHomeIcon color="white" />,
      inactiveIcon: <LittleHomeIcon color="#1E1E1E" />,
      action: () => {
        dispatch(setClickedSideBar({ clickedSideBar: "Миний гараж" }));
        router.push("/profile");
      },
    },
    {
      name: "Хүргэлтийн хаяг",
      activeIcon: <MapIcon color="white" />,
      inactiveIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M6.66683 5.83356V5.84189M13.3335 12.5002V12.5086M9.0235 8.19022C9.48977 7.72409 9.80734 7.13015 9.93604 6.48352C10.0647 5.83689 9.99879 5.16661 9.74653 4.55747C9.49426 3.94832 9.06702 3.42767 8.51884 3.06135C7.97065 2.69503 7.32614 2.49951 6.66683 2.49951C6.00752 2.49951 5.36301 2.69503 4.81483 3.06135C4.26664 3.42767 3.8394 3.94832 3.58714 4.55747C3.33487 5.16661 3.26892 5.83689 3.39762 6.48352C3.52632 7.13015 3.84389 7.72409 4.31016 8.19022L6.66683 10.5477L9.0235 8.19022ZM15.6902 14.8569C16.1564 14.3908 16.474 13.7968 16.6027 13.1502C16.7314 12.5036 16.6655 11.8333 16.4132 11.2241C16.1609 10.615 15.7337 10.0943 15.1855 9.72802C14.6373 9.3617 13.9928 9.16618 13.3335 9.16618C12.6742 9.16618 12.0297 9.3617 11.4815 9.72802C10.9333 10.0943 10.5061 10.615 10.2538 11.2241C10.0015 11.8333 9.93559 12.5036 10.0643 13.1502C10.193 13.7968 10.5106 14.3908 10.9768 14.8569L13.3335 17.2144L15.6902 14.8569Z"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      action: () => {
        dispatch(setClickedSideBar({ clickedSideBar: "Хүргэлтийн хаяг" }));
        router.push("/profile");
      },
    },
    {
      name: "Захиалгууд",
      activeIcon: <CarIcon color="#fff" />,
      inactiveIcon: <CarIcon color="#1E1E1E" />,
      action: () => {
        dispatch(setClickedSideBar({ clickedSideBar: "Захиалгууд" }));
        router.push("/profile");
      },
    },

    {
      name: "Garage point",
      activeIcon: <GiftIcon color="white" />,
      inactiveIcon: <GiftIcon color="#1E1E1E" />,
      action: () => {
        dispatch(setClickedSideBar({ clickedSideBar: "Garage point" }));
        router.push("/profile");
      },
    },
    {
      name: "Урамшуулал",
      activeIcon: <LittleStar color="white" />,
      inactiveIcon: <LittleStar color="#1E1E1E" />,
      action: () => {
        dispatch(setClickedSideBar({ clickedSideBar: "Урамшуулал" }));
        router.push("/profile");
      },
    },

    {
      name: "Үзсэн",
      activeIcon: <HistoryIcon color="white" />,
      inactiveIcon: <HistoryIcon color="#1E1E1E" />,
      action: () => {
        dispatch(setClickedSideBar({ clickedSideBar: "Үзсэн" }));
        router.push("/profile");
      },
    },
    {
      name: "Найзаа урих",
      activeIcon: <FriendIcon color="white" />,
      inactiveIcon: <FriendIcon color="#1E1E1E" />,
      action: () => {
        dispatch(setClickedSideBar({ clickedSideBar: "Найзаа урих" }));
        router.push("/profile");
      },
    },
  ];

  const formik = useFormik({
    initialValues: {
      searchValue: "",
      categorygroupid: 0,
      isCategory: false,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (data) {
        if (data.categories && data.categories.length > 0) {
          // router.push(
          //   `/product-list/${encodeURIComponent(data.categories[0].categoryid)}`
          // );
          if (carDetails?.carId) {
            router.push(
              `/product-list/${encodeURIComponent(data.categories[0].categoryid)}`
            );

            dispatch(setMainCategoryId(values.categorygroupid));
          } else {
            showToast({
              type: "warning",
              title: "Анхааруулга",
              description: "Та машинаа сонгоно уу.",
            });
          }
          dispatch(setMainCategoryId(data.categories[0].categoryid));
        } else if (data.parts && data.parts.length > 0) {
          router.push(
            `/product-detail/${encodeURIComponent(data.parts[0].articleid)}`
          );
        } else if (data.oemnumbers && data.oemnumbers.length > 0) {
          router.push(
            `/product-detail/${encodeURIComponent(data.oemnumbers[0].articleid)}`
          );
        } else {
          // No results found, could redirect to a search results page
          // router.push(`/search?q=${encodeURIComponent(values.searchValue)}`);
        }
      } else {
        // No results found
        // router.push(`/search?q=${encodeURIComponent(values.searchValue)}`);
      }
      if (values.isCategory) {
        if (carDetails?.carId) {
          router.push(
            `/product-list/${encodeURIComponent(values.categorygroupid)}`
          );

          dispatch(setMainCategoryId(values.categorygroupid));
        } else {
          showToast({
            type: "warning",
            title: "Анхааруулга",
            description: "Та машинаа сонгоно уу.",
          });
        }
      } else if (values.categorygroupid === 0) {
      } else {
        router.push(
          `/product-detail/${encodeURIComponent(values.categorygroupid)}`
        );
      }
      setShowSuggestions(false);
      setIsSearchFocused(false);
    },
  });

  const fetchSuggestions = debounce(async (query: string) => {
    if (query.length > 2) {
      fetch(query);
    } else {
      setCategory([]);
    }
  }, 300);

  useEffect(() => {
    if (data) {
      setCategory(data.categories);
      setPart(data.parts);
      setOeNumber(data.oemnumbers);
    }
  }, [data]);

  useEffect(() => {
    fetchSuggestions(formik.values.searchValue);
  }, [formik.values.searchValue]);

  const handleSearch = () => {
    formik.handleSubmit();
  };

  const handleSuggestionClick = (
    categorygroupid: number,
    name: string,
    isCategory: boolean
  ) => {
    setIsSearchFocused(false);
    formik.setFieldValue("searchValue", name);
    formik.setFieldValue("categorygroupid", categorygroupid);
    formik.setFieldValue("isCategory", isCategory);

    setShowSuggestions(false);
    handleSearch();
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  useEffect(() => {
    if (session) getUerCars();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (userCars) {
      setCars(userCars);
    }
  }, [userCars]);
  const carHistory = useSelector((state: RootState) => state.carHistory.cars);

  const refresh = () => {
    dispatch(resetCarDetails());
    dispatch(setChanged());
  };
  return (
    <>
      {isSearchFocused && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="150vh"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={12}
          onClick={() => setIsSearchFocused(false)}
        />
      )}

      <HStack
        display={{ base: "none", md: "flex" }}
        py={4}
        w="100%"
        justifyContent="space-between"
        gap={8}
        bg="white"
        pos={"relative"}
      >
        {/* Left Section: Logo and Search */}
        <HStack gap={6} w="full">
          <Link href="/">
            <GarageLogo />
          </Link>
          <form
            onSubmit={formik.handleSubmit}
            style={{ width: "100%", position: "relative" }}
          >
            <HStack
              zIndex={15}
              bg="white"
              gap={1}
              borderRadius={`${showSuggestions ? "8px " : "8px"}`}
              pos="relative"
              w="100%"
            >
              <Input
                ref={inputRef}
                name="searchValue"
                value={formik.values.searchValue}
                onChange={formik.handleChange}
                onFocus={() => {
                  setShowSuggestions(true);
                  setIsExpanded(false);
                  setIsSearchFocused(true);
                }}
                onBlur={handleInputBlur}
                placeholder="10,000 гаруй бүтээгдэхүүнүүдээс OE дугаар, нэрээр хайх"
                sx={{ width: "100%", borderRadius: 8 }}
                // focusBorderColor="transparent"
                // border="none"
              />
              <Stack pos="absolute" right="10px" zIndex={11} cursor="pointer">
                <SearchIcon />
              </Stack>
              {showSuggestions && (
                <Box
                  position="absolute"
                  top="100%"
                  left={0}
                  right={0}
                  bg="white"
                  borderRadius="8px"
                  px={2}
                  py={6}
                  zIndex={15}
                  maxHeight="300px"
                  overflowY="auto"
                  mt={4}
                >
                  {category.length > 0 ||
                  part.length > 0 ||
                  oeNumber.length > 0 ? (
                    <List spacing={0}>
                      {isLoading ? ( // Show loader if loading
                        <ListItem padding={2} textAlign="center">
                          <Spinner size="sm" />
                        </ListItem>
                      ) : category.length > 0 ? (
                        <>
                          <Flex mx={2}>
                            <Text fontWeight={700}>Ангилал</Text>
                          </Flex>
                          {category.map(
                            (suggestion: Category, index: number) => (
                              <HStack key={`category-${index}`}>
                                {suggestion.imgurl === null ? (
                                  <Box />
                                ) : (
                                  <Image
                                    src={`${suggestion.imgurl}`}
                                    w={10}
                                    h={10}
                                    objectFit={"contain"}
                                    alt={`${suggestion.categoryname}`}
                                  />
                                )}
                                <ListItem
                                  w="full"
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
                            )
                          )}
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
                            <HStack key={`part-${index}`}>
                              <ListItem
                                // key={index}
                                padding={2}
                                w={"full"}
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
                          {oeNumber.map(
                            (oeNumber: OemNumber, index: number) => (
                              <ListItem
                                key={`oe-${index}`}
                                padding={2}
                                w="full"
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
                            )
                          )}
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
                </Box>
              )}
              {isLoading && (
                <Flex
                  position="absolute"
                  top="50%"
                  right="50px"
                  transform="translateY(-50%)"
                >
                  <Spinner size="sm" />
                </Flex>
              )}
            </HStack>
          </form>
        </HStack>

        {/* Right Section: Icons and Profile */}
        <HStack gap={6} justify="flex-end">
          <HStack gap={2} pos="relative" cursor="pointer">
            <Stack onClick={() => setGarageDropDown(true)} pos="relative">
              <MyGarageIcon color="#1E1E1E" />
              {carDetails.carId ? (
                <Stack pos={"absolute"} top={-1} right={-1}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="15"
                      height="15"
                      rx="7.5"
                      fill="#008060"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="15"
                      height="15"
                      rx="7.5"
                      stroke="white"
                    />
                    <path
                      d="M6.4002 8.0002L7.46686 9.06686L9.6002 6.93353M12.8002 8.0002C12.8002 10.6512 10.6512 12.8002 8.0002 12.8002C5.34923 12.8002 3.2002 10.6512 3.2002 8.0002C3.2002 5.34923 5.34923 3.2002 8.0002 3.2002C10.6512 3.2002 12.8002 5.34923 12.8002 8.0002Z"
                      stroke="white"
                      strokeWidth="1.06667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Stack>
              ) : (
                <Stack pos={"absolute"} top={-1} right={-1}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="15"
                      height="15"
                      rx="7.5"
                      fill="#FFC453"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="15"
                      height="15"
                      rx="7.5"
                      stroke="white"
                    />
                    <path
                      d="M8.0002 5.86686V8.0002M8.0002 10.1335H8.00553M12.8002 8.0002C12.8002 10.6512 10.6512 12.8002 8.0002 12.8002C5.34923 12.8002 3.2002 10.6512 3.2002 8.0002C3.2002 5.34923 5.34923 3.2002 8.0002 3.2002C10.6512 3.2002 12.8002 5.34923 12.8002 8.0002Z"
                      stroke="white"
                      strokeWidth="1.06667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Stack>
              )}
            </Stack>
            <VStack
              gap={"2px"}
              align="flex-start"
              p={0}
              onClick={() => setGarageDropDown(true)}
            >
              <Text
                color="#1E1E1E"
                fontWeight={700}
                fontSize="13px"
                cursor="pointer"
                whiteSpace={"nowrap"}
              >
                Миний машин
              </Text>
              <Text
                color="#1E1E1E"
                fontSize="12px"
                cursor="pointer"
                maxW="100px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {carDetails?.carId
                  ? `${carDetails.brandName} ${carDetails.modelName} ${carDetails.carName}`
                  : "Машин сонгох "}
              </Text>
            </VStack>
            <Stack
              alignSelf="flex-start"
              mt={1}
              onClick={() => setGarageDropDown(true)}
            >
              <DownArrow color="#1E1E1E" w="16" h="16" />
            </Stack>
            <VStack
              bg="white"
              w={330}
              p={6}
              pos="absolute"
              top={"145%"}
              left={"0%"}
              zIndex={16}
              borderRadius={8}
              gap={6}
              align="flex-start"
              display={garageDropDown ? "flex" : "none"}
            >
              <Stack
                bg="white"
                w={6}
                h={6}
                style={{ transform: "rotate(45deg)" }}
                pos="absolute"
                top={"-10px"}
                left="50px"
                borderRadius={4}
              />
              {carDetails.carId ? (
                <VStack gap={6} align="flex-start" w="full">
                  <VStack gap={4} align="flex-start" w="full">
                    <Text fontSize={18} fontWeight={700}>
                      Хайж байгаа машин
                    </Text>
                    <Divider />
                    <VStack gap="5px" w="full" align="flex-start">
                      <Text
                        fontWeight={600}
                      >{`${carDetails.brandName} ${carDetails.modelName} ${carDetails.carName}`}</Text>
                    </VStack>
                    <Button onClick={refresh}>Цуцлах</Button>
                  </VStack>
                  <Divider />
                  {session?.user.accessToken != null ? (
                    userCars?.length !== 0 ? (
                      <VStack gap={4} w="full" align="flex-start">
                        <HStack
                          w="full"
                          justify="space-between"
                          onClick={() => {
                            dispatch(
                              setClickedSideBar({
                                clickedSideBar: "Миний гараж",
                              })
                            );
                            router.push("/profile");
                            setGarageDropDown(false);
                          }}
                        >
                          <Text fontSize={18} fontWeight={700}>
                            Миний гараж
                          </Text>
                          <RightArrow color="#1E1E1E" />
                        </HStack>
                        <Divider />
                        {cars?.map((item: any, index: number) => {
                          return (
                            <HStack
                              w="full"
                              justify="space-between"
                              key={`cars-${index}`}
                            >
                              <VStack
                                gap="5px"
                                w="full"
                                align="flex-start"
                                maxW={232}
                                p={0}
                              >
                                <Text
                                  fontWeight={600}
                                  maxW="full"
                                  textOverflow="ellipsis"
                                  whiteSpace="nowrap"
                                  overflow="hidden"
                                  fontSize={14}
                                >
                                  {`${item.platenumber ? item.platenumber : ""} ${item.manuname} `}
                                </Text>
                                <Text
                                  fontSize={12}
                                  maxW="full"
                                  textOverflow="ellipsis"
                                  whiteSpace="nowrap"
                                  overflow="hidden"
                                >
                                  {item.modelname} {item.carname}
                                </Text>
                              </VStack>
                              <Stack
                                transform="rotate(-90deg)"
                                w={8}
                                h={8}
                                align="center"
                                justify="center"
                                bg="#F75B00"
                                borderRadius={8}
                                onClick={() => {
                                  dispatch(
                                    setCarDetails({
                                      brandId: item.manuid,
                                      brandName: item.manuname,
                                      modelId: item.modelid,
                                      modelName: item.modelname,
                                      carId: item.carid,
                                      carName: item.carname,
                                      plate: item.platenumber
                                        ? item.platenumber
                                        : "",
                                      vin: "",
                                      searchedBy: 3,
                                    })
                                  );
                                }}
                              >
                                <ArrowDownIcon color="white" />
                              </Stack>
                            </HStack>
                          );
                        })}
                      </VStack>
                    ) : null
                  ) : null}
                  {/* <Divider display={session ? "flex" : "none"} /> */}
                  <VStack gap={4} w="full" align="flex-start">
                    <HStack w="full" justify="space-between">
                      <Text fontSize={18} fontWeight={700}>
                        Хайлтын түүх
                      </Text>
                      <Text
                        cursor="pointer"
                        color="#F75B00"
                        fontSize={13}
                        fontWeight={700}
                        textDecoration={"underline"}
                        onClick={() => {
                          dispatch(clearCars());
                        }}
                      >
                        Цэвэрлэх
                      </Text>
                    </HStack>
                    <Divider />
                    {carHistory.map((item: any, index: number) => {
                      return (
                        <HStack
                          key={`carHistory-${index}`}
                          w="full"
                          justify="space-between"
                        >
                          <VStack
                            gap="5px"
                            w="full"
                            align="flex-start"
                            maxW={232}
                            p={0}
                          >
                            <Text fontWeight={600} fontSize={14}>
                              {`${item.platenumber || ""} ${item.brandName} `}
                            </Text>
                            <Text fontSize={12}>
                              {item.modelName} {item.carName}
                            </Text>
                          </VStack>
                          <Stack
                            transform="rotate(-90deg)"
                            w={8}
                            h={8}
                            align="center"
                            justify="center"
                            bg="#F75B00"
                            borderRadius={8}
                            onClick={() => {
                              dispatch(
                                setCarDetails({
                                  brandId: item.brandId,
                                  brandName: item.brandName,
                                  modelId: item.modelId,
                                  modelName: item.modelName,
                                  carId: item.carId,
                                  carName: item.carName,
                                  plate: item.plate || "",
                                })
                              );
                            }}
                          >
                            <ArrowDownIcon color="white" />
                          </Stack>
                        </HStack>
                      );
                    })}
                  </VStack>
                </VStack>
              ) : (
                <VStack w="full" gap={6}>
                  <Button
                    onClick={() => {
                      dispatch(setCarCompShow(true));
                      setGarageDropDown(false);
                      scrollToSection();
                    }}
                  >
                    Машин сонгох
                  </Button>
                  {session ? (
                    userCars?.length !== 0 ? (
                      <VStack gap={4} w="full" align="flex-start">
                        <Text fontSize={18} fontWeight={700}>
                          Миний гараж
                        </Text>
                        <Divider />
                        {cars?.map((item: any, index: number) => {
                          return (
                            <HStack
                              w="full"
                              justify="space-between"
                              key={`car--${index}`}
                            >
                              <VStack
                                gap="5px"
                                w="full"
                                align="flex-start"
                                maxW={232}
                                p={0}
                              >
                                <Text fontWeight={600} fontSize={14}>
                                  {`${item.manuname} `}
                                </Text>
                                <Text
                                  fontSize={12}
                                  color="#475467"
                                  maxW="100%"
                                  overflow="hidden"
                                  whiteSpace="nowrap"
                                  textOverflow="ellipsis"
                                >
                                  {item.modelname} {item.carname}
                                </Text>
                              </VStack>
                              <Stack
                                transform="rotate(-90deg)"
                                w={8}
                                h={8}
                                align="center"
                                justify="center"
                                bg="#F75B00"
                                borderRadius={8}
                                onClick={() => {
                                  dispatch(
                                    setCarDetails({
                                      brandId: item.manuid,
                                      brandName: item.manuname,
                                      modelId: item.modelid,
                                      modelName: item.modelname,
                                      carId: item.carid,
                                      carName: item.carname,
                                      plate: item.platenumber
                                        ? item.platenumber
                                        : "",
                                      vin: "",
                                      searchedBy: 3,
                                    })
                                  );
                                }}
                              >
                                <ArrowDownIcon color="white" />
                              </Stack>
                            </HStack>
                          );
                        })}
                      </VStack>
                    ) : null
                  ) : null}

                  {carHistory.length !== 0 ? (
                    <VStack gap={4} w="full" align="flex-start">
                      <HStack w="full" justify="space-between">
                        <Text fontSize={18} fontWeight={700}>
                          Хайлтын түүх
                        </Text>
                        <Text
                          cursor="pointer"
                          color="#F75B00"
                          fontSize={13}
                          fontWeight={700}
                          textDecoration={"underline"}
                          onClick={() => {
                            dispatch(clearCars());
                          }}
                        >
                          Цэвэрлэх
                        </Text>
                      </HStack>
                      <Divider />
                      {carHistory.map((item: any, index: number) => {
                        return (
                          <HStack
                            key={`carhis-${index}`}
                            w="full"
                            justify="space-between"
                          >
                            <VStack
                              gap="5px"
                              w="full"
                              align="flex-start"
                              maxW={232}
                              p={0}
                            >
                              <Text
                                fontWeight={600}
                                fontSize={14}
                                whiteSpace="nowrap"
                                overflow="hidden"
                              >
                                {item.platenumber ? item.platenumber : null}{" "}
                                {item.brandName}
                              </Text>
                              <Text fontSize={12} color="#475467">
                                {item.modelName} {item.carName}
                              </Text>
                            </VStack>
                            <Stack
                              transform="rotate(-90deg)"
                              w={8}
                              h={8}
                              align="center"
                              justify="center"
                              bg="#F75B00"
                              borderRadius={8}
                              onClick={() => {
                                dispatch(
                                  setCarDetails({
                                    brandId: item.brandId,
                                    brandName: item.brandName,
                                    modelId: item.modelId,
                                    modelName: item.modelName,
                                    carId: item.carId,
                                    carName: item.carName,
                                    plate: item.plate || "",
                                  })
                                );
                              }}
                            >
                              <ArrowDownIcon color="white" />
                            </Stack>
                          </HStack>
                        );
                      })}
                    </VStack>
                  ) : session ? null : (
                    <VStack gap={4} w="full">
                      <HStack w="full" gap={4} align="flex-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            d="M10.6665 14.6667V9.33333C10.6665 7.91885 11.2284 6.56229 12.2286 5.5621C13.2288 4.5619 14.5853 4 15.9998 4C17.4143 4 18.7709 4.5619 19.7711 5.5621C20.7713 6.56229 21.3332 7.91885 21.3332 9.33333V14.6667M6.6665 17.3333C6.6665 16.6261 6.94746 15.9478 7.44755 15.4477C7.94765 14.9476 8.62593 14.6667 9.33317 14.6667H22.6665C23.3737 14.6667 24.052 14.9476 24.5521 15.4477C25.0522 15.9478 25.3332 16.6261 25.3332 17.3333V25.3333C25.3332 26.0406 25.0522 26.7189 24.5521 27.219C24.052 27.719 23.3737 28 22.6665 28H9.33317C8.62593 28 7.94765 27.719 7.44755 27.219C6.94746 26.7189 6.6665 26.0406 6.6665 25.3333V17.3333ZM14.6665 21.3333C14.6665 21.687 14.807 22.0261 15.057 22.2761C15.3071 22.5262 15.6462 22.6667 15.9998 22.6667C16.3535 22.6667 16.6926 22.5262 16.9426 22.2761C17.1927 22.0261 17.3332 21.687 17.3332 21.3333C17.3332 20.9797 17.1927 20.6406 16.9426 20.3905C16.6926 20.1405 16.3535 20 15.9998 20C15.6462 20 15.3071 20.1405 15.057 20.3905C14.807 20.6406 14.6665 20.9797 14.6665 21.3333Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <VStack w="90%" align="flex-start" gap="5px">
                          <Text fontSize={14} fontWeight={600}>
                            Аюулгүй төлбөрийн сонголтууд
                          </Text>
                          <Text fontSize={14}>
                            Бид зөвхөн хамгийн найдвартай төлбөрийн системтэй
                            ажилладаг.
                          </Text>
                        </VStack>
                      </HStack>
                      <Divider />
                      <HStack w="full" gap={4} align="flex-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            d="M12.8198 26.6666H9.33317C8.62593 26.6666 7.94765 26.3856 7.44755 25.8855C6.94746 25.3854 6.6665 24.7072 6.6665 23.9999V7.99992C6.6665 7.29267 6.94746 6.6144 7.44755 6.1143C7.94765 5.6142 8.62593 5.33325 9.33317 5.33325H19.9998C20.7071 5.33325 21.3854 5.6142 21.8855 6.1143C22.3856 6.6144 22.6665 7.29267 22.6665 7.99992V18.6666M18.6665 25.3333L21.3332 27.9999L26.6665 22.6666M11.9998 10.6666H17.3332M11.9998 15.9999H14.6665"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <VStack w="90%" align="flex-start" gap="5px">
                          <Text fontSize={14} fontWeight={600}>
                            Product compatibility verification
                          </Text>
                          <Text fontSize={14}>
                            We verify the compatibility between the ordered
                            products and your vehicle.
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  )}
                </VStack>
              )}
            </VStack>
          </HStack>
          <Stack w="1px" h={6} bg="#D0D5DD" />
          <HStack gap={2} pos="relative">
            <Stack
              onClick={() => {
                if (session) {
                  setProfileDropDown((prev) => !prev);
                } else {
                  onOpen();
                }
              }}
            >
              <ProfileIcon />
            </Stack>

            {session ? (
              <VStack gap={0} alignItems="flex-start">
                <VStack
                  gap="2px"
                  onClick={() => {
                    setProfileDropDown((prev) => !prev);
                  }}
                >
                  <Text
                    cursor="pointer"
                    fontWeight={700}
                    fontSize="13px"
                    color="#1E1E1E"
                    // onClick={() => setProfileDropDown((prev) => !prev)}/
                  >
                    Профайл
                  </Text>
                  <Text
                    cursor="pointer"
                    fontSize="12px"
                    color="#1E1E1E"
                    // onClick={() => setProfileDropDown((prev) => !prev)}
                    maxW="60px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {session?.user?.name
                      ? session?.user?.name
                      : session?.user?.email}
                  </Text>
                </VStack>

                <VStack
                  bg="white"
                  w={330}
                  py={6}
                  pos="absolute"
                  top={"145%"}
                  left={"-125%"}
                  zIndex={16}
                  borderRadius={8}
                  gap={4}
                  align="flex-start"
                  display={profileDropDown ? "flex" : "none"}
                >
                  <Stack
                    bg="white"
                    w={6}
                    h={6}
                    style={{ transform: "rotate(45deg)" }}
                    pos="absolute"
                    top={"-10px"}
                    left="158px"
                    borderRadius={4}
                  />
                  <Text
                    fontSize={18}
                    fontWeight={700}
                    px={6}
                    w="90%"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    {`${session?.user?.name || session?.user?.email || "Профайл"}`}
                  </Text>
                  <Divider />
                  <VStack gap="0px" align="flex-start" w="full">
                    {profiles.map((item: any, index: number) => {
                      return (
                        <HStack
                          p="8px 24px"
                          w="full"
                          onClick={() => {
                            item.action();
                            setProfileDropDown(false);
                          }}
                          cursor="pointer"
                          key={`sidebars-${index}`}
                          gap={2}
                          _hover={{ bg: "#F2F4F7" }}
                          borderRadius={8}
                        >
                          {item.inactiveIcon}
                          <Text fontSize={14} fontWeight={600}>
                            {item.name}
                          </Text>
                        </HStack>
                      );
                    })}
                  </VStack>
                  <Divider />
                  <HStack
                    onClick={logOutOnOpen}
                    w="full"
                    cursor="pointer"
                    p="8px 24px"
                    _hover={{ bg: "#F2F4F7" }}
                  >
                    <LogOutIcon color="#1E1E1E" />
                    <Text fontSize={14} fontWeight={600}>
                      Системээс гарах
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            ) : (
              <VStack gap={0} alignItems="flex-start" cursor="pointer">
                <VStack gap="2px" align="flex-start" onClick={onOpen}>
                  <Text
                    cursor="pointer"
                    fontWeight={700}
                    fontSize="13px"
                    color="#1E1E1E"
                  >
                    Профайл
                  </Text>
                  <Text
                    cursor="pointer"
                    fontSize="12px"
                    color="#1E1E1E"
                    maxW="60px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    Нэвтрэх
                  </Text>
                </VStack>
                <SignUpModal isOpen={isOpen} onClose={onClose} />
              </VStack>
            )}
            <Stack
              align="flex-start"
              mt={-3.5}
              onClick={() => {
                if (session) {
                  setProfileDropDown((prev) => !prev);
                } else {
                  onOpen();
                }
              }}
              cursor="pointer"
            >
              <DownArrow color="#1E1E1E" w="16" h="16" />
            </Stack>
          </HStack>
          <Button
            leftIcon={<NarrowCart color="#1E1E1E" />}
            w={15}
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
              top={-1}
              right="10px"
            >
              <Text fontSize={15} fontWeight={700} color="white">
                {pickupItems.length + deliveryItems.length}
              </Text>
            </HStack>
          </Button>
        </HStack>
        <Stack
          w="130vw"
          h="200vh"
          bg={"blackAlpha.600"}
          pos="absolute"
          top={0}
          left={"-20vw"}
          zIndex={15}
          display={profileDropDown ? "flex" : garageDropDown ? "flex" : "none"}
          onClick={() => {
            if (garageDropDown) {
              setGarageDropDown(false);
            } else if (profileDropDown) {
              setProfileDropDown(false);
            }
          }}
        />
        <AreYouSureModal
          title="Та системээс гарахдаа итгэлтэй байна уу?"
          description=""
          isOpen={sureToLogOut}
          onClose={logOutOnClose}
          buttonString="Гарах"
          action={() => {
            signOut({ redirect: true, callbackUrl: "/" });
            dispatch(
              setClickedSideBar({ clickedSideBar: "Хэрэглэгчийн тохиргоо" })
            );
          }}
          setToDefault={true}
        />
      </HStack>
    </>
  );
};
