"use client";
import {
  Divider,
  HStack,
  Stack,
  Text,
  VStack,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  FormHelperText,
  InputRightElement,
  InputAddon,
  Spinner,
} from "@chakra-ui/react";

import { EbarimtIcon, EditIcon, LocationIcon, NarrowEditIcon } from "@/icons";
import { useEffect, useState } from "react";

import { formatCurrency } from "@/utils/number_formation";
import { UseApi } from "@/hooks/useApi";
import { GetPayment } from "@/services/createOrder/getPayment";
import { PaymentCard } from "./PaymentCard";

import { useDispatch } from "react-redux";

import { setPaymentData } from "@/redux/slices/paymentSlice";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/hooks";
import { UserGpoint } from "@/services/user/userGpoint";
import { SetPoint } from "@/services/createOrder/setPoint";
import { setOrderData } from "@/redux/slices/orderDataSlice";
import { GetCompanyEbarimtName } from "@/services/createOrder/getCompanyEbarimtName";
import { GetUserProfile } from "@/services/user/userProfile";
import { useFormik } from "formik";
import { formatNumber } from "@/utils/formatNumber";
import { SuccessIcon } from "@/icons/SuccessIcon";
import { useCustomToast } from "@/hooks/useCustomToast";

type StepFiveProps = {
  // isDeliverySelected: boolean | null;
};

