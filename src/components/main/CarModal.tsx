"use client";
import {
  Stack,
  VStack,
  Text,
  HStack,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Skeleton,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Select,
  Textarea,
} from "@chakra-ui/react";
import Image from "next/image";
import { UseApi } from "@/hooks/useApi";
import {
  CarBrands as _CarBrands,
  SearchByPlate,
  SearchByVin,
} from "@/services";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { resetCarDetails, setCarDetails } from "@/redux/slices/carSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "@/redux/slices/carHistory";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddVehicleRequest } from "@/services/car/addVehicleRequest";
import { useCustomToast } from "@/hooks/useCustomToast";
import { RefetchhByPlate } from "@/services/car/refetchCarByPlate";

type CarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  searchBy: "plate" | "vin";
  value: string;
};

export const CarModal = (props: CarModalProps) => {
  const { isOpen, onClose, value } = props;
  const router = useRouter();
  const { isMainSearchChanged } = useSelector((state: any) => state.mainSearch);
  const carDetails = useSelector((state: any) => state.car);
  const showToast = useCustomToast();
  const dispatch = useDispatch();

  // States
  const [isShowingRefetchedData, setIsShowingRefetchedData] = useState(false);

  // API Hooks
  const [{ data: vinData, isLoading, error }, fetch] = UseApi({
    service: SearchByVin,
  });

  const [
    { data: plateData, isLoading: plateLoader, error: plateError },
    plateFetch,
  ] = UseApi({
    service: SearchByPlate,
  });

  const [
    {
      data: refetchedPlateData,
      isLoading: refetchedPlateLoader,
      error: refetchedPlateError,
    },
    refetchplate,
  ] = UseApi({
    service: RefetchhByPlate,
  });

  const [{ data: brand }, brandFetch] = UseApi({
    service: _CarBrands,
  });

  const [
    {
      data: addCarRequestData,
      isLoading: addCarRequestLoader,
      error: addCarRequestError,
    },
    postVehicleRequest,
  ] = UseApi({
    service: AddVehicleRequest,
    useAuth: true,
  });

  const carAddRequestFormik = useFormik({
    initialValues: {
      carBrand: "",
      plate: "",
      additionalInfo: "",
    },
    validationSchema: Yup.object({
      carBrand: Yup.string().required("Car brand is required"),
      plate: Yup.string().required("Plate is required"),
    }),
    onSubmit: (values) => {
      postVehicleRequest({
        plate: values.plate,
        manuid: values.carBrand,
        comment: values.additionalInfo ? values.additionalInfo : "",
      });
    },
  });

  // Effects
  useEffect(() => {
    if (isOpen) {
      setIsShowingRefetchedData(false);
      plateFetch({
        platenumber: value,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (plateData === null && !isShowingRefetchedData) {
      brandFetch();
    }
  }, [plateData, isShowingRefetchedData]);

  useEffect(() => {
    if (addCarRequestData || addCarRequestData === "") {
      showToast({
        type: "success",
        title: "Амжилттай",
        description: "Таны хүсэлтийг хүлээж авлаа",
      });
    }
  }, [addCarRequestData]);

  useEffect(() => {
    if (addCarRequestError) {
      showToast({
        type: "error",
        title: "Амжилтгүй",
        description: "Та дахин оролдоно уу",
      });
    }
  }, [addCarRequestError]);

  // Handlers
  const handleContinue = () => {
    const currentData = isShowingRefetchedData ? refetchedPlateData : plateData;

    onClose();
    dispatch(resetCarDetails());
    dispatch(
      setCarDetails({
        plate: value,
        carId: currentData.carid,
        brandId: currentData.manuid,
        modelId: currentData.modelid,
        brandName: currentData.manuname,
        modelName: currentData.modelname,
        carName: `${currentData.motorcode}`,
        searchedBy: 1,
      })
    );

    dispatch(
      setCars({
        plate: value.toString(),
        carId: currentData.carid.toString(),
        brandId: currentData.manuid.toString(),
        modelId: currentData.modelid.toString(),
        brandName: currentData.manuname.toString(),
        modelName: currentData.modelname.toString(),
        carName: `${currentData.motorcode}`,
      })
    );

    router.push(`/category`);
  };

  const refetchPlate = () => {
    try {
      refetchplate({
        platenumber: value,
      });
      setIsShowingRefetchedData(true);
      // console.log(refetchedPlateData, "ds");
    } catch (error) {
      showToast({
        type: "error",
        title: "Алдаа гарлаа",
        description: "Та дахин оролдоно уу.",
      });
    }
  };

  // Data management
  const currentData = isShowingRefetchedData ? refetchedPlateData : plateData;
  const isDataLoading = isShowingRefetchedData
    ? refetchedPlateLoader
    : plateLoader;
  const shouldShowCarRequestForm =
    !isDataLoading && plateData === null && !isShowingRefetchedData;
  const carImage = currentData?.carimage
    ? currentData?.carimage.imgurl800
    : "/no-image.png";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="24px" maxW={488} mt={170} mx={{ base: 4, md: 0 }}>
        <ModalHeader
          alignSelf="center"
          textAlign="center"
          maxWidth="full"
          fontSize={20}
          fontWeight={700}
          p={0}
        >
          {isDataLoading ? (
            "Мэдээлэл ачааллаж байна..."
          ) : shouldShowCarRequestForm ? (
            <VStack gap={2} w="100%">
              <Stack
                bg="#F75B001A"
                w={8}
                h={8}
                borderRadius="full"
                align="center"
                justify="center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#F75B00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Stack>
              <Text alignSelf="center" textAlign="center" w="300px">
                Таны автомашины мэдээлэл байхгүй байна!
              </Text>
              <Text fontWeight={400} fontSize={16} w="full">
                Та автомашин нэмүүлэх хүсэлт илгээснээр 24 цагийн дотор нэмэгдэх
                болно.
              </Text>
            </VStack>
          ) : (
            <Text maxW={"290px"}>
              {isShowingRefetchedData
                ? "Энэ таны автомашин мөн үү?"
                : "Та автомашины мэдээллээ шалгана уу!"}
            </Text>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%" p={0} gap={6}>
          {isDataLoading ? null : (
            <Stack
              w={"100%"}
              h={{ base: "150px", md: "185px" }}
              pos="relative"
              sx={{ display: shouldShowCarRequestForm ? "none" : "flex" }}
            >
              <Image src={carImage} alt="car img" fill />
            </Stack>
          )}

          {isDataLoading ? (
            <VStack gap={4} w="full" mt={4}>
              <Skeleton
                height="200px"
                width="100%"
                startColor="#F2F4F7"
                endColor="#F2F4F7"
              />
              <Skeleton
                height="20px"
                width="100%"
                startColor="#F2F4F7"
                endColor="#F2F4F7"
              />
              <Skeleton
                height="20px"
                width="100%"
                startColor="#F2F4F7"
                endColor="#F2F4F7"
              />
              <Skeleton
                height="20px"
                width="100%"
                startColor="#F2F4F7"
                endColor="#F2F4F7"
              />
            </VStack>
          ) : shouldShowCarRequestForm ? (
            <Stack w="full" mt={4}>
              <FormControl gap="6px">
                <FormLabel fontSize={14} fontWeight={600}>
                  Машин
                </FormLabel>
                <InputGroup mt={-1}>
                  <Select
                    name="carBrand"
                    placeholder="Үйлдвэрлэгч"
                    value={carAddRequestFormik.values.carBrand}
                    onChange={carAddRequestFormik.handleChange}
                    bg="white"
                    _focus={{
                      borderColor: "#F75B00",
                      boxShadow: "none",
                    }}
                    sx={{
                      option: {
                        padding: "10px 18px",
                      },
                      color: "#717171",
                    }}
                    isRequired={Boolean(carAddRequestFormik.errors.carBrand)}
                  >
                    {brand?.map((item: any, index: number) => (
                      <option
                        key={index}
                        value={item.manuid}
                        style={{ fontWeight: 700 }}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
                <FormHelperText color="#D72C0D">
                  {carAddRequestFormik.touched.carBrand &&
                    carAddRequestFormik.errors.carBrand}
                </FormHelperText>
              </FormControl>
              <FormControl gap="6px">
                <FormLabel fontSize={14} fontWeight={600}>
                  Улсын дугаар
                </FormLabel>
                <InputGroup mt={-1}>
                  <Input
                    name="plate"
                    variant={"outline"}
                    placeholder="Улсын дугаар"
                    borderColor={
                      carAddRequestFormik.errors.plate ? "#D72C0D" : "#D0D5DD"
                    }
                    focusBorderColor="#F75B00"
                    value={carAddRequestFormik.values.plate}
                    onChange={carAddRequestFormik.handleChange}
                    onBlur={carAddRequestFormik.handleBlur}
                    type="text"
                  />
                </InputGroup>
                <FormHelperText color="#D72C0D">
                  {carAddRequestFormik.touched.plate &&
                    carAddRequestFormik.errors.plate}
                </FormHelperText>
              </FormControl>
              <FormControl gap="6px">
                <FormLabel fontSize={14} fontWeight={600}>
                  Тэмдэглэл бичих
                </FormLabel>
                <InputGroup mt={-1}>
                  <Textarea
                    name="additionalInfo"
                    variant={"outline"}
                    placeholder="Тэмдэглэл бичих"
                    h={152}
                    borderColor={
                      carAddRequestFormik.errors.additionalInfo
                        ? "#D72C0D"
                        : "#D0D5DD"
                    }
                    focusBorderColor="#F75B00"
                    value={carAddRequestFormik.values.additionalInfo}
                    onChange={carAddRequestFormik.handleChange}
                    onBlur={carAddRequestFormik.handleBlur}
                  />
                </InputGroup>
                <FormHelperText color="#D72C0D">
                  {carAddRequestFormik.touched.additionalInfo &&
                    carAddRequestFormik.errors.additionalInfo}
                </FormHelperText>
              </FormControl>
            </Stack>
          ) : (
            <VStack gap={2} w="full" mt={4}>
              <HStack w="full" justifyContent="space-between" fontSize={14}>
                <Text fontWeight={600} color="#1E1E1E">
                  {"Улсын дугаар"}
                </Text>
                <Text>{value}</Text>
              </HStack>
              <Divider />
              <HStack w="full" justifyContent="space-between">
                <Text fontWeight={600} color="#1E1E1E" fontSize={14}>
                  Үйлдвэрлэгч:
                </Text>
                <Text fontSize={14}>{currentData?.manuname}</Text>
              </HStack>
              <Divider />
              <HStack w="full" justifyContent="space-between" fontSize={14}>
                <Text fontWeight={600} color="#1E1E1E">
                  Модел:
                </Text>
                <Text>{currentData?.modelname}</Text>
              </HStack>
              <Divider />
              <HStack w="full" justifyContent="space-between" fontSize={14}>
                <Text fontWeight={600} color="#1E1E1E">
                  Хөдөлгүүр:
                </Text>
                <Text>{currentData?.motortype}</Text>
              </HStack>
            </VStack>
          )}
        </ModalBody>
        {/* Replace the existing ModalFooter section with this */}
        <ModalFooter gap={4} p={0} mt={6}>
          {isDataLoading ? (
            <VStack gap={4} w="full">
              <Skeleton
                height="40px"
                width="100%"
                startColor="#F2F4F7"
                endColor="#F2F4F7"
              />
            </VStack>
          ) : shouldShowCarRequestForm ? (
            <HStack gap={4} w="full">
              <Button variant="outline" onClick={onClose} w="full">
                Хаах
              </Button>
              <Button
                variant="solid"
                onClick={() => carAddRequestFormik.handleSubmit()}
                isLoading={addCarRequestLoader}
                w="full"
              >
                Илгээх
              </Button>
            </HStack>
          ) : (
            <HStack w="full" gap={4}>
              <Button
                onClick={refetchPlate}
                variant="outline"
                fontSize={{ base: 14, md: 14 }}
                fontWeight={700}
                borderColor={"#E4E7EC"}
                color="#1E1E1E"
                w="full"
              >
                Биш
              </Button>
              <Button
                p="10px 24px"
                variant="solid"
                fontSize={{ base: 14, md: 14 }}
                fontWeight={700}
                onClick={handleContinue}
                w="full"
              >
                Мөн
              </Button>
            </HStack>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
