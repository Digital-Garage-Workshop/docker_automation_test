// "use client";
// import { useState, useEffect } from "react";
// import { Button, Text, Box, VStack, HStack, Stack } from "@chakra-ui/react";
// import { Selection } from "./Selection";
// import CustomInput from "./CustomInput";
// import { RefreshIcon } from "@/Icons";
// import { CarBrands as _CarBrands, CarModels, Engine } from "@/services";
// import { UseApi } from "@/hooks/useApi";
// import { useRouter } from "next/navigation";
// import { useFormik } from "formik";

// import { Alert, CarModal } from "@/components";
// import { useDisclosure } from "@chakra-ui/react";
// import { useDispatch, useSelector } from "react-redux";

// import { setMainSearch } from "@/redux/slices/mainSearchSlice";
// import { setCarDetails, resetCarDetails } from "@/redux/slices/carSlice";

// export const CarSelection = (props: { isRow: boolean }) => {
//   const { isRow } = props;
//   const [isSelected, setSelected] = useState<number>(3);
//   const router = useRouter();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const dispatch = useDispatch();
//   const { isMainSearchChanged } = useSelector((state: any) => state.mainSearch);
//   const carDetails = useSelector((state: any) => state.car);

//   const formik = useFormik({
//     initialValues: {
//       selectedBrand: "",
//       selectedBrandName: "",
//       selectedModel: "",
//       selectedModelName: "",
//       selectedCar: "",
//       selectedCarName: "",
//       plate: "",
//       vin: "",
//     },
//     onSubmit: (values) => {
//       if (isSelected === 1 || isSelected === 2) {
//         if (values.plate) {
//           onOpen();

//           console.log("Submitted with plate");
//         } else if (values.vin) {
//           onOpen();
//           dispatch(
//             setCarDetails({
//               vin: values.vin,

//               searchedBy: 2,
//             })
//           );
//           console.log("Submitted with VIN");
//         }
//       } else if (isSelected === 3) {
//         if (values.selectedCar) {
//           router.push(`/cssc/${values.selectedCar}`);
//           dispatch(
//             setCarDetails({
//               brandId: values.selectedBrand,
//               brandName: values.selectedBrandName,
//               modelId: values.selectedModel,
//               modelName: values.selectedModelName,
//               carId: values.selectedCar,
//               carName: values.selectedCarName,
//               searchedBy: 3,
//             })
//           );
//           console.log("Submitted with car selection");
//         } else {
//           console.error("Please select a car.");
//         }
//       } else {
//         console.error("Invalid selection.");
//       }
//     },
//   });

//   const [
//     { data: brand, isLoading: brandIsLoading, error: brandError },
//     brandFetch,
//   ] = UseApi({
//     service: _CarBrands,
//   });

//   const [
//     { data: model, isLoading: modeIsLoading, error: modelError },
//     modelFetch,
//   ] = UseApi({
//     service: CarModels,
//   });

//   const [{ data: engine, isLoading, error }, fetch] = UseApi({
//     service: Engine,
//   });

//   useEffect(() => {
//     brandFetch();

//     formik.setValues({
//       selectedBrand: carDetails.brandId || "",
//       selectedBrandName: carDetails.brandName || "",
//       selectedModel: carDetails.modelId || "",
//       selectedModelName: carDetails.modelName || "",
//       selectedCar: carDetails.carId || "",
//       selectedCarName: carDetails.carName || "",
//       plate: carDetails.plate || "",
//       vin: carDetails.vin || "",
//     });
//   }, [carDetails]);
//   useEffect(() => {
//     if (carDetails.searchedBy) {
//       setSelected(carDetails.searchedBy);
//     } else {
//       setSelected(3);
//     }
//   }, []);
//   useEffect(() => {
//     if (formik.values.selectedBrand) {
//       modelFetch({
//         id: formik.values.selectedBrand,
//       });
//     }
//   }, [formik.values.selectedBrand]);

//   useEffect(() => {
//     if (formik.values.selectedBrand && formik.values.selectedModel) {
//       fetch({
//         manuid: formik.values.selectedBrand,
//         modelid: formik.values.selectedModel,
//       });
//     }
//   }, [formik.values.selectedBrand, formik.values.selectedModel]);

//   useEffect(() => {
//     dispatch(
//       setCarDetails({
//         brandId: formik.values.selectedBrand,
//         brandName: formik.values.selectedBrandName,
//         modelId: formik.values.selectedModel,
//         modelName: formik.values.selectedModelName,
//         carId: formik.values.selectedCar,
//         carName: formik.values.selectedCarName,
//         plate: formik.values.plate,
//         vin: formik.values.vin,
//         // Include searchedBy to preserve its value
//         searchedBy: carDetails.searchedBy,
//       })
//     );
//     dispatch(setMainSearch(!isMainSearchChanged));
//   }, [
//     formik.values.selectedBrand,
//     formik.values.selectedBrandName,
//     formik.values.selectedModel,
//     formik.values.selectedModelName,
//     formik.values.selectedCar,
//     formik.values.selectedCarName,
//     formik.values.plate,
//     formik.values.vin,
//   ]);
//   const handleRefresh = () => {
//     dispatch(resetCarDetails());
//     // formik.setValues({
//     //   selectedBrand: "",
//     //   selectedBrandName: "",
//     //   selectedModel: "",
//     //   selectedModelName: "",
//     //   selectedCar: "",
//     //   selectedCarName: "",
//     //   plate: "",
//     //   vin: "",
//     // });
//     dispatch(setMainSearch(!isMainSearchChanged));
//   };

