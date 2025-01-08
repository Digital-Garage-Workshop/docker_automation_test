"use client";
import { UseApi } from "@/hooks/useApi";
import {
  VStack,
  HStack,
  Text,
  Button,
  Skeleton,
  Stack,
  useDisclosure,
  Grid,
  Divider,
  GridItem,
  Box,
  Badge,
  Progress,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CarSelectionModal } from "./CarSelectionModal";
import { DeleteUserCar } from "@/services/user/deleteUserCar";
import { useCustomToast } from "@/hooks/useCustomToast";
import { UserCar } from "@/services/user/userCar";
import { OrangePlusIcon, PlusIcon, TrashbinIcon } from "@/icons";
import { AreYouSureModal } from "./AreYouSureModal";
import Home from "../../app/page";
import { useDispatch } from "react-redux";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import { GaragePoint } from "./GaragePoint";
import { border } from "@chakra-ui/react";
import { PlateTemplate } from "@/icons/PlateTemplate";
import { GarageCompSkeleton } from "../skeletons/GarageCompSkeleton";

export const MyGarage = (props: { clicked: string }) => {
  const { clicked } = props;
  const dispatch = useDispatch();
  const showToast = useCustomToast();
  const [delCarid, setDelCarid] = useState(0);
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: UserCar,
    useAuth: true,
  });
  const {
    isOpen: areYouSureIsOpen,
    onClose: areYouSureOnClose,
    onOpen: areYouSureOnOpen,
  } = useDisclosure();

  const {
    isOpen: carSelectionIsOpen,
    onClose: carSelectionOnClose,
    onOpen: carSelectionOnOpen,
  } = useDisclosure();

  const [
    { data: delCarData, isLoading: delCarLoader, error: delCarError },
    deleteUserCar,
  ] = UseApi({
    service: DeleteUserCar,
    useAuth: true,
  });

  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    if (clicked === "Миний гараж") fetch();
  }, [clicked]);

  useEffect(() => {
    if (data) {
      if (data.length === 0) {
        setCars([]);
        // } else if (data.length < 1) {
        //   setCars([...data, ""]);
      } else {
        setCars(data);
      }
    }
  }, [data]);

  const deleteCar = async (id: number) => {
    try {
      await deleteUserCar({
        id: id,
      });

      setCars((prevCars) => [...prevCars.filter((car) => car.id !== id)]);

      showToast({
        title: "Амжилттай!",
        description: "Таны машин амжилттай устгагдлаа.",
        type: "success",
      });
      areYouSureOnClose();
    } catch (error) {
      showToast({
        title: "Алдаа!",
        description: "Машин устгах явцад алдаа гарлаа.",
        type: "error",
      });
    }
  };

  const handleAddCar = () => {
    if (cars?.length < 3 || cars?.[2] === "") {
      carSelectionOnOpen();
    } else {
      showToast({
        title: "Хадгалах машины лимит тулсан байна",
        description: "Та 3 аас дээш машин хадгалах боломжгүй",
        type: "warning",
      });
    }
  };

  return (
    <VStack
      p={"16px 24px"}
      gap={8}
      borderRadius={8}
      bg={{
        base: "transparent",
        sm: "transparent",
        md: "transparent",
        lg: "white",
        xl: "white",
      }}
      w={"100%"}
      display={clicked === "Миний гараж" ? "flex" : "none"}
      minH={{ base: "86vh", sm: "86vh", md: "86vh", lg: "fit", xl: "fit" }}
      pos="relative"
    >
      <HStack
        my={-4}
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
        <Text fontWeight={600}>Миний гараж</Text>
      </HStack>
      <HStack w="full" justify="space-between">
        <VStack gap={1} align="flex-start">
          <Text fontSize={20} fontWeight={700}>
            Миний гараж
          </Text>
          <Text fontSize={14}>Та хамгийн ихдээ 3 машин нэмэх боломжтой</Text>
        </VStack>
        <Button
          variant="outline"
          // color="#F75B00"
          fontSize={14}
          fontWeight={600}
          p="8px 14px"
          w="177px"
          onClick={handleAddCar}
          leftIcon={<PlusIcon />}
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: cars?.length > 0 ? "flex" : "none",
            xl: cars?.length > 0 ? "flex" : "none",
          }}
        >
          Автомашин нэмэх
        </Button>
        <CarSelectionModal
          isOpen={carSelectionIsOpen}
          onClose={carSelectionOnClose}
          setCars={setCars}
          cars={cars}
        />
      </HStack>
      {isLoading ? (
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
          gap={6}
          w={"full"}
        >
          {Array(3)
            .fill("")
            .map((_, index: number) => (
              <GarageCompSkeleton key={index} />
            ))}
        </Grid>
      ) : (
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
          gap={6}
          w="full"
        >
          {cars?.length === 0 ? (
            <>
              <VStack
                gap={6}
                w="full"
                p={4}
                border="1px solid #E4E7EC"
                borderRadius={8}
                cursor="pointer"
                onClick={handleAddCar}
                boxShadow="0px 2.972px 29.719px 0px rgba(10, 6, 57, 0.05)"
                justify="center"
                h="530px"
              >
                <Stack
                  w="80px"
                  h="80px"
                  pos="relative"
                  align={"center"}
                  justify="center"
                  borderRadius={"full"}
                  bg="#F2F4F7"
                >
                  <PlusIcon w="34" />
                </Stack>
                <Text fontWeight={600}>Та машинаа оруулна уу</Text>
              </VStack>
              {/* {[1, 2].map((_, index) => ( */}
              <VStack
                // key={index}
                gap={6}
                w="full"
                p={4}
                borderRadius={8}
                minH="370px"
                bg="#F2F4F7"
              />
              {/* ))} */}
            </>
          ) : (
            // <>
            cars.map((item, index: number) => {
              if (!item) {
                return (
                  <Box
                    key={index}
                    h={570}
                    w="full"
                    bg="linear-gradient(180deg, rgba(193, 193, 193, 0.10) 0%, rgba(193, 193, 193, 0.00) 100%)"
                  />
                );
              }
              return (
                <VStack
                  gap={6}
                  w="full"
                  key={index}
                  p={4}
                  border="1px solid #E4E7EC"
                  borderRadius={8}
                  boxShadow="0px 2.972px 29.719px 0px rgba(10, 6, 57, 0.05)"
                >
                  <VStack w="full" justify="space-between" gap={4}>
                    <VStack gap={2} w="full">
                      <HStack width="full" height={"180px"} pos={"relative"}>
                        <Image
                          src={
                            item && item.imgurl800
                              ? item.imgurl800
                              : "/product.svg"
                          }
                          alt="garage.mn"
                          fill
                          objectFit="contain"
                        />
                        <Button
                          variant="outline"
                          fontSize={14}
                          borderColor="#F2F4F7"
                          fontWeight={600}
                          p="8px"
                          w="fit-content"
                          pos={"absolute"}
                          top={0}
                          right={0}
                          borderRadius={"full"}
                          onClick={() => {
                            areYouSureOnOpen();
                            setDelCarid(item.id);
                          }}
                        >
                          <TrashbinIcon color="#000" w="20" h="20" />
                        </Button>
                        {item.platenumber && (
                          <HStack
                            borderRadius={4}
                            border="1px solid black"
                            pos={"absolute"}
                            top={0}
                            left={0}
                            p={1}
                            h={"32px"}
                            w={14}
                            gap={1}
                          >
                            <Stack
                              alignSelf={"flex-end"}
                              justifySelf={"flex-end"}
                            >
                              <PlateTemplate />
                            </Stack>
                            <Text
                              fontSize={10}
                              fontWeight={700}
                              wordBreak="break-word"
                              maxW={"27px"}
                            >
                              {item.platenumber}
                            </Text>

                            <Stack pos={"absolute"} right={1} bottom={1}>
                              <svg
                                width="10"
                                height="8"
                                viewBox="0 0 10 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.875 3C8.875 3.77363 8.40463 4.48932 7.61264 5.01731C6.82153 5.54473 5.7214 5.875 4.5 5.875C3.2786 5.875 2.17848 5.54473 1.38736 5.01731C0.595365 4.48932 0.125 3.77363 0.125 3C0.125 2.22637 0.595365 1.51068 1.38736 0.982686C2.17848 0.455274 3.2786 0.125 4.5 0.125C5.7214 0.125 6.82153 0.455274 7.61264 0.982686C8.40463 1.51068 8.875 2.22637 8.875 3Z"
                                  fill="white"
                                  stroke="black"
                                  strokeWidth="0.25"
                                />
                                <path
                                  d="M1.10795 1.81818H1.4233L2.16477 3.62926H2.19034L2.93182 1.81818H3.24716V4H3V2.34233H2.97869L2.29688 4H2.05824L1.37642 2.34233H1.35511V4H1.10795V1.81818ZM5.50701 1.81818V4H5.25133L4.06241 2.28693H4.0411V4H3.7769V1.81818H4.03258L5.22576 3.53551H5.24707V1.81818H5.50701ZM7.52717 2.5C7.50373 2.42827 7.47283 2.36399 7.43448 2.30717C7.39684 2.24964 7.35174 2.20064 7.29918 2.16016C7.24734 2.11967 7.18839 2.08878 7.12234 2.06747C7.05629 2.04616 6.98384 2.03551 6.90501 2.03551C6.77575 2.03551 6.6582 2.06889 6.55238 2.13565C6.44656 2.20241 6.36239 2.30078 6.29989 2.43075C6.23739 2.56072 6.20614 2.72017 6.20614 2.90909C6.20614 3.09801 6.23775 3.25746 6.30096 3.38743C6.36417 3.5174 6.44975 3.61577 6.55771 3.68253C6.66566 3.74929 6.78711 3.78267 6.92205 3.78267C7.04705 3.78267 7.15714 3.75604 7.25231 3.70277C7.34819 3.64879 7.42276 3.5728 7.47603 3.47479C7.53001 3.37607 7.557 3.25994 7.557 3.12642L7.63796 3.14347H6.98171V2.90909H7.81268V3.14347C7.81268 3.32315 7.77433 3.4794 7.69762 3.61222C7.62163 3.74503 7.51651 3.84801 7.38228 3.92116C7.24876 3.99361 7.09535 4.02983 6.92205 4.02983C6.72887 4.02983 6.55913 3.98438 6.41282 3.89347C6.26722 3.80256 6.15359 3.6733 6.07191 3.50568C5.99094 3.33807 5.95046 3.1392 5.95046 2.90909C5.95046 2.73651 5.97354 2.58132 6.01971 2.44354C6.06658 2.30504 6.13263 2.18714 6.21786 2.08984C6.30309 1.99254 6.40394 1.91797 6.52042 1.86612C6.6369 1.81428 6.76509 1.78835 6.90501 1.78835C7.02006 1.78835 7.12731 1.80575 7.22674 1.84055C7.32688 1.87464 7.41602 1.9233 7.49414 1.98651C7.57298 2.04901 7.63867 2.12393 7.69123 2.21129C7.74379 2.29794 7.78001 2.39418 7.79989 2.5H7.52717Z"
                                  fill="black"
                                />
                              </svg>
                            </Stack>
                          </HStack>
                        )}
                      </HStack>
                      <Text
                        fontWeight={600}
                        fontSize={{
                          base: 12,
                          sm: 12,
                          md: 12,
                          lg: 14,
                          xl: 14,
                        }}
                        alignSelf={"flex-start"}
                        color={"#475467"}
                      >
                        {`${item.manuname}   `}
                      </Text>
                      <Text
                        fontWeight={700}
                        fontSize={{
                          base: 12,
                          sm: 12,
                          md: 12,
                          lg: 18,
                          xl: 18,
                        }}
                        alignSelf={"flex-start"}
                        color={"#344054"}
                      >
                        {`${item.manuname} ${item.modelname} ${item.carname}`}
                      </Text>
                    </VStack>

                    <HStack
                      w="full"
                      justify="space-between"
                      align={"flex-start"}
                    >
                      <Text color="#667085" fontSize={14}>
                        Аралын дугаар:
                      </Text>
                      <Text
                        fontSize={14}
                        wordBreak={"break-all"}
                        textAlign="end"
                      >
                        {item.vin}
                      </Text>
                    </HStack>
                    <Divider variant="dashed" />
                    <Grid templateColumns={"repeat(3, 1fr)"} w="full" gap={4}>
                      <GridItem w="full">
                        <VStack
                          p={"10px"}
                          align="flex-start"
                          borderRadius={8}
                          border="1px solid #E4E7EC"
                          w="full"
                        >
                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={500}
                          >
                            Үйлдвэрлэсэн
                          </Text>

                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={700}
                          >
                            {item.buildyear || "---"}
                          </Text>
                        </VStack>
                      </GridItem>
                      <GridItem w="full">
                        <VStack
                          p={"10px"}
                          align="flex-start"
                          borderRadius={8}
                          border="1px solid #E4E7EC"
                          w="full"
                        >
                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={500}
                          >
                            Импорт он
                          </Text>

                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={700}
                          >
                            {item.importdate || "---"}
                          </Text>
                        </VStack>
                      </GridItem>
                      <GridItem w="full">
                        <VStack
                          p={"10px"}
                          align="flex-start"
                          borderRadius={8}
                          border="1px solid #E4E7EC"
                          w="full"
                        >
                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={500}
                          >
                            Өнгө
                          </Text>

                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={700}
                          >
                            {item.colorname || "---"}
                          </Text>
                        </VStack>
                      </GridItem>

                      <GridItem w="full">
                        <VStack
                          p={"10px"}
                          align="flex-start"
                          borderRadius={8}
                          border="1px solid #E4E7EC"
                          w="full"
                        >
                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={500}
                          >
                            Хөтлөгч
                          </Text>

                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={700}
                          >
                            {item.impulsiontype || "---"}
                          </Text>
                        </VStack>
                      </GridItem>

                      <GridItem w="full">
                        <VStack
                          p={"10px"}
                          align="flex-start"
                          borderRadius={8}
                          border="1px solid #E4E7EC"
                          w="full"
                        >
                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={500}
                          >
                            Хүрд
                          </Text>

                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={700}
                          >
                            {item.wheelposition || "---"}
                          </Text>
                        </VStack>
                      </GridItem>
                      <GridItem w="full">
                        <VStack
                          p={"10px"}
                          align="flex-start"
                          borderRadius={8}
                          border="1px solid #E4E7EC"
                          w="full"
                        >
                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={500}
                          >
                            Хөдөлгүүр
                          </Text>

                          <Text
                            color={"#344054"}
                            fontSize={12}
                            fontWeight={700}
                          >
                            {item.capacity || "---"}
                          </Text>
                        </VStack>
                      </GridItem>
                    </Grid>
                  </VStack>
                </VStack>
              );
            })
            // </>
          )}
        </Grid>
      )}

      <AreYouSureModal
        title="Та машины мэдээллээ устгахдаа итгэлтэй байна уу"
        description=""
        buttonString="Устгах"
        isOpen={areYouSureIsOpen}
        onClose={areYouSureOnClose}
        action={() => {
          deleteCar(delCarid);
        }}
      />
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
          onClick={handleAddCar}
          leftIcon={<PlusIcon color="white" />}
        >
          Машин нэмэх
        </Button>
      </Stack>
    </VStack>
  );
};
