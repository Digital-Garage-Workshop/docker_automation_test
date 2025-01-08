"use client";

import { UseApi } from "@/hooks/useApi";
import { DeliveryIcon, GrayInfo } from "@/icons";
import { RootState } from "@/redux/store";
import { DeliveryType } from "@/services/createOrder/deliveryType";
import {
  Button,
  HStack,
  Stack,
  Text,
  VStack,
  FormControl,
  InputGroup,
  FormLabel,
  Textarea,
  Input,
  FormHelperText,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { RegisterOrderAddress } from "@/services/createOrder/registerOrderAddress";
import { useRouter } from "next/navigation";
import { setOrderData } from "@/redux/slices/orderDataSlice";
import { useAppDispatch } from "@/hooks/hooks";

import { useCustomToast } from "@/hooks/useCustomToast";
import { OrderData } from "../../../../types";
import BeforeLocationModal from "../BeforeLocationModal";
import * as Yup from "yup";
type StepThreeUb = {
  isUb: boolean;
  orderData: OrderData | null;
};
const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Зөвхөн тоо оруулна уу") // Only allow numbers
    .min(8, "Утасны дугаар 8 оронтой байх ёстой")
    .required("Утасны дугаар шаардлагатай"),
  apartmentNumber: Yup.string().required("Байрны дугаар шаардлагатай"),
  entranceAndDoorNumber: Yup.string().required(
    "Орц & Хаалга дугаар шаардлагатай"
  ),
  additionalInfo: Yup.string(),
});

