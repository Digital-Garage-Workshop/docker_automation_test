"use client";
import { AddCarModal } from "@/components/quotation/AddCarModal";
import { UseApi } from "@/hooks/useApi";
import { useCustomToast } from "@/hooks/useCustomToast";
import { CloseIcon, PlusIcon, TrashbinIcon } from "@/icons";
import { PostQoutation } from "@/services/quotation/quotation";
import { GetCompanyNameByRe } from "@/services/user/getCompanyNameByRe";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Image,
  Input,
  List,
  ListItem,
  Select,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { SearchPart } from "@/services/search/searchPart";
import { Category, Part, OemNumber } from "../../../types/searchResponse";
import debounce from "lodash.debounce";
import React from "react";

interface PartItem {
  partName: string;
  measurement: string;
  orderNumber: string;
  description: string;
}

interface Sheet {
  id: string;
  parts: PartItem[];
  platenumber?: string;
  vin?: string;
  car_brand?: string;
  car_model?: string;
  car_engine?: string;
}

interface FormData {
  email: string;
  phone: string;
  registration: string;
  date: string;
  sheets: Sheet[];
}

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Буруу email хаяг байна")
    .required("Email оруулна уу"),
  phone: Yup.string()
    .matches(/^[0-9]{8}$/, "Утасны дугаар 8 оронтой байх ёстой")
    .required("Утасны дугаар оруулна уу"),
  registration: Yup.string()
    .matches(/^[0-9]{7}$/, "Регистрийн дугаар 7 оронтой байх ёстой")
    .required("Регистрийн дугаар оруулна уу"),
  date: Yup.string().required("Огноо оруулна уу"),
  sheets: Yup.array().of(
    Yup.object().shape({
      parts: Yup.array().of(
        Yup.object().shape({
          partName: Yup.string(),
          // .required("Сэлбэгийн нэр оруулна уу"),
          measurement: Yup.string(),
          // .required("Хэмжих нэгж сонгоно уу"),
          orderNumber: Yup.string(),
          // .required("Захиалгын тоо оруулна уу"),
          description: Yup.string(),
          // .required("Тайлбар оруулна уу"),
        })
      ),
    })
  ),
});

