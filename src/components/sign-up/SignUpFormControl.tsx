"use client";
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  FormHelperText,
  Text,
  HStack,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { MailIcon, OpenEyeIcon, EyeClosedIcon, ErrorIcon } from "@/icons";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

interface FormValues {
  email: string;
  password: string;
  rePassword: string;
  refferalcode: string;
}

type SignUpFormControlProps = {
  isLogIn: number;
  setLogin: (value: number) => void;
  onClose: () => void;
};

export const SignUpFormControl = ({
  isLogIn,
  setLogin,
  onClose,
}: SignUpFormControlProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const validationSchema = React.useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .email("Имэйл хаягаа зөв оруулна уу!")
        .required("Имэйл хаягаа заавал оруулна уу!"),
      password:
        isLogIn === 1 || isLogIn === 2
          ? Yup.string()
              .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгттэй байна")
              .required("Нууц үгээ заавал оруулна уу!")
          : Yup.string().notRequired(),
      rePassword:
        isLogIn === 2
          ? Yup.string()
              .required("Нууц үгээ давтан оруулна уу!")
              .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна")
          : Yup.string().notRequired(),
    });
  }, [isLogIn]);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      refferalcode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        if (isLogIn === 1) {
          // Sign-In
          const result = await signIn("signIn", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          if (result?.error) throw new Error(result.error);
        } else if (isLogIn === 2) {
          const result = await signIn("signUp", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          if (result?.error) throw new Error(result.error);
          // Sign-Up logic (you can implement your own API call here)
        } else if (isLogIn === 3) {
          // Password Reset
          await sendPasswordResetEmail(auth, values.email);
          toast({
            title: "Нууц үг сэргээх холбоос илгээлээ!",
            description:
              "Таны имэйл хаягруу нууц үг сэргээх холбоос илгээгдлээ.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onClose?.();
        }
        toast({
          title: "Success!",
          description: "Redirecting...",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose?.();
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <VStack width="100%" gap={4}>
      <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
        {/* Email Input */}
        <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
          <FormLabel fontSize={14} fontWeight={600}>
            Имэйл хаяг
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MailIcon />
            </InputLeftElement>
            <Input
              name="email"
              value={formik.values.email}
              placeholder="И-мэйл хаяг"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              pl={8}
            />
          </InputGroup>
          {formik.touched.email && formik.errors.email && (
            <FormHelperText color="#D72C0D">
              {formik.errors.email}
            </FormHelperText>
          )}
        </FormControl>

        {/* Password Input */}
        {(isLogIn === 1 || isLogIn === 2) && (
          <FormControl
            isInvalid={formik.touched.password && !!formik.errors.password}
            mt={2}
          >
            <FormLabel fontSize={14} fontWeight={600}>
              Нууц үг
            </FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                placeholder="Нууц үг"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <InputRightElement onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeClosedIcon /> : <OpenEyeIcon />}
              </InputRightElement>
            </InputGroup>
            {formik.touched.password && formik.errors.password && (
              <FormHelperText color="#D72C0D">
                {formik.errors.password}
              </FormHelperText>
            )}
            {isLogIn === 1 && (
              <Stack w="full" align="flex-end" mt={2}>
                <Text
                  fontSize={14}
                  color={"#344054"}
                  textDecoration="underline"
                  cursor={"pointer"}
                  onClick={() => {
                    // formik.resetForm();
                    setLogin(3);
                  }}
                >
                  Нууц үг мартсан?
                </Text>
              </Stack>
            )}
          </FormControl>
        )}

        {/* Confirm Password Input for Sign-Up */}
        {isLogIn === 2 && (
          <FormControl
            isInvalid={formik.touched.rePassword && !!formik.errors.rePassword}
            mt={2}
          >
            <FormLabel fontSize={14} fontWeight={600}>
              Нууц үг давтах
            </FormLabel>
            <InputGroup>
              <Input
                name="rePassword"
                type={showRePass ? "text" : "password"}
                value={formik.values.rePassword}
                placeholder="Нууц үг давтах"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <InputRightElement onClick={() => setShowRePass(!showRePass)}>
                {showRePass ? <EyeClosedIcon /> : <OpenEyeIcon />}
              </InputRightElement>
            </InputGroup>
            {formik.touched.rePassword && formik.errors.rePassword && (
              <FormHelperText color="#D72C0D">
                {formik.errors.rePassword}
              </FormHelperText>
            )}
          </FormControl>
        )}

        {/* Submit Button */}
        <HStack mt={4}>
          {isLogIn === 3 && (
            <Button
              variant={"outline"}
              onClick={() => {
                onClose();
              }}
            >
              Хаах
            </Button>
          )}
          <Button
            variant={"solid"}
            type="submit"
            isLoading={isLoading}
            width="full"
            colorScheme="teal"
          >
            {isLogIn === 1
              ? "Нэвтрэх"
              : isLogIn === 2
                ? "Бүртгүүлэх"
                : "Илгээх"}
          </Button>
        </HStack>
      </form>
      {isLogIn !== 3 && (
        <HStack justify={"center"} w="full" mt={4}>
          <Text fontSize={14}>
            {isLogIn === 1 ? "Бүртгэлгүй хэрэглэгч?" : "Бүртгэлтэй хэрэглэгч"}
          </Text>
          <Text
            fontSize={14}
            fontWeight={700}
            onClick={() => {
              setLogin(isLogIn === 1 ? 2 : 1);
              formik.resetForm();
            }}
            cursor={"pointer"}
          >
            {isLogIn === 1 ? "Бүртгүүлэх" : "Нэвтрэх"}
          </Text>
        </HStack>
      )}
    </VStack>
  );
};
