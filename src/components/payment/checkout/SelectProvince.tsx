"use client";
import { UseApi } from "@/hooks/useApi";
import { GetBusTerminal } from "@/services/createOrder/getBusTerminal";
import {
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Formik, Field, Form } from "formik";

import { RegisterOrderAddress } from "@/services/createOrder/registerOrderAddress";
import { setOrderData } from "@/redux/slices/orderDataSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import { OrderData } from "../../../../types/orderReponse";
import { useCustomToast } from "@/hooks/useCustomToast";
type StepThreeProps = {
  isUb: boolean;
  orderData: OrderData | null;
};

const mongolianProvinces = [
  { id: 24, name: "Хэнтий", sort: 1 },
  { id: 23, name: "Хөвсгөл", sort: 1 },
  { id: 22, name: "Ховд", sort: 1 },
  { id: 1, name: "Улаанбаатар", sort: 1 },
  { id: 14, name: "Дундговь", sort: 2 },
  { id: 21, name: "Увс", sort: 2 },
  { id: 20, name: "Төв аймаг", sort: 2 },
  { id: 19, name: "Сэлэнгэ", sort: 2 },
  { id: 18, name: "Сүхбаатар", sort: 2 },
  { id: 17, name: "Өмнөговь", sort: 2 },
  { id: 16, name: "Өвөрхангай", sort: 2 },
  { id: 15, name: "Завхан", sort: 2 },
  { id: 13, name: "Дорнод", sort: 2 },
  { id: 12, name: "Дорноговь", sort: 2 },
  { id: 11, name: "Говьсүмбэр", sort: 2 },
  { id: 10, name: "Говь-Алтай", sort: 2 },
  { id: 9, name: "Булган", sort: 2 },
  { id: 8, name: "Баянхонгор", sort: 2 },
  { id: 7, name: "Баян-Өлгий", sort: 2 },
  { id: 6, name: "Архангай", sort: 2 },
  { id: 5, name: "Орхон", sort: 2 },
  { id: 4, name: "Дархан-Уул", sort: 2 },
];

export const SelectProvince = (props: StepThreeProps) => {
  const { isUb, orderData } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [{ data }, fetch] = UseApi({
    service: GetBusTerminal,
    useAuth: true,
  });

  useEffect(() => {
    if (!isUb) fetch();
  }, [isUb]);
  const showToast = useCustomToast();
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

  useEffect(() => {
    if (registerOrderdata) {
      dispatch(setOrderData(registerOrderdata));
      showToast({
        type: "success",
        title: "Амжилттай",
        description: "Таны хаяг амжилттай бүртгэгдлээ",
      });
      router.push(`/payment/checkout`);
    }
  }, [registerOrderdata]);
  useEffect(() => {
    if (registerError != null)
      showToast({
        type: "warning",
        title: "Түр хүлээгээрэй",
        description: `${registerError}`,
      });
  }, [registerError]);
  return (
    <Formik
      initialValues={{
        busStation: data?.[0]?.name || "",
        province: mongolianProvinces[0].name,
        busTime: "",
        phoneNumber: "",
        additionalInfo: "",
      }}
      onSubmit={(values) => {
        // Find terminal based on selected bus station
        const terminal = data?.find(
          (item: any) => item.name === values.busStation
        );

        // Check if terminal exists
        if (!terminal || !values.phoneNumber) {
          // Debugging: If terminal is undefined
          showToast({
            type: "warning",
            description: "Та мэдээллээ бүрэн оруулна уу.",
            title: "Анхааруулга",
          });
          return; // Prevent form submission if terminal is undefined
        }

        // Prepare form data
        const form = new FormData();
        if (orderData?.orderid !== undefined) {
          form.append("orderid", orderData.orderid.toString());
        }
        form.append("phone", values.phoneNumber);
        form.append("additional", values.additionalInfo);
        form.append("zipcode", terminal.zipcode || ""); // Add default value if undefined
        form.append("lang", terminal.lang?.toString() || ""); // Add default value if undefined
        form.append("long", terminal.long?.toString() || ""); // Add default value if undefined
        form.append("country", "countryside");
        form.append("address", terminal.name || ""); // Add default value if undefined
        form.append("deliverytypeid", "1");
        form.append("terminalid", terminal.terminalid?.toString() || "");

        // Submit the form data

        registerFetch({ body: form });
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack
            borderRadius={8}
            p={{ base: 0, md: "24px 32px" }}
            bg={{ base: "transparent", md: "white" }}
            w={{ base: "100%", md: "856px" }}
            justifySelf="center"
            gap={4}
            sx={{ display: isUb ? "none" : "flex", flexDirection: "column" }}
            mt={{ base: 0, md: 4 }}
          >
            <HStack gap={4} w="full" flexDir={{ base: "column", md: "row" }}>
              <FormControl w="full">
                <FormLabel fontSize={14} fontWeight={600}>
                  Автобус вокзал сонгох
                </FormLabel>
                <InputGroup>
                  <Field as="select" name="busStation">
                    {({ field }: any) => (
                      <Select
                        {...field}
                        bg="white"
                        borderRadius="8px"
                        sx={{
                          option: {
                            padding: "10px 18px",
                          },
                          color: "#717171",
                        }}
                      >
                        {data?.map((item: any, index: number) => (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Field>
                </InputGroup>
              </FormControl>
              <FormControl w="full">
                <FormLabel fontSize={14} fontWeight={600}>
                  Аймаг сонгох
                </FormLabel>
                <InputGroup>
                  <Field as="select" name="province">
                    {({ field }: any) => (
                      <Select
                        {...field}
                        bg="white"
                        borderRadius="8px"
                        sx={{
                          option: {
                            padding: "10px 18px",
                          },
                          color: "#717171",
                        }}
                      >
                        {mongolianProvinces?.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Field>
                </InputGroup>
              </FormControl>
            </HStack>

            <HStack gap={4} w="full" flexDir={{ base: "column", md: "row" }}>
              <FormControl w="full">
                <FormLabel fontSize={14} fontWeight={600}>
                  Автобус хөдлөх цагийг оруулна уу (10:00, 12:00)
                </FormLabel>
                <InputGroup>
                  <Field name="busTime">
                    {({ field }: any) => (
                      <Input {...field} placeholder="10:00" />
                    )}
                  </Field>
                </InputGroup>
              </FormControl>
              <FormControl w="full">
                <FormLabel fontSize={14} fontWeight={600}>
                  Утасны дугаар
                </FormLabel>
                <InputGroup>
                  <Field name="phoneNumber">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Утасны дугаар" />
                    )}
                  </Field>
                </InputGroup>
              </FormControl>
            </HStack>

            <FormControl w="full">
              <FormLabel fontSize={14} fontWeight={600}>
                Нэмэлт мэдээлэл
              </FormLabel>
              <InputGroup>
                <Field name="additionalInfo">
                  {({ field }: any) => (
                    <Textarea
                      {...field}
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
                    />
                  )}
                </Field>
              </InputGroup>
            </FormControl>

            <Button
              isLoading={registerIsLoading}
              type="submit"
              w="100%"
              alignSelf="flex-start"
              // disabled={}
            >
              Үргэлжлүүлэх
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
