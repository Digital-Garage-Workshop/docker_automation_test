"use client";
import { AppIcon } from "@/icons/AppIcon";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const AppInstaller = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const downloadAppLink = document.getElementById("downloadAppLink");

  const handleRouteChangeError = (err: any, url: any) => {
    if (err.cancelled) {
      console.log(`Route to ${url} was cancelled!`);
    }
  };

  const jumpIntoApp = () => {
    router.push("https://links.garage.mn/home");
  };

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        onOpen();
      }, 1000);
    }
  }, [isMobile]);

  if (!isMobile) return null;

  const MotionModalContent = motion(ModalContent as any);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <MotionModalContent
        m={4}
        p={4}
        border="2px solid var(--Gray-300, #D0D5DD)"
        w="100vw"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack gap={8}>
          <VStack gap={2}>
            <HStack>
              <Text fontSize={18} fontWeight={700}>
                Та Апп -аа татаарай
              </Text>
              <ModalCloseButton />
            </HStack>
            <Text fontSize={14}>Та апп-аа татаад илүү хялбар ашиглаарай.</Text>
          </VStack>
          <AppIcon />
          <Button onClick={jumpIntoApp}>Апп нээх</Button>
        </VStack>
      </MotionModalContent>
    </Modal>
  );
};