export default function Quotation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useCustomToast();
  const [{ data, isLoading }, fetch] = UseApi({ service: SearchPart });
  const [category, setCategory] = useState<Category[]>([]);
  const [part, setPart] = useState<Part[]>([]);
  const [oeNumber, setOeNumber] = useState<OemNumber[]>([]);

  const fetchSuggestions = debounce(async (query: string) => {
    if (query.length > 2) {
      fetch(query);
    } else {
      setCategory([]);
    }
  }, 300);

  const [
    { data: companyData, isLoading: companyLoader, error: companyError },
    getCompanyName,
  ] = UseApi({
    service: GetCompanyNameByRe,
  });

  const [
    { data: quotationData, isLoading: quotationLoader, error: quotationError },
    postQuotation,
  ] = UseApi({
    service: PostQoutation,
  });

  const formik = useFormik<FormData>({
    initialValues: {
      email: "",
      phone: "",
      registration: "",
      date: "",
      sheets: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await postQuotation({
          email: values.email.toString(),
          phone: values.phone,
          org_regnumber: values.registration.toString(),
          org_name: companyData?.name || null,
          end_date: values.date.toString(),
          cars: formatCarsData(values.sheets),
        });
      } catch (error) {
        showToast({
          type: "error",
          title: "Алдаа",
          description: "Дахин оролдоно уу.",
        });
      }
    },
  });

  // Helper functions
  const formatPartsData = (parts: PartItem[]) => {
    return parts.map((part) => ({
      part_name: part.partName,
      unit: part.measurement,
      quantity: parseInt(part.orderNumber) || 0,
      description: part.description,
    }));
  };

  const formatCarsData = (sheets: Sheet[]) => {
    return sheets.map((sheet) => ({
      platenumber: sheet.platenumber,
      vin: sheet.vin,
      car_brand: sheet.car_brand,
      car_model: sheet.car_model,
      car_engine: sheet.car_engine,
      parts: formatPartsData(sheet.parts),
    }));
  };

  const validatePartFields = (part: PartItem): boolean => {
    return (
      part.partName.trim() !== "" &&
      part.measurement.trim() !== "" &&
      part.orderNumber.trim() !== "" &&
      part.description.trim() !== ""
    );
  };

  // Form management functions
  const handlePartChange = (
    sheetIndex: number,
    partIndex: number,
    field: keyof PartItem,
    value: string
  ) => {
    const newSheets = [...formik.values.sheets];
    const newParts = [...newSheets[sheetIndex].parts];
    newParts[partIndex] = {
      ...newParts[partIndex],
      [field]: value,
    };
    newSheets[sheetIndex] = {
      ...newSheets[sheetIndex],
      parts: newParts,
    };
    formik.setFieldValue("sheets", newSheets);
  };

  const addPart = (sheetIndex: number) => {
    const currentSheet = formik.values.sheets[sheetIndex];
    const lastPart = currentSheet.parts[currentSheet.parts.length - 1];

    if (!validatePartFields(lastPart)) {
      showToast({
        type: "error",
        title: "Алдаа",
        description: "Өмнөх сэлбэгийн бүх талбарыг бөглөнө үү.",
      });
      return;
    }

    const newSheets = [...formik.values.sheets];
    newSheets[sheetIndex] = {
      ...newSheets[sheetIndex],
      parts: [
        ...newSheets[sheetIndex].parts,
        {
          partName: "",
          measurement: "Литр",
          orderNumber: "",
          description: "",
        },
      ],
    };
    formik.setFieldValue("sheets", newSheets);
  };

  const removePart = (sheetIndex: number, partIndex: number) => {
    const newSheets = [...formik.values.sheets];
    newSheets[sheetIndex] = {
      ...newSheets[sheetIndex],
      parts: newSheets[sheetIndex].parts.filter((_, i) => i !== partIndex),
    };
    formik.setFieldValue("sheets", newSheets);
  };

  const addSheet = (values: any) => {
    const newSheets = [
      ...formik.values.sheets,
      {
        id: (formik.values.sheets.length + 1).toString(),
        platenumber: values.plate || "",
        vin: values.vin || "",
        car_brand: values.selectedBrandName,
        car_model: values.selectedModelName,
        car_engine: values.selectedCarName,
        parts: [
          {
            partName: "",
            measurement: "Ширхэг",
            orderNumber: "",
            description: "",
          },
        ],
      },
    ];
    formik.setFieldValue("sheets", newSheets);
  };

  const removeSheet = (sheetIndex: number) => {
    const newSheets = formik.values.sheets.filter((_, i) => i !== sheetIndex);
    formik.setFieldValue("sheets", newSheets);
  };

  // Effects
  useEffect(() => {
    if (formik.values.registration?.length === 7) {
      getCompanyName({
        regnumber: parseInt(formik.values.registration),
      });
    }
  }, [formik.values.registration]);

  useEffect(() => {
    if (quotationData) {
      showToast({
        type: "success",
        title: "Амжилттай",
        description:
          "Таны үнийн саналын хүсэлтийг хүлээн авлаа. Тантай удахгүй холбогдох болно.",
      });
      formik.resetForm();
    }
  }, [quotationData]);

  useEffect(() => {
    if (quotationError) {
      showToast({
        type: "error",
        title: "Амжилтгүй",
        description: "Дахин оролдоно уу.",
      });
    }
  }, [quotationError]);

  return (
    // <form onSubmit={formik.handleSubmit}>
    //   <VStack w="100vw" pt={20} pb={20} bg="#F1F2F3" minH={"100vh"}>
    //     <VStack w="82%" align="flex-start" gap={20}>
    //       <VStack gap={6} w="full" align="flex-start">
    //         <VStack gap={2} align="flex-start">
    //           <Text fontSize={28} fontWeight={700}>
    //             Үнийн санал авах
    //           </Text>
    //           <Text>
    //             Lorem Ipsum is simply dummy text of the printing and typesetting
    //             industry.
    //           </Text>
    //         </VStack>
    //         <Grid
    //           w="full"
    //           gap={6}
    //           templateColumns={{
    //             base: "repeat(1, 1fr)",
    //             md: "repeat(2, 1fr)",
    //             lg: "repeat(2, 1fr)",
    //             xl: "repeat(4, 1fr)",
    //           }}
    //         >
    //           <VStack gap="6px" align="flex-start">
    //             <Text fontSize={14} fontWeight={600}>
    //               Email
    //             </Text>
    //             <Input
    //               name="email"
    //               value={formik.values.email}
    //               onChange={formik.handleChange}
    //               onBlur={formik.handleBlur}
    //               placeholder="Жишээ@Company.com"
    //               focusBorderColor="transparent"
    //               _focus={{ border: "1px solid #F75B00" }}
    //               bg="white"
    //               type="email"
    //               isInvalid={
    //                 formik.touched.email && Boolean(formik.errors.email)
    //               }
    //               _invalid={{ border: "1px solid #dc3545" }}
    //             />
    //             {formik.touched.email && formik.errors.email && (
    //               <Text color="red.500" fontSize="sm">
    //                 {formik.errors.email}
    //               </Text>
    //             )}
    //           </VStack>
    //           <VStack gap="6px" align="flex-start">
    //             <Text fontSize={14} fontWeight={600}>
    //               Утасны дугаар
    //             </Text>
    //             <Input
    //               name="phone"
    //               value={formik.values.phone}
    //               onChange={formik.handleChange}
    //               onBlur={formik.handleBlur}
    //               placeholder="+976"
    //               focusBorderColor="transparent"
    //               _focus={{ border: "1px solid #F75B00" }}
    //               bg="white"
    //               maxLength={8}
    //               type="number"
    //               isInvalid={
    //                 formik.touched.phone && Boolean(formik.errors.phone)
    //               }
    //               _invalid={{ border: "1px solid #dc3545" }}
    //             />
    //             {formik.touched.phone && formik.errors.phone && (
    //               <Text color="red.500" fontSize="sm">
    //                 {formik.errors.phone}
    //               </Text>
    //             )}
    //           </VStack>
    //           <VStack gap="6px" align="flex-start" pos={"relative"}>
    //             <Text fontSize={14} fontWeight={600}>
    //               Компанийн регистрийн дугаар
    //             </Text>
    //             <Input
    //               name="registration"
    //               value={formik.values.registration}
    //               onChange={formik.handleChange}
    //               onBlur={formik.handleBlur}
    //               placeholder="182739"
    //               focusBorderColor="transparent"
    //               _focus={{ border: "1px solid #F75B00" }}
    //               bg="white"
    //               type="number"
    //               maxLength={7}
    //               _invalid={{ border: "1px solid #dc3545" }}
    //               isInvalid={
    //                 formik.touched.registration &&
    //                 Boolean(formik.errors.registration)
    //               }
    //             />
    //             <Text
    //               fontSize={14}
    //               fontWeight={600}
    //               pl={2}
    //               pos="absolute"
    //               bottom={-6}
    //             >
    //               {companyData?.name}
    //             </Text>
    //             {formik.touched.registration && formik.errors.registration && (
    //               <Text color="red.500" fontSize="sm">
    //                 {formik.errors.registration}
    //               </Text>
    //             )}
    //           </VStack>
    //           <VStack gap="6px" align="flex-start">
    //             <Text fontSize={14} fontWeight={600}>
    //               Сэлбэг бэлэн болгох хугацаа
    //             </Text>
    //             <Input
    //               name="date"
    //               value={formik.values.date}
    //               onChange={formik.handleChange}
    //               onBlur={formik.handleBlur}
    //               type="date"
    //               focusBorderColor="transparent"
    //               _focus={{ border: "1px solid #F75B00" }}
    //               bg="white"
    //               isInvalid={formik.touched.date && Boolean(formik.errors.date)}
    //               _invalid={{ border: "1px solid #dc3545" }}
    //             />
    //             {formik.touched.date && formik.errors.date && (
    //               <Text color="red.500" fontSize="sm">
    //                 {formik.errors.date}
    //               </Text>
    //             )}
    //           </VStack>
    //         </Grid>
    //       </VStack>

    //       <VStack gap={8} w="full">
    //         {formik.values.sheets.map((sheet, sheetIndex) => (
    //           <VStack
    //             key={sheet.id}
    //             w="full"
    //             p={4}
    //             bg="white"
    //             borderRadius={8}
    //             gap={6}
    //           >
    //             <HStack w="full" justify="space-between">
    //               <Text fontSize={20} fontWeight={700}>
    //                 Үнийн санал (
    //                 {sheet.platenumber ||
    //                   `${sheet.car_brand} ${sheet.car_model} ${sheet.car_engine}`}
    //                 )
    //               </Text>
    //               <Button
    //                 variant="outline"
    //                 w="fit-content"
    //                 leftIcon={<TrashbinIcon color="#1E1E1E" w="24" h="24" />}
    //                 onClick={() => removeSheet(sheetIndex)}
    //                 display={{ base: "none", lg: "flex" }}
    //               >
    //                 Талбарыг устгах
    //               </Button>

    //               <Button
    //                 variant="outline"
    //                 w="fit-content"
    //                 p={"11px"}
    //                 onClick={() => removeSheet(sheetIndex)}
    //                 display={{ base: "flex", lg: "none" }}
    //               >
    //                 <CloseIcon />
    //               </Button>
    //             </HStack>

    //             {sheet.parts.map((part, partIndex) => (
    //               <Stack
    //                 key={partIndex}
    //                 w="full"
    //                 gap={4}
    //                 flexDirection={{ base: "column", lg: "row" }}
    //               >
    //                 <VStack
    //                   flex={2.5}
    //                   gap="6px"
    //                   align="flex-start"
    //                   pos="relative"
    //                 >
    //                   <Text fontSize={14} fontWeight={600}>
    //                     Сэлбэгийн нэр эсвэл OEM дугаар
    //                   </Text>
    //                   <Input
    //                     value={part.partName}
    //                     onChange={(e) => {
    //                       handlePartChange(
    //                         sheetIndex,
    //                         partIndex,
    //                         "partName",
    //                         e.target.value
    //                       );
    //                       // if (e.target.value.length > 2) {
    //                       //   fetchSuggestions(e.target.value);
    //                       // }
    //                     }}
    //                     placeholder="Мотор"
    //                     focusBorderColor="transparent"
    //                     _focus={{ border: "1px solid #F75B00" }}
    //                     _invalid={{ border: "1px solid #dc3545" }}
    //                   />
    //                   {/* {data && (
    //                     <Box
    //                       position="absolute"
    //                       top="100%"
    //                       left={0}
    //                       right={0}
    //                       bg="white"
    //                       borderRadius="8px"
    //                       px={2}
    //                       py={6}
    //                       zIndex={15}
    //                       maxHeight="300px"
    //                       overflowY="auto"
    //                       mt={4}
    //                     >
    //                       {category.length > 0 ||
    //                       // part.length > 0 ||
    //                       oeNumber.length > 0 ? (
    //                         <List spacing={0}>
    //                           {isLoading ? ( // Show loader if loading
    //                             <ListItem padding={2} textAlign="center">
    //                               <Spinner size="sm" />
    //                             </ListItem>
    //                           ) : category.length > 0 ? (
    //                             <>
    //                               <Flex mx={2}>
    //                                 <Text fontWeight={700}>Ангилал</Text>
    //                               </Flex>
    //                               {category.map(
    //                                 (suggestion: Category, index: number) => (
    //                                   <HStack>
    //                                     {suggestion.imgurl === null ? (
    //                                       <Box />
    //                                     ) : (
    //                                       <Image src={`${suggestion.imgurl}`} />
    //                                     )}
    //                                     <ListItem
    //                                       w="full"
    //                                       key={index}
    //                                       padding={2}
    //                                       _hover={{
    //                                         backgroundColor: "gray.100",
    //                                         cursor: "pointer",
    //                                       }}
    //                                       onMouseDown={() =>
    //                                         handleSuggestionClick(
    //                                           suggestion.categoryid,
    //                                           suggestion.name,
    //                                           true
    //                                         )
    //                                       }
    //                                     >
    //                                       {suggestion.categoryname}
    //                                     </ListItem>
    //                                   </HStack>
    //                                 )
    //                               )}
    //                             </>
    //                           ) : (
    //                             <Box />
    //                           )}

    //                           {part.length > 0 ? (
    //                             <>
    //                               <Flex mx={2}>
    //                                 <Text fontWeight={700}>Сэлбэг</Text>
    //                               </Flex>
    //                               {part.map((part: Part, index: number) => (
    //                                 <HStack>
    //                                   <ListItem
    //                                     key={index}
    //                                     padding={2}
    //                                     w={"full"}
    //                                     _hover={{
    //                                       backgroundColor: "gray.100",
    //                                       cursor: "pointer",
    //                                     }}
    //                                     onMouseDown={() =>
    //                                       handleSuggestionClick(
    //                                         part.articleid,
    //                                         part.name,
    //                                         false
    //                                       )
    //                                     }
    //                                   >
    //                                     {part.categoryname}/{part.brandname}/
    //                                     {part.articleno}
    //                                   </ListItem>
    //                                 </HStack>
    //                               ))}
    //                             </>
    //                           ) : (
    //                             <Box />
    //                           )}

    //                           {oeNumber.length > 0 ? (
    //                             <>
    //                               <Flex mx={2}>
    //                                 <Text fontWeight={700}>OEM дугаар</Text>
    //                               </Flex>
    //                               {oeNumber.map(
    //                                 (oeNumber: OemNumber, index: number) => (
    //                                   <ListItem
    //                                     key={index}
    //                                     padding={2}
    //                                     w="full"
    //                                     _hover={{
    //                                       backgroundColor: "gray.100",
    //                                       cursor: "pointer",
    //                                     }}
    //                                     onMouseDown={() =>
    //                                       handleSuggestionClick(
    //                                         oeNumber.articleid,
    //                                         oeNumber.oemnumber,
    //                                         false
    //                                       )
    //                                     }
    //                                   >
    //                                     {oeNumber.oemnumber} /{" "}
    //                                     {oeNumber.brandname}
    //                                   </ListItem>
    //                                 )
    //                               )}
    //                             </>
    //                           ) : (
    //                             <Box />
    //                           )}
    //                         </List>
    //                       ) : (
    //                         <Box padding={2} color="gray.500">
    //                           Илэрц олдсонгүй
    //                         </Box>
    //                       )}
    //                     </Box>
    //                   )} */}
    //                 </VStack>
    //                 <HStack gap={4} flex={2}>
    //                   <VStack flex={1} gap="6px" align="flex-start">
    //                     <Text fontSize={14} fontWeight={600}>
    //                       Хэмжих нэгж
    //                     </Text>
    //                     <Select
    //                       value={part.measurement}
    //                       onChange={(e) =>
    //                         handlePartChange(
    //                           sheetIndex,
    //                           partIndex,
    //                           "measurement",
    //                           e.target.value
    //                         )
    //                       }
    //                       focusBorderColor="transparent"
    //                       _focus={{ border: "1px solid #F75B00" }}
    //                     >
    //                       <option value="Литр">Литр</option>
    //                       <option value="Ширхэг">Ширхэг</option>
    //                     </Select>
    //                   </VStack>
    //                   <VStack flex={1} gap="6px" align="flex-start">
    //                     <Text fontSize={14} fontWeight={600}>
    //                       Захиалгын тоо
    //                     </Text>
    //                     <Input
    //                       value={part.orderNumber}
    //                       onChange={(e) =>
    //                         handlePartChange(
    //                           sheetIndex,
    //                           partIndex,
    //                           "orderNumber",
    //                           e.target.value
    //                         )
    //                       }
    //                       placeholder="1"
    //                       focusBorderColor="transparent"
    //                       _focus={{ border: "1px solid #F75B00" }}
    //                       type="number"
    //                       _invalid={{ border: "1px solid #dc3545" }}
    //                     />
    //                   </VStack>
    //                 </HStack>
    //                 <VStack flex={2.5} gap="6px" align="flex-start">
    //                   <Text fontSize={14} fontWeight={600}>
    //                     Тайлбар
    //                   </Text>
    //                   <Input
    //                     value={part.description}
    //                     onChange={(e) =>
    //                       handlePartChange(
    //                         sheetIndex,
    //                         partIndex,
    //                         "description",
    //                         e.target.value
    //                       )
    //                     }
    //                     placeholder="Товч тайлбар"
    //                     focusBorderColor="transparent"
    //                     _focus={{ border: "1px solid #F75B00" }}
    //                   />
    //                 </VStack>
    //                 <Button
    //                   variant="outline"
    //                   w={{
    //                     base:
    //                       partIndex === sheet.parts.length - 1
    //                         ? "fit-content"
    //                         : "100%",
    //                     lg: "fit-content",
    //                   }}
    //                   alignSelf={{ base: "center", lg: "flex-end" }}
    //                   p="11px"
    //                   onClick={() => {
    //                     if (partIndex === sheet.parts.length - 1) {
    //                       addPart(sheetIndex);
    //                     } else {
    //                       removePart(sheetIndex, partIndex);
    //                     }
    //                   }}
    //                 >
    //                   {partIndex === sheet.parts.length - 1 ? (
    //                     <PlusIcon w="20" />
    //                   ) : (
    //                     <TrashbinIcon color="#1E1E1E" w="24" h="24" />
    //                   )}
    //                 </Button>
    //               </Stack>
    //             ))}
    //           </VStack>
    //         ))}
    //         <VStack gap={4} w={{ base: "100%", lg: 506 }} alignSelf="center">
    //           <Button
    //             variant="outline"
    //             leftIcon={<PlusIcon />}
    //             onClick={onOpen}
    //           >
    //             Машин нэмэх
    //           </Button>
    //           <AddCarModal
    //             isOpen={isOpen}
    //             onClose={onClose}
    //             addSheet={addSheet}
    //           />

    //           <Button
    //             type="submit"
    //             bg="#0B192C"
    //             _hover={{ bg: "#152F53" }}
    //             _loading={{ bg: "#152F53" }}
    //             isLoading={quotationLoader}
    //             display={formik.values.sheets.length === 0 ? "none" : "flex"}
    //           >
    //             Үнийн санал илгээх (PDF)
    //           </Button>
    //         </VStack>
    //       </VStack>
    //     </VStack>
    //   </VStack>
    // </form>
    null
  );
}