export const UbDelivery = (props: StepThreeUb) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isUb, orderData } = props;
  const showToast = useCustomToast();
  const [isModalOpen, setModalOpen] = useState(false);
  // Fetch delivery types
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: DeliveryType,
    useAuth: true,
  });

  // Register order address
  const [
    {
      data: registerOrderdata,
      isLoading: registerIsLoading,
      error: registerError,
    },
    registerFetch,
  ] = UseApi({
    service: RegisterOrderAddress,
    useAuth: true,
  });
  //error handler

  const [fastDelivery, setFastDelivery] = useState(1);
  const zipcode = useSelector((state: RootState) => state.map.zipcode);
  const markerPosition = useSelector(
    (state: RootState) => state.map.markerPosition
  );
  const address = useSelector((state: RootState) => state.map.address);

  // Fetch delivery types based on zipcode
  useEffect(() => {
    fetch({
      zipcode: zipcode,
      lang: markerPosition.lat,
      long: markerPosition.lng,
    });
  }, [zipcode]);

  // useEffect(() => {
  //   if (error) {
  //     showToast(error);
  //   }
  // }, [error]);
  // Handle order data after registration
  useEffect(() => {
    if (registerOrderdata) {
      showToast({
        type: "success",
        title: "Амжилттай",
        description: "Таны хаяг амжилттай бүртгэгдлээ",
      });
      dispatch(setOrderData(registerOrderdata));
      router.push(`/payment/checkout`);
    }
  }, [registerOrderdata]);
  useEffect(() => {
    if (registerError)
      showToast({
        type: "warning",
        title: "Түр хүлээгээрэй",
        description: `${registerError}`,
      });
  }, [registerError]);
  useEffect(() => {
    if (error != null) {
      showToast({
        type: "warning",
        title: "Түр хүлээгээрэй",
        description: `${error}`,
      });
    }
  }, [error]);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        phone: "",
        apartmentNumber: "",
        entranceAndDoorNumber: "",
        additionalInfo: "",
      }}
      enableReinitialize // This allows Formik to reinitialize on value change
      onSubmit={(values) => {
        const form = new FormData();
        if (orderData?.orderid !== undefined) {
          form.append("orderid", orderData.orderid.toString());
        }
        form.append("phone", values.phone);
        form.append("deliverytypeid", fastDelivery.toString());
        form.append("additional", ` ${values.additionalInfo}`);
        form.append("apartmentnumber", values.apartmentNumber.toString());
        form.append("doornumber", values.entranceAndDoorNumber.toString());
        form.append("zipcode", zipcode);
        form.append("address", address);
        form.append("lang", markerPosition.lat.toString());
        form.append("long", markerPosition.lng.toString());

        form.append("country", "city");
        form.append("terminalid", "");

        // Dispatch to register the order address
        registerFetch({ body: form });
      }}
    >
      {({ errors, touched, setFieldValue, values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <VStack
            gap={6}
            w="100%"
            sx={{ display: isUb ? "flex" : "none", flexDirection: "column" }}
          >
            <Stack gap={"8px"} w="full">
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={700} fontSize={20} color="#1E1E1E">
                  Таны байршил
                </Text>
                <Text
                  onClick={() => setModalOpen(true)}
                  fontSize={14}
                  decoration={"underline"}
                  cursor={"pointer"}
                  color="#1E1E1E"
                >
                  Өмнөх хаягаас сонгох
                </Text>
                <BeforeLocationModal
                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  onAddressSelect={(selectedAddress) => {
                    // Log selectedAddress for debugging

                    // Set field values from selected address
                    setFieldValue("phone", selectedAddress.phone.toString());
                    setFieldValue(
                      "apartmentNumber",
                      selectedAddress.additional
                    );
                    setFieldValue(
                      "entranceAndDoorNumber",
                      selectedAddress.additional
                    );
                    setFieldValue("additionalInfo", selectedAddress.additional);
                  }}
                />
              </HStack>

              <Text fontSize={16} color="#1E1E1E">
                Нэмэлт мэдээлэлээ оруулснаар бид илүү хурдан ажиллах болно
              </Text>
            </Stack>
            <VStack gap={4} w="full">
              {isLoading ? (
                <Skeleton
                  width="full"
                  h={"58px"}
                  startColor="#F2F4F7"
                  endColor="#F2F4F7"
                />
              ) : data == null ? (
                <Text h={"132px"} textAlign={"center"}>
                  Та газрын зургаас хаягаа сонгоно уу
                </Text>
              ) : (
                data?.map((item: any, index: number) => (
                  <Stack
                    key={index}
                    cursor={"pointer"}
                    w="full"
                    p="8px 16px"
                    border={
                      fastDelivery === item.deliverytypeid
                        ? "1px solid #F75B00"
                        : "1px solid #CFCFCF"
                    }
                    bg={
                      fastDelivery === item.deliverytypeid
                        ? "white"
                        : "transparent"
                    }
                    borderRadius={8}
                    onClick={() => {
                      setFastDelivery(item.deliverytypeid);
                    }}
                  >
                    <HStack justify="space-between">
                      <HStack gap={4}>
                        <DeliveryIcon />
                        <VStack gap="2px" align="flex-start">
                          <Text fontWeight={600} fontSize={16}>
                            {item.name}
                          </Text>
                          <Text fontSize={12}>
                            {item.name} нь {item.deliverytime} цагт хүргэгдэнэ.
                          </Text>
                        </VStack>
                      </HStack>
                      <Text
                        fontWeight={600}
                        fontSize={16}
                        color={
                          fastDelivery === item.deliverytypeid
                            ? "#F75B00"
                            : "#1E1E1E"
                        }
                      >
                        {`+${item.deliveryprice}₮`}
                      </Text>
                    </HStack>
                  </Stack>
                ))
              )}

              <HStack gap={2} alignSelf="flex-start">
                <GrayInfo />
                <Text fontSize={12} color="#424242" maxWidth={329}>
                  Та тухайн өдрийн 16:00 цагаас хойш захиалга хийсэн бол
                  захиалга нь маргааш нь хүргэлтэнд гарах болно.
                </Text>
              </HStack>
            </VStack>
            <VStack gap={4} w="full">
              <FormControl w="full">
                <FormLabel fontSize={14} fontWeight={600}>
                  Утасны дугаар
                </FormLabel>
                <InputGroup>
                  <Input
                    name="phone"
                    placeholder="Утасны дугаар"
                    maxLength={8}
                    type="number"
                    value={values.phone}
                    onChange={(e) => setFieldValue("phone", e.target.value)}
                  />
                </InputGroup>
                <FormHelperText textColor={"#D72C0D"}>
                  {errors.phone}
                </FormHelperText>
              </FormControl>
              <Stack
                gap={6}
                w="full"
                flexDirection={{ base: "column", md: "row" }}
              >
                <FormControl w="full">
                  <FormLabel fontSize={14} fontWeight={600}>
                    Байрны дугаар | Гудамжны дугаар
                  </FormLabel>
                  <InputGroup>
                    <Input
                      name="apartmentNumber"
                      placeholder="Байрны дугаар"
                      value={values.apartmentNumber} // Bind to Formik's state
                      onChange={(e) =>
                        setFieldValue("apartmentNumber", e.target.value)
                      }
                    />
                  </InputGroup>
                  <FormHelperText textColor={"#D72C0D"}>
                    {errors.apartmentNumber}
                  </FormHelperText>
                </FormControl>
                <FormControl w="full">
                  <FormLabel fontSize={14} fontWeight={600}>
                    Орц & Хаалга дугаар
                  </FormLabel>
                  <InputGroup>
                    <Input
                      name="entranceAndDoorNumber"
                      placeholder="Орц & Хаалга дугаар"
                      value={values.entranceAndDoorNumber} // Bind to Formik's state
                      onChange={(e) =>
                        setFieldValue("entranceAndDoorNumber", e.target.value)
                      }
                    />
                  </InputGroup>
                  <FormHelperText textColor={"#D72C0D"}>
                    {errors.entranceAndDoorNumber}
                  </FormHelperText>
                </FormControl>
              </Stack>
              <FormControl w="full">
                <FormLabel fontSize={14} fontWeight={600}>
                  Нэмэлт мэдээлэл
                </FormLabel>
                <InputGroup>
                  <Textarea
                    name="additionalInfo"
                    placeholder="Нэмэлт мэдээлэл"
                    h="88px"
                    border="1px solid var(--Gray-300, #D0D5DD)"
                    background="var(--Primary-White, #FFF)"
                    boxShadow="0px 1px 2px 0px rgba(10, 13, 18, 0.05)"
                    _hover={{
                      border: "1px solid var(--Gray-300, #D0D5DD)",
                      background: "var(--Gray-50, #F9FAFB)",
                      boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                    }}
                    _focus={{
                      border: "1px solid var(--Primary-Brand, #F75B00)",
                      background: "var(--Primary-White, #FFF)",
                      boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.1)",
                      outline: "none",
                    }}
                    value={values.additionalInfo} // Bind to Formik's state
                    onChange={(e) =>
                      setFieldValue("additionalInfo", e.target.value)
                    }
                  />
                </InputGroup>
                <FormHelperText textColor={"#D72C0D"}>
                  {errors.additionalInfo}
                </FormHelperText>
              </FormControl>
            </VStack>
            <Button
              isLoading={registerIsLoading}
              type="submit"
              disabled={!values.phone || !address}
            >
              Сонгох
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default UbDelivery;
