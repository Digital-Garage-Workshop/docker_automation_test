"use client";
import { useState, useEffect, SetStateAction } from "react";
import {
  Button,
  Text,
  Box,
  VStack,
  HStack,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  Skeleton,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { RefreshIcon } from "@/icons";
import {
  CarBrands as _CarBrands,
  CarModels,
  Engine,
  SearchByPlate,
} from "@/services";
import { UseApi } from "@/hooks/useApi";
import { useFormik } from "formik";
import { Selection } from "@/components";
import CustomInput from "../main/CustomInput";
import Image from "next/image";
import { AddVehicleByPlate } from "@/services/user/addvehicleByPlate";
import { useCustomToast } from "@/hooks/useCustomToast";
import { AddVehicleByModal } from "@/services/user/addVehicleByModel";
import * as Yup from "yup";
import { AddVehicleRequest } from "@/services/car/addVehicleRequest";

export const CarSelectionModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  setCars: (value: SetStateAction<any[]>) => void;
  cars: any[];
}) => {
  const { isOpen, onClose, setCars, cars } = props;
  const [isSelected, setSelected] = useState<number>(3);
  const showToast = useCustomToast();

  const [carDetails, setCarDetailsState] = useState({
    brandId: "",
    brandName: "",
    modelId: "",
    modelName: "",
    carId: "",
    carName: "",
    plate: "",
    vin: "",
    searchedBy: 3,
  });

  const [isMainSearchChanged, setMainSearchState] = useState<boolean>(false);
  const [isCarSearched, setIsCarSearched] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      selectedBrand: "",
      selectedBrandName: "",
      selectedModel: "",
      selectedModelName: "",
      selectedCar: "",
      selectedCarName: "",
      plate: "",
      vin: "",
    },
    onSubmit: (values) => {
      if (isSelected === 1 || isSelected === 2) {
        if (values.plate) {
          setIsCarSearched(true);
          plateFetch({
            platenumber: carDetails.plate,
          });
        } else if (values.vin) {
          setCarDetailsState((prevState) => ({
            ...prevState,
            vin: values.vin,
            searchedBy: 2,
          }));
        }
      } else if (isSelected === 3) {
        if (values.selectedCar) {
          postVehicleByModel({
            carid: carDetails.carId,
          });
        } else {
          console.error("Please select a car.");
        }
      } else {
        console.error("Invalid selection.");
      }
    },
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

  useEffect(() => {
    if (addCarRequestData || addCarRequestData === "") {
      showToast({
        type: "success",
        title: "Амжилттай",
        description: "Таны хүсэлт амжилттай илгээгдлээ",
      });
      setIsCarSearched(false);
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

  const [{ data: brand }, brandFetch] = UseApi({
    service: _CarBrands,
  });

  const [{ data: model }, modelFetch] = UseApi({
    service: CarModels,
  });

  const [{ data: engine, isLoading }, fetch] = UseApi({
    service: Engine,
  });

  useEffect(() => {
    brandFetch();
    formik.setValues({
      selectedBrand: carDetails.brandId || "",
      selectedBrandName: carDetails.brandName || "",
      selectedModel: carDetails.modelId || "",
      selectedModelName: carDetails.modelName || "",
      selectedCar: carDetails.carId || "",
      selectedCarName: carDetails.carName || "",
      plate: carDetails.plate || "",
      vin: carDetails.vin || "",
    });
  }, [carDetails]);

  useEffect(() => {
    if (carDetails.searchedBy) {
      setSelected(carDetails.searchedBy);
    } else {
      setSelected(3);
    }
  }, []);

  useEffect(() => {
    if (formik.values.selectedBrand) {
      modelFetch({
        id: formik.values.selectedBrand,
      });
    }
  }, [formik.values.selectedBrand]);

  useEffect(() => {
    if (formik.values.selectedBrand && formik.values.selectedModel) {
      fetch({
        manuid: formik.values.selectedBrand,
        modelid: formik.values.selectedModel,
      });
    }
  }, [formik.values.selectedBrand, formik.values.selectedModel]);

  useEffect(() => {
    setCarDetailsState({
      brandId: formik.values.selectedBrand,
      brandName: formik.values.selectedBrandName,
      modelId: formik.values.selectedModel,
      modelName: formik.values.selectedModelName,
      carId: formik.values.selectedCar,
      carName: formik.values.selectedCarName,
      plate: formik.values.plate,
      vin: formik.values.vin,
      searchedBy: carDetails.searchedBy,
    });
    setMainSearchState(!isMainSearchChanged);
  }, [
    formik.values.selectedBrand,
    formik.values.selectedBrandName,
    formik.values.selectedModel,
    formik.values.selectedModelName,
    formik.values.selectedCar,
    formik.values.selectedCarName,
    formik.values.plate,
    formik.values.vin,
  ]);

  const handleRefresh = () => {
    setCarDetailsState({
      brandId: "",
      brandName: "",
      modelId: "",
      modelName: "",
      carId: "",
      carName: "",
      plate: "",
      vin: "",
      searchedBy: 3,
    });
    // setMainSearchState(false);
  };

  const [
    { data: plateData, isLoading: plateLoader, error: plateError },
    plateFetch,
  ] = UseApi({
    service: SearchByPlate,
  });

  const [
    {
      data: postVehicleByPlateData,
      isLoading: postVehicleByPlateLoader,
      error: postVehicleByPlateError,
    },
    postVehicleByPlate,
  ] = UseApi({
    service: AddVehicleByPlate,
    useAuth: true,
  });

  const [
    {
      data: postVehicleByModelData,
      isLoading: postVehicleByModelLoader,
      error: postVehicleByModelError,
    },
    postVehicleByModel,
  ] = UseApi({
    service: AddVehicleByModal,
    useAuth: true,
  });

  // useEffect(() => {
  //   plateFetch({
  //     platenumber: carDetails.plate,
  //   });
  // }, [isMainSearchChanged]);

  const handleContinue = () => {
    postVehicleByPlate({
      plateNumber: carDetails.plate.toUpperCase(),
    });
  };

  useEffect(() => {
    if (postVehicleByPlateData) {
      postVehicleByPlateData.length < 3
        ? setCars([...postVehicleByPlateData, ""])
        : setCars(postVehicleByPlateData);

      showToast({
        title: "Амжилттай!",
        description: "Таны машин амжилттай бүртгэгдлээ.",
        type: "success",
      });
      onClose();
    }
  }, [postVehicleByPlateData]);

  useEffect(() => {
    if (postVehicleByPlateError) {
      showToast({
        title: "Амжилтгүй!",
        description: "Уучлаарай машин бүртгэгдсэн байна",
        type: "error",
      });
    }
  }, [postVehicleByPlateError]);

  useEffect(() => {
    if (postVehicleByModelData) {
      postVehicleByModelData.length < 3
        ? setCars([...postVehicleByModelData, ""])
        : setCars(postVehicleByModelData);
      showToast({
        title: "Амжилттай!",
        description: "Таны машин амжилттай бүртгэгдлээ.",
        type: "success",
      });
      onClose();
    }
  }, [postVehicleByModelData]);

  useEffect(() => {
    if (postVehicleByModelError) {
      showToast({
        title: "Амжилтгүй!",
        description: "Уучлаарай машин бүртгэгдсэн байна",
        type: "error",
      });
    }
  }, [postVehicleByModelError]);

  useEffect(() => {
    handleRefresh();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsCarSearched(false);
    }
  }, [isOpen]);

  const isDataLoading = isLoading || plateLoader;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW={{
          base: "full",
          sm: "full",
          md: "450px",
          lg: isCarSearched ? 476 : 446,
          xl: isCarSearched ? 476 : 446,
        }}
        mt={{ base: "40%", sm: "40%", md: "20%", lg: "112px", xl: "112px" }}
        mx={{ base: 4, sm: 4, md: 4, lg: 0, xl: 0 }}
      >
        {isCarSearched ? (
          <Stack p={6} w={"full"}>
            <Stack
              alignSelf="center"
              textAlign="center"
              w="100%"
              fontSize={20}
              fontWeight={700}
            >
              {isDataLoading ? (
                <VStack gap={4} w="full" mt={4}>
                  <Skeleton
                    height="200px"
                    width="100%"
                    startColor="#E4E7EC"
                    endColor="#E4E7EC"
                  />
                  <Skeleton
                    height="20px"
                    width="100%"
                    startColor="#E4E7EC"
                    endColor="#E4E7EC"
                  />
                  <Skeleton
                    height="20px"
                    width="100%"
                    startColor="#E4E7EC"
                    endColor="#E4E7EC"
                  />
                  <Skeleton
                    height="20px"
                    width="100%"
                    startColor="#E4E7EC"
                    endColor="#E4E7EC"
                  />
                </VStack>
              ) : plateData === null ? (
                <VStack gap={2} w="full">
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
                  <Text alignSelf="center" textAlign="center">
                    Таны автомашины мэдээлэл байхгүй байна!
                  </Text>
                  <Text fontWeight={400} fontSize={16} w="full">
                    Та автомашин нэмүүлэх хүсэлт илгээснээр 24 цагийн дотор
                    нэмэгдэх болно.
                  </Text>
                </VStack>
              ) : (
                <Text
                  fontSize={20}
                  fontWeight={700}
                  maxW={"75%"}
                  alignSelf="center"
                >
                  Та автомашины мэдээллээ шалгана уу!
                </Text>
              )}
            </Stack>
            <VStack w="100%" p={0}>
              {isDataLoading ? null : (
                <Stack
                  w={"full"}
                  h={185}
                  pos="relative"
                  sx={{ display: plateData === null ? "none" : "flex" }}
                >
                  <Image
                    src={plateData?.carimage?.imgurl800 || "/product.svg"}
                    alt="garage.mn"
                    fill
                  />
                </Stack>
              )}

              {isDataLoading ? null : plateData === null ? ( // </VStack> //   /> //     endColor="#E7E8E9" //     startColor="#E7E8E9" //     width="100%" //     height="20px" //   <Skeleton //   /> //     endColor="#E7E8E9" //     startColor="#E7E8E9" //     width="100%" //     height="20px" //   <Skeleton //   /> //     endColor="#E7E8E9" //     startColor="#E7E8E9" //     width="100%" //     height="20px" //   <Skeleton //   /> //     endColor="#E7E8E9" //     startColor="#E7E8E9" //     width="100%" //     height="200px" //   <Skeleton // <VStack gap={4} w="full" mt={4}>
                <Stack w="full">
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
                        isRequired={Boolean(
                          carAddRequestFormik.errors.carBrand
                        )}
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
                          carAddRequestFormik.errors.plate
                            ? "#D72C0D"
                            : "#D0D5DD"
                        }
                        focusBorderColor="#F75B00"
                        value={carAddRequestFormik.values.plate.toUpperCase()}
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
                <VStack gap={2} w="full">
                  <HStack w="full" justifyContent="space-between">
                    <Text fontWeight={600} color="#1E1E1E">
                      Улсын дугаар
                    </Text>
                    <Text>{carDetails.plate}</Text>
                  </HStack>
                  <Divider />
                  <HStack w="full" justifyContent="space-between">
                    <Text fontWeight={600} color="#1E1E1E">
                      Үйлдвэрлэгч:
                    </Text>
                    <Text>{plateData?.manuname}</Text>
                  </HStack>
                  <Divider />{" "}
                  <HStack w="full" justifyContent="space-between">
                    <Text fontWeight={600} color="#1E1E1E">
                      Модел:
                    </Text>
                    <Text>{plateData?.modelname}</Text>
                  </HStack>
                  <Divider />{" "}
                  <HStack w="full" justifyContent="space-between">
                    <Text fontWeight={600} color="#1E1E1E">
                      Хөдөлгүүр:
                    </Text>
                    <Text>{plateData?.motortype}</Text>
                  </HStack>
                </VStack>
              )}
            </VStack>
            <Stack gap={4} p={0} mt={6}>
              {plateData === null ? (
                plateLoader ? (
                  <></>
                ) : (
                  <HStack gap={4}>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsCarSearched(false);
                      }}
                    >
                      Хаах
                    </Button>
                    <Button
                      variant="solid"
                      onClick={() => {
                        carAddRequestFormik.handleSubmit();
                      }}
                      isLoading={addCarRequestLoader}
                    >
                      Илгээх
                    </Button>
                  </HStack>
                )
              ) : (
                <HStack w="full" gap={4} p={0}>
                  <Button
                    onClick={() => {
                      setIsCarSearched(false);
                    }}
                    variant="secondary"
                    p="18px 10px"
                  >
                    Буцах
                  </Button>
                  <Button
                    p="10px 18px"
                    onClick={() => {
                      handleContinue();
                    }}
                    isLoading={postVehicleByPlateLoader}
                  >
                    Машин нэмэх
                  </Button>
                </HStack>
              )}
            </Stack>
          </Stack>
        ) : (
          <Stack w="full" align="center" pos="relative">
            <Stack
              spacing={{ base: 5, sm: 8, md: 10 }}
              p={6}
              w="full"
              bg="#fff"
              borderRadius="16px"
              gap="24px"
            >
              <HStack w="100%" justifyContent="space-between">
                <Text
                  fontWeight="bold"
                  fontSize="18px"
                  color="#424242"
                  fontFamily="Manrope, sans-serif"
                >
                  Машины эд анги хайхын тулд машины загварыг сонгоно уу
                </Text>
                <Stack onClick={handleRefresh}>
                  <RefreshIcon />
                </Stack>
              </HStack>
              <HStack w={"100%"} alignItems="flex-start" gap={"8px"}>
                <Box
                  flex="1"
                  padding="10px 14px"
                  textAlign="center"
                  borderRadius="8px"
                  bg={isSelected === 1 ? "#0B192C" : "inherit"}
                  cursor="pointer"
                  onClick={() => {
                    setSelected(1);
                  }}
                >
                  <Text
                    fontSize={"14px"}
                    fontWeight="bold"
                    color={isSelected === 1 ? "#fff" : "#424242"}
                    lineHeight={"171.429% 0px"}
                    fontFamily="Manrope, sans-serif"
                  >
                    Улсын дугаар
                  </Text>
                </Box>
                <Box
                  flex="1"
                  padding="10px 14px"
                  textAlign="center"
                  borderRadius="8px"
                  bg={isSelected === 3 ? "#0B192C" : "inherit"}
                  cursor="pointer"
                  onClick={() => {
                    setSelected(3);
                  }}
                >
                  <Text
                    fontSize={"sm"}
                    fontWeight="bold"
                    color={isSelected === 3 ? "#fff" : "#424242"}
                    lineHeight={"171.429% 0px"}
                    fontFamily="Manrope, sans-serif"
                  >
                    Модель сонгох
                  </Text>
                </Box>
              </HStack>

              <Stack w="full" direction={"column"} gap={6}>
                {isSelected === 3 ? (
                  <Stack spacing={3} w="full" direction={"column"}>
                    <Selection
                      data={brand}
                      isDisabled={false}
                      placeholder="Үйлдвэрлэгч"
                      type="brand"
                      selection={formik.values.selectedBrand}
                      setSelected={(value, name) => {
                        formik.setFieldValue("selectedBrand", value);
                        formik.setFieldValue("selectedBrandName", name);
                      }}
                      isAlert={
                        Boolean(formik.touched.selectedBrand) &&
                        Boolean(formik.errors.selectedBrand)
                      }
                    />

                    <Selection
                      data={model}
                      isDisabled={formik.values.selectedBrand === ""}
                      placeholder="Модел"
                      selection={formik.values.selectedModel}
                      setSelected={(value, name) => {
                        formik.setFieldValue("selectedModel", value);
                        formik.setFieldValue("selectedModelName", name);
                      }}
                      type="model"
                      isAlert={
                        Boolean(formik.touched.selectedModel) &&
                        Boolean(formik.errors.selectedModel)
                      }
                    />
                    <Selection
                      data={engine}
                      isDisabled={formik.values.selectedModel === ""}
                      placeholder="Хөдөлгүүр"
                      selection={formik.values.selectedCar}
                      setSelected={(value, name) => {
                        formik.setFieldValue("selectedCar", value);
                        formik.setFieldValue("selectedCarName", name);
                      }}
                      type="engine"
                      isAlert={
                        Boolean(formik.touched.selectedCar) &&
                        Boolean(formik.errors.selectedCar)
                      }
                    />
                  </Stack>
                ) : (
                  <VStack spacing={3} w="full" align="center">
                    <CustomInput
                      placeholder={"0000УБА"}
                      name={"plate"}
                      value={formik.values.plate}
                      onChange={formik.handleChange}
                    />
                  </VStack>
                )}
                <HStack gap={4}>
                  <Button
                    w="full"
                    variant="secondary"
                    borderRadius="8px"
                    fontSize={{ base: "14px", sm: "10px", md: "14px" }}
                    fontWeight="bold"
                    onClick={onClose}
                  >
                    Буцах
                  </Button>
                  <Button
                    w={"full"}
                    bg="#F75B00"
                    borderRadius="8px"
                    color="white"
                    fontSize={{ base: "14px", sm: "10px", md: "14px" }}
                    fontWeight="bold"
                    onClick={() => formik.handleSubmit()}
                  >
                    Машин нэмэх
                  </Button>
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        )}
      </ModalContent>
    </Modal>
  );
};