//   return (
//     <Stack w={isRow ? "100%" : "42%"} align="center" pos="relative" mt={7}>
//       <Alert isRow={isRow} />
//       <Stack
//         spacing={{ base: 5, sm: 8, md: 10 }}
//         p={isRow ? "24px 24px" : "24px"}
//         w={isRow ? "82%" : "100%"}
//         bg={isRow ? "white" : "#F9FAFB"}
//         borderRadius="16px"
//         gap="24px"
//       >
//         <HStack w="100%" justifyContent="space-between">
//           <Text
//             fontWeight="bold"
//             fontSize="18px"
//             color="#424242"
//             fontFamily="Manrope, sans-serif"
//           >
//             Машины эд анги хайхын тулд машины загварыг сонгоно уу
//           </Text>
//           <Stack onClick={handleRefresh}>
//             <RefreshIcon />
//           </Stack>
//         </HStack>
//         <HStack
//           w={isRow ? "445px" : "100%"}
//           alignItems="flex-start"
//           gap={"8px"}
//         >
//           <Box
//             flex="1"
//             padding="10px 14px"
//             textAlign="center"
//             borderRadius="8px"
//             bg={isSelected === 1 ? "#53BC00" : "inherit"}
//             cursor="pointer"
//             onClick={() => {
//               setSelected(1);
//             }}
//           >
//             <Text
//               fontSize={"14px"}
//               fontWeight="bold"
//               color={isSelected === 1 ? "#fff" : "#424242"}
//               lineHeight={"171.429% 0px"}
//               fontFamily="Manrope, sans-serif"
//             >
//               Улсын дугаар
//             </Text>
//           </Box>
//           <Box
//             flex="1"
//             padding="10px 14px"
//             textAlign="center"
//             borderRadius="8px"
//             bg={isSelected === 2 ? "#53BC00" : "inherit"}
//             cursor="pointer"
//             onClick={() => {
//               setSelected(2);
//             }}
//           >
//             <Text
//               fontSize={"14px"}
//               fontWeight={700}
//               color={isSelected === 2 ? "#fff" : "#424242"}
//               lineHeight={"171.429% 0px"}
//               fontFamily="Manrope, sans-serif"
//             >
//               Арлын дугаар
//             </Text>
//           </Box>
//           <Box
//             flex="1"
//             padding="10px 14px"
//             textAlign="center"
//             borderRadius="8px"
//             bg={isSelected === 3 ? "#53BC00" : "inherit"}
//             cursor="pointer"
//             onClick={() => {
//               setSelected(3);
//             }}
//           >
//             <Text
//               fontSize={"sm"}
//               fontWeight="bold"
//               color={isSelected === 3 ? "#fff" : "#424242"}
//               lineHeight={"171.429% 0px"}
//               fontFamily="Manrope, sans-serif"
//             >
//               Модель сонгох
//             </Text>
//           </Box>
//         </HStack>

//         <Stack w="full" direction={isRow ? "row" : "column"} gap={6}>
//           {isSelected === 3 ? (
//             <Stack spacing={3} w="full" direction={isRow ? "row" : "column"}>
//               <Selection
//                 data={brand}
//                 isRow={isRow}
//                 isDisabled={false}
//                 placeholder="Үйлдвэрлэгч"
//                 type="brand"
//                 selection={formik.values.selectedBrand}
//                 setSelected={(value, name) => {
//                   formik.setFieldValue("selectedBrand", value);
//                   formik.setFieldValue("selectedBrandName", name);
//                 }}
//                 isAlert={
//                   Boolean(formik.touched.selectedBrand) &&
//                   Boolean(formik.errors.selectedBrand)
//                 }
//               />

//               <Selection
//                 data={model}
//                 isRow={isRow}
//                 isDisabled={formik.values.selectedBrand === ""}
//                 placeholder="Модел"
//                 selection={formik.values.selectedModel}
//                 setSelected={(value, name) => {
//                   formik.setFieldValue("selectedModel", value);
//                   formik.setFieldValue("selectedModelName", name);
//                 }}
//                 type="model"
//                 isAlert={
//                   Boolean(formik.touched.selectedModel) &&
//                   Boolean(formik.errors.selectedModel)
//                 }
//               />
//               <Selection
//                 data={engine}
//                 isRow={isRow}
//                 isDisabled={formik.values.selectedModel === ""}
//                 placeholder="Хөдөлгүүр"
//                 selection={formik.values.selectedCar}
//                 setSelected={(value, name) => {
//                   formik.setFieldValue("selectedCar", value);
//                   formik.setFieldValue("selectedCarName", name);
//                 }}
//                 type="engine"
//                 isAlert={
//                   Boolean(formik.touched.selectedCar) &&
//                   Boolean(formik.errors.selectedCar)
//                 }
//               />
//             </Stack>
//           ) : (
//             <VStack spacing={3} w="full" align="center">
//               <CustomInput
//                 placeholder={isSelected === 1 ? "0000УБА" : "********"}
//                 name={isSelected === 1 ? "plate" : "vin"}
//                 value={
//                   isSelected === 1 ? formik.values.plate : formik.values.vin
//                 }
//                 onChange={formik.handleChange}
//               />
//             </VStack>
//           )}

//           <Button
//             w={isRow ? (isSelected === 3 ? "25%" : "full") : "full"}
//             padding="15px 20px"
//             bg="#F75B00"
//             borderRadius="8px"
//             color="white"
//             fontSize={{ base: "14px", sm: "10px", md: "14px" }}
//             fontWeight="bold"
//             onClick={() => formik.handleSubmit()}
//           >
//             Сэлбэг хайх
//           </Button>
//         </Stack>
//       </Stack>
//       <CarModal
//         isOpen={isOpen}
//         onClose={onClose}
//         searchBy={isSelected === 1 ? "plate" : "vin"}
//         value={isSelected === 1 ? formik.values.plate : formik.values.vin}
//       />
//     </Stack>
//   );
// };
