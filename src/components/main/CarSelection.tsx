"use client";
import { UseApi } from "@/hooks/useApi";
import {
  resetCarDetails,
  setCarDetails,
  setChanged,
} from "@/redux/slices/carSlice";
import { setMainSearch } from "@/redux/slices/mainSearchSlice";
import {
  Box,
  Collapse,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CarBrands as _CarBrands, CarModels, Engine } from "@/services";
import { Selection } from "./Selection";
import { DownArrow, SearchIcon } from "@/icons";
import { CarModal } from "./CarModal";
import { useCustomToast } from "@/hooks/useCustomToast";
import { VehicleSelectionSheet } from "./CarSelectionBottomSheet";
import { Alert } from "../Alert";
import { useScrollContext } from "@/providers/ScrollContext";
import React from "react";
import { setCars } from "@/redux/slices/carHistory";
import Image from "next/image";

type CarSelectionProps = {
  isShow?: boolean;
  isInMain?: boolean;
};

export const CarSelection = (props: CarSelectionProps) => {
  const { ref, setCarSelection, isCarSelectionFocused } = useScrollContext();
  const { isShow, isInMain } = props;
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const dispatch = useDispatch();
  const { isMainSearchChanged } = useSelector((state: any) => state.mainSearch);
  const carDetails = useSelector((state: any) => state.car);
  const showToast = useCustomToast();
  const isChanged = useSelector((state: any) => state.car);

  const [plateError, setPlateError] = useState("");

  const formik = useFormik({
    initialValues: {
      selectedBrand: carDetails.brandId || "",
      selectedBrandName: carDetails.brandName || "",
      selectedModel: carDetails.modelId || "",
      selectedModelName: carDetails.modelName || "",
      selectedCar: carDetails.carId || "",
      selectedCarName: carDetails.carName || "",
      plate: carDetails.searchedBy !== 3 ? carDetails.plate : "",
      vin: "",
    },
    onSubmit: (values) => {
      if (values.selectedCar) {
        dispatch(
          setCarDetails({
            brandId: values.selectedBrand,
            brandName: values.selectedBrandName,
            modelId: values.selectedModel,
            modelName: values.selectedModelName,
            carId: values.selectedCar,
            carName: values.selectedCarName,
            plate: "",
            vin: "",
            searchedBy: 3,
          })
        );
        dispatch(
          setCars({
            brandId: values.selectedBrand,
            brandName: values.selectedBrandName,
            modelId: values.selectedModel,
            modelName: values.selectedModelName,
            carId: values.selectedCar,
            carName: values.selectedCarName,
            plate: "",
          })
        );

        dispatch(setMainSearch(!isMainSearchChanged));
        router.push(`/category`);
      } else {
        showToast({
          type: "error",
          title: "Алдаа гарлаа",
          description: "Машинаа сонгоно уу!",
        });
      }
    },
  });

  const { values, handleSubmit, setFieldValue, touched, errors } = formik;

  const [
    { data: brand, isLoading: brandIsLoading, error: brandError },
    brandFetch,
  ] = UseApi({
    service: _CarBrands,
  });

  const [
    { data: model, isLoading: modeIsLoading, error: modelError },
    modelFetch,
  ] = UseApi({
    service: CarModels,
  });

  const [{ data: engine, isLoading, error }, fetch] = UseApi({
    service: Engine,
  });

  useEffect(() => {
    brandFetch();
  }, []);

  useEffect(() => {
    if (values.selectedBrand) {
      modelFetch({ id: values.selectedBrand });
      if (values.selectedModel) {
        fetch({ manuid: values.selectedBrand, modelid: values.selectedModel });
      }
    }
  }, [values.selectedBrand, values.selectedModel]);

  const showCarModal = () => {
    if (values.plate) {
      onOpen();
    } else {
      showToast({
        type: "error",
        title: "Алдаа гарлаа",
        description: "Машины дугаарыг оруулна уу!",
      });
    }
  };

  // Function to handle plate search when Enter key is pressed
  const handlePlateSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent full form submission
      if (values.plate) {
        if (plateError) {
          showToast({
            type: "error",
            title: "Алдаа гарлаа",
            description: plateError,
          });
        } else {
          showCarModal();
        }
      } else {
        showToast({
          type: "error",
          title: "Алдаа гарлаа",
          description: "Машины дугаарыг оруулна уу!",
        });
      }
    }
  };

  useEffect(() => {
    if (carDetails.plate) {
      formik.setFieldValue("selectedBrand", carDetails.brandId || "");
      formik.setFieldValue("selectedModel", carDetails.modelId || "");
      formik.setFieldValue("selectedCar", carDetails.carId || "");
      return;
    }
    if (carDetails.carId) {
      return;
    }

    formik.resetForm();
    formik.setFieldValue("plate", "");
    formik.setFieldValue("selectedBrand", "");
    formik.setFieldValue("selectedModel", "");
    formik.setFieldValue("selectedCar", "");
    formik.setFieldValue("selectedCarName", "");
  }, [isChanged]);

  const validatePlate = (plate: string) => {
    const mongolianPattern = /^[0-9]{4}[А-ЯӨҮ]{2,3}$/; // 4 digits followed by 2 or 3 uppercase Cyrillic letters, including Ө and Ү
    if (!mongolianPattern.test(plate)) {
      setPlateError("Тохиромжгүй формат: 4 тоо ба 2 эсвэл 3 үсэг байх ёстой.");
    } else {
      setPlateError("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setFieldValue(name, uppercaseValue);
    validatePlate(uppercaseValue);
  };

  const refresh = () => {
    dispatch(resetCarDetails());
    dispatch(setChanged());
  };

  return (
    <Collapse
      in={isInMain != null ? true : carDetails.isCarCompShow ? true : false}
      ref={ref}
    >
      <Alert isRow={true} />
      <form onSubmit={handleSubmit} style={{ width: "100vw" }}>
        <Stack
          height={{ base: "486px", md: isInMain ? 363 : 270 }}
          pos="relative"
          bg="#F1F2F3"
          w="full"
        >
          <Stack
            position="relative"
            w="100vw"
            height={{ base: "486px", md: isInMain ? 363 : 219 }}
            pos="relative"
            bgPosition="center"
            gap={0}
            align="center"
            justify="center"
          >
            <Box w="full" h="full" pos="absolute" bottom={0}>
              <Image
                src="https://mechanicappgarage.sgp1.cdn.digitaloceanspaces.com/garagemn/static/viber_image_2024-12-31_11-43-33-233.webp"
                alt="Background Image"
                priority
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                loading="eager"
              />
            </Box>

            <Stack
              backdropFilter={"auto"}
              backdropBrightness="60%"
              px={{ base: 4, md: 6 }}
              align="center"
              justify="center"
              w="100%"
              h="100%"
            >
              <VStack
                gap={{ base: 3, md: 6 }}
                w={{
                  base: "100%",
                  sm: "100%",
                  md: "82vw",
                  lg: "82vw",
                  xl: "82vw",
                }}
              >
                <Text
                  fontSize={{ base: "24px", md: 40 }}
                  fontWeight={700}
                  color="white"
                >
                  Машин сонгох
                </Text>
                <Text
                  color="white"
                  maxW={600}
                  textAlign="center"
                  mt={{ base: -2, md: -4 }}
                >
                  Бид дэлхийд тэргүүлэгч брэндүүдээс таны хэрэгцээ шаардлагад
                  нийцсэн автомашины сэлбэг эд ангийг нийлүүлдэг.
                </Text>
                <Stack
                  backdropFilter={{ base: "none", md: "auto" }}
                  backdropBrightness={{ base: "0%", md: "60%" }}
                  bg={{ base: "transparent", md: "rgba(30, 30, 30, 0.50)" }}
                  borderRadius={8}
                  pos={{
                    base: "static",
                    md: !isInMain ? "absolute" : "static",
                  }}
                  bottom={!isInMain ? "-44px" : 0}
                  w={{ base: "100%", md: isInMain ? "100%" : "82%" }}
                >
                  <HStack
                    p={{ base: 0, md: 4 }}
                    gap={{ base: 2, md: 4 }}
                    w="100%"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    alignSelf="center"
                    borderRadius={8}
                    border={
                      isCarSelectionFocused
                        ? "2px solid white"
                        : "2px solid transparent"
                    }
                    transition="border 0.3s ease-in-out"
                  >
                    <InputGroup
                      w={{ base: "100%", md: "25%" }}
                      bg="white"
                      borderRadius={8}
                      justifySelf="flex-start"
                    >
                      <Input
                        name="plate"
                        value={values.plate}
                        onChange={handleInputChange}
                        variant="ghost"
                        height={{ base: "43px", md: 14 }}
                        bg={"#fff"}
                        w={"full"}
                        onKeyDown={handlePlateSearch}
                        textAlign={"left"}
                        placeholder="0000  AAA"
                        _placeholder={{
                          fontSize: { base: 18, md: 24 },
                          fontWeight: 700,
                          color: "#A0A0A0",
                          textAlign: "left",
                        }}
                        fontSize={{ base: 18, md: 24 }}
                        fontWeight={700}
                        _focus={{ borderColor: "transparent" }}
                        maxLength={7}
                        className="no-highlight-input"
                      />
                      <InputRightElement
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        top={{ base: "4px", md: "8px" }}
                        right={{ base: "8px", md: "12px" }}
                      >
                        {/* <HStack gap={2}> */}
                        <Stack
                          bg="#1E1E1E"
                          w={{ base: "32px", md: "40px" }}
                          h={{ base: 8, md: 10 }}
                          rounded={8}
                          justifyContent="center"
                          alignItems="center"
                          onClick={() => {
                            if (plateError) {
                              showToast({
                                type: "error",
                                title: "Алдаа гарлаа",
                                description: plateError,
                              });
                            } else {
                              showCarModal();
                            }
                          }}
                          mt={{ base: -1, md: 0 }}
                          cursor="pointer"
                        >
                          <SearchIcon color="#fff" />
                        </Stack>
                        {/* </HStack> */}
                        <CarModal
                          isOpen={isOpen}
                          onClose={onClose}
                          searchBy="plate"
                          value={values.plate}
                        />
                      </InputRightElement>
                    </InputGroup>

                    <VStack
                      position="relative"
                      gap={1}
                      display={{ base: "none", md: "flex" }}
                    >
                      <Stack w={"1px"} h={"14px"} bg={"white"} top={0} />
                      <Text
                        bg="transparent"
                        px="4"
                        fontSize={12}
                        fontWeight={700}
                        color="white"
                      >
                        эсвэл
                      </Text>
                      <Stack w={"1px"} h={"14px"} bg={"white"} bottom={0} />
                    </VStack>
                    <HStack
                      justifyContent={"center"}
                      w={"100%"}
                      position="relative"
                      gap={1}
                      display={{ base: "flex", md: "none" }}
                      my={2}
                    >
                      <Stack w={"30%"} h={"1px"} bg={"white"} top={0} />
                      <Text
                        bg="transparent"
                        px="4"
                        fontSize={12}
                        fontWeight={700}
                        color="white"
                      >
                        эсвэл
                      </Text>
                      <Stack w={"30%"} h={"1px"} bg={"white"} bottom={0} />
                    </HStack>
                    <VehicleSelectionSheet
                      isOpen={isDrawerOpen}
                      onClose={onDrawerClose}
                      selectedVehiclePath="BMW › 2 › 2 Coupe (F22, F87) › Petrol › 3.0 › M 235 I XDrive"
                    />
                    <InputGroup
                      display={{ base: "flex", md: "none" }}
                      w={{ base: "100%", md: 234 }}
                      bg="white"
                      borderRadius={8}
                    >
                      <Input
                        value={`${
                          carDetails.brandName == ""
                            ? "Машин сонгох"
                            : carDetails.brandName
                        } ${carDetails.modelName} ${carDetails.carName}`}
                        name="selectedCar"
                        onChange={() => {}}
                        onClick={onDrawerOpen}
                        variant="ghost"
                        height={{ base: 12, md: 14 }}
                        bg="#fff"
                        textAlign={{ base: "start", md: "center" }}
                        p="8px 16px"
                        placeholder="Машин сонгох"
                        _placeholder={{
                          fontSize: { base: 18, md: 24 },
                          fontWeight: { base: 600, md: 700 },
                          color: "#475467",
                        }}
                        fontSize={{ base: 16, md: 24 }}
                        fontWeight={{ base: 600, md: 700 }}
                        color="#475467"
                        _focus={{ borderColor: "transparent" }}
                      />
                      <InputRightElement
                        alignSelf="center"
                        justifySelf="center"
                        top="8px"
                        right="16px"
                      >
                        <DownArrow color="black" w={"12px"} h={"12px"} />
                      </InputRightElement>
                    </InputGroup>

                    <HStack
                      display={{ base: "none", md: "flex" }}
                      p={{ base: "8px", md: "8px 16px 8px 40px" }}
                      bg="#fff"
                      w={{ base: "90%", md: "75%" }}
                      rounded={8}
                      gap={6}
                    >
                      <Selection
                        data={brand}
                        isDisabled={false}
                        placeholder="Үйлдвэрлэгч"
                        type="brand"
                        selection={values.selectedBrand}
                        setSelected={(value, name) => {
                          setFieldValue("selectedBrand", value);
                          setFieldValue("selectedBrandName", name);
                        }}
                        isAlert={
                          Boolean(touched.selectedBrand) &&
                          Boolean(errors.selectedBrand)
                        }
                        isInMain={true}
                      />
                      <Stack w={"1px"} height={8} bg="#CFCFCF" />
                      <Selection
                        data={model}
                        isDisabled={values.selectedBrand === ""}
                        placeholder="Модел"
                        selection={values.selectedModel}
                        setSelected={(value, name) => {
                          setFieldValue("selectedModel", value);
                          setFieldValue("selectedModelName", name);
                        }}
                        type="model"
                        isAlert={
                          Boolean(touched.selectedModel) &&
                          Boolean(errors.selectedModel)
                        }
                        isInMain={true}
                      />
                      <Stack w={"1px"} height={8} bg="#CFCFCF" />
                      <Selection
                        data={engine}
                        isDisabled={values.selectedModel === ""}
                        placeholder="Хөдөлгүүр"
                        selection={values.selectedCar}
                        setSelected={(value, name) => {
                          setFieldValue("selectedCar", value);
                          setFieldValue("selectedCarName", name);
                        }}
                        type="engine"
                        isAlert={
                          Boolean(touched.selectedCar) &&
                          Boolean(errors.selectedCar)
                        }
                        isInMain={true}
                      />
                      <HStack gap={2}>
                        {/* <Button
                          variant={"filled"}
                          alignItems="center"
                          justifyContent="center"
                          p={"10px"}
                          w={10}
                          h={10}
                          onClick={refresh}
                        >
                          <RefreshIcon />
                        </Button> */}
                        <button
                          type="submit"
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                          }}
                        >
                          <Stack
                            bg="#1E1E1E"
                            w={10}
                            h={10}
                            rounded={8}
                            display={{ base: "none", md: "flex" }}
                            justifyContent="center"
                            alignItems="center"
                            cursor="pointer"
                          >
                            <SearchIcon color="#fff" />
                          </Stack>
                        </button>{" "}
                      </HStack>
                    </HStack>
                  </HStack>
                </Stack>
              </VStack>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Collapse>
  );
};
