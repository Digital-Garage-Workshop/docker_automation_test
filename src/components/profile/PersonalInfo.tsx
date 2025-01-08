"use client";
import { useState, useEffect } from "react";
import {
  Button,
  HStack,
  Text,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { UseApi } from "@/hooks/useApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EbarimtIcon, NarrowEditIcon } from "@/icons";
import { GetUserProfile } from "@/services/user/userProfile";
import { ProfileUpdate } from "@/services/user/profileUpdate";
import { UpdateUserEbarimt } from "@/services/user/updateUserEbarimt";
import { GetCompanyNameByRe } from "@/services/user/getCompanyNameByRe";
import { GetEbarimtData } from "@/services/user/getEbarimtData";
import { useCustomToast } from "@/hooks/useCustomToast";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import { useDispatch } from "react-redux";

export const PersonalInfo = (props: { clicked: string }) => {
  const { clicked } = props;
  const dispatch = useDispatch();
  const showToast = useCustomToast();
  const [{ data: profileData }, getUserProfile] = UseApi({
    service: GetUserProfile,
    useAuth: true,
  });

  const [
    { data: ebarimtData, isLoading: ebarimtLoader, error: ebarimtError },
    getEbarimtData,
  ] = UseApi({
    service: GetEbarimtData,
    useAuth: true,
  });

  const [
    {
      data: updatedProfileData,
      error: updatedProfileError,
      isLoading: updatedProfileLoader,
    },
    postProfile,
  ] = UseApi({
    service: ProfileUpdate,
    useAuth: true,
  });

  const [
    {
      data: ebarimtPostData,
      isLoading: ebarimtPostLoader,
      error: ebarimtPostError,
    },
    fetchEbarimt,
  ] = UseApi({
    service: UpdateUserEbarimt,
    useAuth: true,
  });

  const [
    { data: companyData, isLoading: companyLoader, error: companyError },
    getCompanyName,
  ] = UseApi({
    service: GetCompanyNameByRe,
    useAuth: true,
  });

  useEffect(() => {
    if (clicked === "Хэрэглэгчийн тохиргоо") {
      getUserProfile();
      getEbarimtData();
    }
  }, [clicked]);

  useEffect(() => {
    ebarimtData?.map((item: any) => {
      if (item.type === "personal") {
        setFieldValue("ebarimtCode", item.enumber);
        setFieldValue("ebarimtEmail", item.email);
      } else {
        setFieldValue("organizationRegisterNumber", item.enumber);
        setFieldValue("organizationName", item.companyname);
      }
    });
  }, [ebarimtData]);

  const {
    errors,
    values,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      lastName: profileData?.lastname || "",
      name: profileData?.name || "",
      phoneNumber: profileData?.phone || "",
      email: profileData?.email || "",
      birthOfDate: profileData?.birthdate || "",
      gender: profileData?.gender === "male" ? "Эрэгтэй" : "Эмэгтэй",
      ebarimtCode: profileData?.ebarimt || "",
      ebarimtEmail: profileData?.ebarimtEmail || "",
      organizationRegisterNumber: profileData?.organizationRegisterNumber || "",
      organizationName: profileData?.organizationName || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      lastName: Yup.string().required("Овог шаардлагатай"),
      name: Yup.string().required("Нэр шаардлагатай"),
      phoneNumber: Yup.string().required("Утасны дугаар шаардлагатай"),
      email: Yup.string()
        .email("Буруу имэйл хаяг")
        .required("Имэйл шаардлагатай"),
      birthOfDate: Yup.string(),
    }),
    onSubmit: (values) => {
      postProfile({
        lastname: values.lastName,
        name: values.name,
        phone: values.phoneNumber,
        gender: values.gender === "Эрэгтэй" ? "male" : "female",
        birthdate: values.birthOfDate,
      });
      if (values.organizationName && values.organizationRegisterNumber) {
        fetchEbarimt({
          type: "corporate",
          enumber: values.organizationRegisterNumber,
          companyname: values.organizationName,
        });
      }
      if (values.ebarimtCode && values.ebarimtEmail) {
        fetchEbarimt({
          type: "personal",
          enumber: values.ebarimtCode,
          email: values.ebarimtEmail,
        });
      }
    },
  });

  useEffect(() => {
    if (updatedProfileData) {
      showToast({
        type: "success",
        title: "Амжилттай",
        description: "Таны мэдээлэл амжилттай шинэчлэгдлээ",
      });
    }
  }, [updatedProfileData]);

  useEffect(() => {
    if (updatedProfileError) {
      showToast({
        type: "error",
        title: "Алдаа гарлаа",
        description: "Та дахин оролдоно уу",
      });
    }
  }, [updatedProfileError]);

  useEffect(() => {
    if (values.organizationRegisterNumber?.length === 7) {
      getCompanyName({
        regnumber: parseInt(values.organizationRegisterNumber),
      });
    }
  }, [values.organizationRegisterNumber]);

  useEffect(() => {
    setFieldValue("organizationName", companyData?.name);
  }, [companyData]);

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
      display={clicked === "Хэрэглэгчийн тохиргоо" ? "flex" : "none"}
      pos="relative"
      pb={12}
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
        <Text fontWeight={600}>Хувийн мэдээлэл</Text>
      </HStack>
      <HStack w="full" justify="space-between">
        <VStack gap={1} align="flex-start">
          <Text fontSize={20} fontWeight={700}>
            Хувийн мэдээлэл
          </Text>
          <Text fontSize={12}>
            Та хувийн мэдээллээ оруулснаар захиалга хийхэд хялбар болно.
          </Text>
        </VStack>
        <Button
          variant="outline"
          fontSize={14}
          fontWeight={600}
          p="8px 14px"
          w="106px"
          onClick={() => handleSubmit()}
          isLoading={updatedProfileLoader}
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "flex",
            xl: "flex",
          }}
        >
          Хадгалах
        </Button>
      </HStack>

      <VStack gap={4} w="full">
        {/* First Name and Name */}
        <Stack
          gap={6}
          w="full"
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          }}
        >
          <FormControl w="full">
            <FormLabel fontSize={14}>Овог</FormLabel>
            <InputGroup>
              <Input
                name="lastName"
                variant="outline"
                placeholder="Овог"
                focusBorderColor="#F75B00"
                borderColor="#CFCFCF"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputRightElement>
                <NarrowEditIcon color="#1E1E1E" />
              </InputRightElement>
            </InputGroup>
            {touched.lastName && errors.lastName && (
              <Text fontSize={12} color="red.500">
                {errors.lastName.toString()}
              </Text>
            )}
          </FormControl>

          <FormControl w="full">
            <FormLabel fontSize={14}>Нэр</FormLabel>
            <InputGroup>
              <Input
                name="name"
                variant="outline"
                placeholder="Нэр"
                focusBorderColor="#F75B00"
                borderColor="#CFCFCF"
                value={values.name || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputRightElement>
                <NarrowEditIcon color="#1E1E1E" />
              </InputRightElement>
            </InputGroup>
            {touched.name && errors.name && (
              <Text fontSize={12} color="red.500">
                {errors.name.toString()}
              </Text>
            )}
          </FormControl>
        </Stack>

        {/* Phone Number and Email */}
        <Stack
          gap={6}
          w="full"
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          }}
        >
          <FormControl w="full">
            <FormLabel fontSize={14}>Утасны дугаар</FormLabel>
            <InputGroup>
              <Input
                name="phoneNumber"
                variant="outline"
                placeholder="Утасны дугаар"
                focusBorderColor="#F75B00"
                borderColor="#CFCFCF"
                value={values.phoneNumber || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={8}
              />
              <InputRightElement>
                <NarrowEditIcon color="#1E1E1E" />
              </InputRightElement>
            </InputGroup>
            {touched.phoneNumber && errors.phoneNumber && (
              <Text fontSize={12} color="red.500">
                {errors.phoneNumber.toString()}
              </Text>
            )}
          </FormControl>

          <FormControl w="full">
            <FormLabel fontSize={14}>Имэйл хаяг</FormLabel>
            <InputGroup>
              <Input
                name="email"
                variant="outline"
                placeholder="Имэйл хаяг"
                focusBorderColor="#F75B00"
                borderColor="#CFCFCF"
                value={values.email || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputRightElement>
                <NarrowEditIcon color="#1E1E1E" />
              </InputRightElement>
            </InputGroup>
            {touched.email && errors.email && (
              <Text fontSize={12} color="red.500">
                {errors.email.toString()}
              </Text>
            )}
          </FormControl>
        </Stack>

        {/* Birth Date and Gender */}
        <Stack
          gap={6}
          w="full"
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          }}
        >
          <FormControl w="full">
            <FormLabel fontSize={14}>Төрсөн өдөр</FormLabel>
            <InputGroup>
              <Input
                name="birthOfDate"
                variant="outline"
                placeholder="Төрсөн өдөр"
                focusBorderColor="#F75B00"
                borderColor="#CFCFCF"
                value={values.birthOfDate || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                type="date"
              />
              <InputRightElement>
                <NarrowEditIcon color="#1E1E1E" />
              </InputRightElement>
            </InputGroup>
            {touched.birthOfDate && errors.birthOfDate && (
              <Text fontSize={12} color="red.500">
                {errors.birthOfDate.toString()}
              </Text>
            )}
          </FormControl>

          <FormControl w="full">
            <FormLabel fontSize={14}>Хүйс</FormLabel>
            <Select
              name="gender"
              value={values.gender}
              onChange={handleChange}
              focusBorderColor="#F75B00"
            >
              <option value="Эрэгтэй">Эрэгтэй</option>
              <option value="Эмэгтэй">Эмэгтэй</option>
            </Select>
          </FormControl>
        </Stack>
      </VStack>

      {/* Ebarimt Information */}
      <VStack gap={6} w="full">
        <Stack
          w="full"
          justify="space-between"
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          }}
        >
          <HStack gap={2}>
            <EbarimtIcon />
            <Text fontSize={20} fontWeight={700}>
              И-Баримт
            </Text>
          </HStack>
        </Stack>
        <Stack
          gap={4}
          w="full"
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          }}
        >
          <VStack gap={6} w="full">
            <Text fontSize={18} fontWeight={600} alignSelf="flex-start">
              Хувь хүн (Заавал биш)
            </Text>
            <FormControl w="full">
              <FormLabel fontSize={14}>Хэрэглэгчийн код </FormLabel>
              <InputGroup>
                <Input
                  name="ebarimtCode"
                  variant="outline"
                  placeholder="Иргэний 8 оронтой код"
                  focusBorderColor="#F75B00"
                  borderColor="#CFCFCF"
                  value={values.ebarimtCode || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={8}
                />
                <InputRightElement>
                  <NarrowEditIcon color="#1E1E1E" />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl w="full">
              <FormLabel fontSize={14}>Имэйл оруулах</FormLabel>
              <InputGroup>
                <Input
                  name="ebarimtEmail"
                  variant="outline"
                  placeholder="Имэйл оруулах"
                  focusBorderColor="#F75B00"
                  borderColor="#CFCFCF"
                  value={values.ebarimtEmail || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputRightElement>
                  <NarrowEditIcon color="#1E1E1E" />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </VStack>
          <Divider variant="dashed" orientation="vertical" />
          <VStack gap={6} w="full">
            <Text fontSize={18} fontWeight={600} alignSelf="flex-start">
              Байгууллага (Заавал биш)
            </Text>
            <FormControl w="full">
              <FormLabel fontSize={14}>
                Байгууллагын регистрийн дугаар
              </FormLabel>
              <InputGroup>
                <Input
                  name="organizationRegisterNumber"
                  variant="outline"
                  placeholder="Регистрийн дугаар"
                  focusBorderColor="#F75B00"
                  borderColor="#CFCFCF"
                  value={values.organizationRegisterNumber || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={7}
                />
                <InputRightElement>
                  <NarrowEditIcon color="#1E1E1E" />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl w="full">
              <FormLabel fontSize={14}>Байгууллагын нэр</FormLabel>
              <InputGroup>
                <Input
                  name="organizationName"
                  variant="outline"
                  placeholder="Байгууллагын нэр"
                  focusBorderColor="#F75B00"
                  borderColor="#CFCFCF"
                  value={values.organizationName || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputRightElement>
                  <NarrowEditIcon color="#1E1E1E" />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </VStack>
        </Stack>
      </VStack>

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
          onClick={() => handleSubmit()}
        >
          Хадгалах
        </Button>
      </Stack>
    </VStack>
  );
};
