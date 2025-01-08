import { setClickedSideBar } from "@/redux/slices/profileSlice";
import {
  Button,
  Divider,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useDispatch } from "react-redux";

type AreYouSureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonString: string;
  action: (value: any) => void;
  setToDefault?: boolean;
};

export const AreYouSureModal = (props: AreYouSureModalProps) => {
  const {
    isOpen,
    onClose,
    title,
    description,
    buttonString,
    action,
    setToDefault,
  } = props;
  const dispatch = useDispatch();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay opacity={0.3} />
      <ModalContent
        maxW={592}
        p={6}
        gap={6}
        // mt={{ base: "85%", sm: "85%", md: "85%", lg: "250px", xl: "250px" }}
        mx={{ base: 4, sm: 4, md: 4, lg: 0, xl: 0 }}
      >
        {/* <Stack
          pos="relative"
          w={300}
          height={300}
          alignSelf={"center"}
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "flex",
            xl: "flex",
          }}
        >
          <Image src="/profile/deleteIllustration.png" alt="garage.mn" fill />
        </Stack> */}
        {/* <ModalCloseButton
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "flex",
            xl: "flex",
          }}
        /> */}
        <VStack gap={4} w="full">
          <Text fontSize={20} fontWeight={700} textAlign={"center"}>
            {title}
          </Text>
          <Text
            fontSize={12}
            textAlign={"center"}
            display={description ? "flex" : "none"}
          >
            {description}
          </Text>
        </VStack>
        <Divider />
        <HStack w="full">
          <Button
            variant={"outline"}
            onClick={() => {
              onClose();
              // if (setToDefault) {
              //   dispatch(
              //     setClickedSideBar({ clickedSideBar: "Хэрэглэгчийн тохиргоо" })
              //   );
              // }
            }}
          >
            Буцах
          </Button>
          <Button onClick={action}>{buttonString}</Button>
        </HStack>
      </ModalContent>
    </Modal>
  );
};