export const PaymentCheckout = (props: StepFiveProps) => {
  const dispatch = useDispatch();

  const shippingMethod = useAppSelector(
    (state) => state.shippingMethod.shippingMethod
  );
  const orderData = useAppSelector((state) => state.order.orderData);
  const router = useRouter();
  const [isOrganization, setOrganization] = useState(false);
  const [organizationName, setOrganizationName] = useState("");

  const [{ data, isLoading, error }, fetch] = UseApi({
    service: GetPayment,
    useAuth: true,
  });

  const [
    { data: companyName, isLoading: companyLoading, error: companyErr },
    companyFetch,
  ] = UseApi({
    service: GetCompanyEbarimtName,
    useAuth: true,
  });

  const [
    { data: pointData, isLoading: pointLoading, error: pointError },
    pointFetch,
  ] = UseApi({
    service: UserGpoint,
    useAuth: true,
  });

  const [
    { data: usePointData, isLoading: usePointLoading, error: usePointError },
    fetchPoint, // Renamed from usePointFetch to fetchPoint
  ] = UseApi({
    service: SetPoint,
    useAuth: true,
  });

  const [{ data: profileData }, getUserProfile] = UseApi({
    service: GetUserProfile,
    useAuth: true,
  });
  const showToast = useCustomToast();
  const { values, handleChange } = useFormik({
    initialValues: {
      phoneNumber: orderData?.phone || profileData?.phone || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  useEffect(() => {
    pointFetch();
    getUserProfile();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setPaymentData(data));
      router.push(`/payment/pay`);
    }
  }, [data]);

  useEffect(() => {
    if (usePointData) {
      dispatch(setOrderData(usePointData));
    }
  }, [usePointData]);
  useEffect(() => {
    if (companyName) setOrganizationName(companyName?.name ?? "");
  }, [companyName]);
  useEffect(() => {
    if (companyErr) {
      showToast({
        type: "warning",
        title: "Түр хүлээгээрэй",
        description: `${companyErr}`,
      });
    }
  }, [companyErr]);

  useEffect(() => {
    if (usePointData) {
      setOrderData(usePointData);
    }
  }, [usePointData]);

  useEffect(() => {
    if (usePointError) {
      showToast({
        type: "error",
        title: "Алдаа гарлаа.",
        description: "G Point ашиглах боломжгүй байна.",
      });
    }
  }, [usePointError]);

  return (
    <HStack
      gap={6}
      w={{ base: "100%", md: "85%" }}
      flexDir={{ base: "column-reverse", md: "row" }}
      pos="relative"
      alignItems={"flex-start"}
      pb={"80px"}
      sx={{ display: "flex" }}
    >
      <VStack
        gap={6}
        p={"24px"}
        bgColor="white"
        borderRadius={8}
        w={{ base: "90%", md: "70%" }}
        mx={{ base: "auto", md: 0 }}
      >
        <Text fontSize={20} fontWeight={700} w="100%">
          Таны бараанууд
        </Text>
        {orderData?.details?.map((e: any, index: number) => (
          <PaymentCard
            isDelivery={e.isDelivery}
            key={index}
            articleid={e.part.articleno}
            quantity={e.quantity}
            isChecked={e.isChecked}
            onCheck={e.onCheck}
            // total={orderData.alltotal}
            // index={index}
            category={e.part.category}
            articleno={e.part.articleno}
            brandname={e.part.brandname}
            star={null}
            images={
              e.part.partimage
                ? {
                    imgurl200: `${e.part.partimage}`,
                    imgurl400: `${e.part.partimage}`,
                  }
                : { imgurl200: "/product.svg", imgurl400: "/product.svg" }
            }
            reward={false}
            branchparts={{
              partid: e.part.partid,
              branch: e.branch.name,
              organization: e.organization.name,
              price: e.price,
            }}
            carid={""}
          />
        ))}
      </VStack>
      {shippingMethod == "delivery" ? (
        <VStack
          gap={6}
          p="24px"
          bg="white"
          w={{ base: "90%", md: "427px" }}
          borderRadius={8}
          pos={{ base: "relative", md: "sticky" }}
          mx={{ base: "auto", md: 0 }}
          right={0}
          top={0}
          alignSelf="flex-start"
        >
          <Text fontSize={20} fontWeight={700} alignSelf="flex-start">
            Таны захиалга:
          </Text>
          <VStack gap={2} w="full">
            <HStack gap={2} align="center" alignSelf="flex-start" w="full">
              <LocationIcon />
              <VStack gap={2} w="full" align="flex-start">
                <Text
                  fontWeight={700}
                  fontSize={16}
                  w={"300px"}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {orderData?.address ?? ""}
                </Text>
                <Text alignSelf="flex-start" fontSize={14}>
                  {orderData?.deliverytype} цаг
                </Text>
              </VStack>
              {/* <Stack alignSelf="flex-start" justifySelf="flex-end">
                <EditIcon />
              </Stack> */}
            </HStack>
          </VStack>
          <Divider />
          <VStack gap={4} w="full">
            <HStack gap={2} w="full" alignSelf="flex-start">
              <EbarimtIcon />
              <Text fontWeight={700}>И-Баримт</Text>
            </HStack>
            <RadioGroup
              value={isOrganization ? "organization" : "individual"}
              onChange={(value) => {
                setOrganization(value === "organization");
              }}
              w="100%"
            >
              <VStack w="full" alignSelf="flex-start">
                <Radio
                  colorScheme="primary"
                  value="individual"
                  alignSelf="flex-start"
                >
                  <Text fontSize={14} fontWeight={700} color="#1E1E1E">
                    Хувь хүн
                  </Text>
                </Radio>
                <Radio
                  colorScheme="primary"
                  value="organization"
                  alignSelf="flex-start"
                >
                  <Text fontSize={14} fontWeight={700} color="#1E1E1E">
                    Байгууллага
                  </Text>
                </Radio>
              </VStack>
            </RadioGroup>
            {isOrganization && (
              <VStack w="full" align="flex-start" mt={4}>
                <FormControl w="full" isRequired>
                  <FormLabel fontSize={14}>Байгууллагын регистр</FormLabel>
                  <InputGroup>
                    <Input
                      name="organizationName"
                      onChange={(e) => {
                        if (e.target.value.length > 6) {
                          companyFetch({ regnumber: e.target.value });
                        }
                      }}
                      placeholder="Байгууллагын регистр  оруулна уу"
                      focusBorderColor="#F75B00"
                      borderColor="#CFCFCF"
                    />
                    <InputRightElement>
                      {companyLoading ? <Spinner size="sm" /> : null}
                      {companyName ? <SuccessIcon /> : null}
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText>{organizationName}</FormHelperText>
                </FormControl>
              </VStack>
            )}
          </VStack>
          <Divider />
          <HStack justify="space-between" w="full">
            <HStack gap={2}>
              <Checkbox
                onChange={(value) => {
                  if (value.target.checked) {
                    fetchPoint({ orderid: orderData?.orderid, ischeck: 1 }); // Updated function name
                  } else {
                    fetchPoint({ orderid: orderData?.orderid, ischeck: 0 }); // Updated function nameq
                  }
                }}
              />
              <Text fontSize={14} fontWeight={600}>
                Таны G-Point оноо
              </Text>
            </HStack>
            <Text fontSize={16} fontWeight={700} color="#F75B00">
              {`G-${pointData?.point}`}
            </Text>
          </HStack>
          <Divider />
          <VStack w="full">
            <HStack w="full" justify="space-between">
              <Text>Бараа тоо:</Text>
              <Text>{`${orderData?.details.length} ширхэг`}</Text>
            </HStack>
            <HStack w="full" justify="space-between">
              <Text>Хүргэлт:</Text>
              <Text>{`${formatCurrency(orderData?.deliverytotal!)}`}</Text>
            </HStack>
            {orderData?.point && (
              <HStack w="full" justify="space-between">
                <Text>G-Point:</Text>
                <Text>{`-${formatCurrency(Number(orderData?.point!))}`}</Text>
              </HStack>
            )}
          </VStack>
          <Divider variant="dashed" />
          <HStack w="full" justify="space-between" alignItems="flex-start">
            <Text fontSize={16} fontWeight={600}>
              Нийт төлөх үнэ:
            </Text>
            <Text fontSize={24} fontWeight={700}>
              {formatCurrency(orderData?.paidtotal!)}
            </Text>
          </HStack>
          <Button
            isLoading={isLoading}
            onClick={() => {
              // Prepare the data to include organization details if selected

              // Modify your fetch function to accept paymentData
              fetch({ orderid: orderData?.orderid });
            }}
          >
            Төлбөр төлөх
          </Button>
        </VStack>
      ) : (
        <VStack
          p="12px 18px"
          bg="white"
          w={{ base: "90%", md: "427px" }}
          borderRadius={8}
          pos={{ base: "relative", md: "sticky" }}
          mx={{ base: "auto", md: 0 }}
          right={0}
          top={0}
          alignSelf="flex-start"
          gap={6}
        >
          <Text fontSize={20} fontWeight={700} alignSelf="flex-start">
            Таны захиалга:
          </Text>
          <VStack gap={2} w="full">
            <HStack gap={2} align="center" alignSelf="flex-start" w="full">
              <FormControl w="full">
                <FormLabel fontSize={14}>Утасны дугаар</FormLabel>
                <InputGroup>
                  <Input
                    value={values.phoneNumber}
                    name="phoneNumber"
                    variant={"outline"}
                    placeholder="Утасны дугаар"
                    focusBorderColor="#F75B00"
                    borderColor="#CFCFCF"
                    maxLength={8}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
            </HStack>
            {/* <Text
            fontSize={14}
            alignSelf="flex-end"
            sx={{ textDecoration: "underline" }}
          >
            Өмнөх хаягаас сонгох
          </Text> */}
          </VStack>
          <Divider />
          <VStack gap={4} w="full">
            <HStack gap={2} w="full" alignSelf="flex-start">
              <EbarimtIcon />
              <Text fontWeight={700}>И-Баримт</Text>
            </HStack>
            <RadioGroup
              value={isOrganization ? "organization" : "individual"}
              onChange={(value) => {
                setOrganization(value === "organization");
              }}
              w="100%"
            >
              <VStack w="full" alignSelf="flex-start">
                <Radio
                  colorScheme="primary"
                  value="individual"
                  alignSelf="flex-start"
                >
                  <Text fontSize={14} fontWeight={700} color="#1E1E1E">
                    Хувь хүн
                  </Text>
                </Radio>
                <Radio
                  colorScheme="primary"
                  value="organization"
                  alignSelf="flex-start"
                >
                  <Text fontSize={14} fontWeight={700} color="#1E1E1E">
                    Байгууллага
                  </Text>
                </Radio>
              </VStack>
            </RadioGroup>
            {isOrganization && (
              <VStack w="full" align="flex-start" mt={4}>
                <FormControl w="full" isRequired>
                  <FormLabel fontSize={14}>Байгууллагын регистр</FormLabel>
                  <InputGroup>
                    <Input
                      name="organizationName"
                      onChange={(e) => {
                        if (e.target.value.length > 6) {
                          companyFetch({ regnumber: e.target.value });
                        }
                      }}
                      placeholder="Байгууллагын регистр  оруулна уу"
                      focusBorderColor="#F75B00"
                      borderColor="#CFCFCF"
                    />
                    <InputRightElement>
                      {companyLoading ? <Spinner size="sm" /> : null}
                      {companyName ? <SuccessIcon /> : null}
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText>{organizationName}</FormHelperText>
                </FormControl>
              </VStack>
            )}
          </VStack>
          <Divider />
          <HStack justify="space-between" w="full">
            <HStack gap={2}>
              <Checkbox
                onChange={(value) => {
                  if (value.target.checked) {
                    fetchPoint({ orderid: orderData?.orderid, ischeck: 1 }); // Updated function name
                  } else {
                    fetchPoint({ orderid: orderData?.orderid, ischeck: 0 }); // Updated function name
                  }
                }}
              />
              <Text fontSize={14} fontWeight={600}>
                Таны G-Point оноо
              </Text>
            </HStack>
            <Text fontSize={16} fontWeight={700} color="#F75B00">
              {`G-${pointData?.point}`}
            </Text>
          </HStack>
          <Divider />
          <VStack w="full">
            <HStack w="full" justify="space-between">
              <Text>Бараа тоо:</Text>
              <Text>{`${orderData?.details.length} ширхэг`}</Text>
            </HStack>
            {orderData?.point && (
              <HStack w="full" justify="space-between">
                <Text>G-Point:</Text>
                <Text>{`-${formatCurrency(Number(orderData?.point!))}`}</Text>
              </HStack>
            )}
          </VStack>
          <Divider variant="dashed" />
          <HStack w="full" justify="space-between" alignItems="flex-start">
            <Text fontSize={16} fontWeight={600}>
              Нийт төлөх үнэ:
            </Text>
            <Text fontSize={24} fontWeight={700}>
              {formatCurrency(orderData?.paidtotal!)}
            </Text>
          </HStack>
          <Button
            isLoading={isLoading}
            disabled={!values.phoneNumber}
            onClick={() => {
              // Prepare the data to include organization details if selected

              // Modify your fetch function to accept paymentData
              fetch({ orderid: orderData?.orderid });
            }}
          >
            Төлбөр төлөх
          </Button>
        </VStack>
      )}
    </HStack>
  );
};
