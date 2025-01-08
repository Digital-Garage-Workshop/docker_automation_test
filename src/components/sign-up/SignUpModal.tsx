"use client";
import {
  Stack,
  VStack,
  Text,
  HStack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Button,
  ModalFooter,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { SignUpFormControl } from "./SignUpFormControl";
import { SignUpWithSocials } from "./SignUpWithSocials";
import { useRouter } from "next/navigation";

type CarModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SignUpModal = (props: CarModalProps) => {
  const { isOpen, onClose } = props;
  const [isLogin, setLogin] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setLogin(1);
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setLogin(1);
      }}
      scrollBehavior="outside"
      allowPinchZoom={true}
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent
        p="32px"
        maxW={"500px"}
        top={isLogin === 2 ? "20px" : "80px"}
        overflow={"auto"}
        mb={20}
        mt={10}
        border={8}
        mx={{ base: 4, md: 0 }}
      >
        <ModalHeader
          alignSelf="center"
          textAlign="center"
          maxWidth="100%"
          gap={0}
          m={0}
          mt={-6}
        >
          <VStack gap={"10px"} w="full">
            <Text fontSize={24} fontWeight={700}>
              {isLogin === 1
                ? "Нэвтрэх"
                : isLogin === 2
                  ? "Бүртгүүлэх"
                  : "Нууц үг мартсан"}
            </Text>
            {isLogin === 3 ? (
              <Text fontSize={14} fontWeight={400}>
                Таны бүртгэлтэй и-мэйл хаягаар нууц үг сэргээх баталгаажуулах
                кодыг илгээх болно.
              </Text>
            ) : (
              <Text fontSize={14} fontWeight={400} w="full" mt={-2}>
                И-мэйл хаяг оруулан үргэлжлүүлэх товчийг дарж Garage.mn
                вебсайтад нэвтэрснээр Таныг тус вебсайтын{" "}
                <span
                  onClick={() => {
                    router.push("/terms-and-condition");
                    onClose();
                  }}
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  Үйлчилгээний нөхцөл{" "}
                </span>{" "}
                болон{" "}
                <span
                  onClick={() => {
                    router.push("/privacy-and-policy");
                    onClose();
                  }}
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  Нууцлалын бодлогыг{" "}
                </span>{" "}
                хүлээн зөвшөөрсөнд тооцно.
              </Text>
            )}
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0} gap={6}>
          <SignUpWithSocials isLogIn={isLogin} />
          <HStack
            width={"100%"}
            my="24px"
            sx={{ display: isLogin === 3 ? "none" : "flex" }}
          >
            <Divider orientation="horizontal" color={"#CFCFCF"} />
            <Text px={2} color={"#717171"} fontSize={"xs"} fontWeight={500}>
              ЭСВЭЛ
            </Text>
            <Divider />
          </HStack>
          <SignUpFormControl
            isLogIn={isLogin}
            setLogin={setLogin}
            onClose={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
