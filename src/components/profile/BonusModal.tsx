import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

type BonusModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const BonusModal = (props: BonusModalProps) => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent gap={6} m={4}>
        <ModalHeader pb={0}>
          <Text fontWeight={700} fontSize={20}>
            Сугалаа авах
          </Text>
          <ModalCloseButton />
        </ModalHeader>
        <Divider />
        <ModalBody w="full" p={0}>
          <Stack w={250} h={250} pos="relative" justifySelf="center">
            <Image src="/Profile-Bonus/image.svg" alt="" fill />
          </Stack>
          <Text textAlign="center" w="full">
            Та 100’000₮ дээш худалдан авалт болгонд 1 сугалаа авах эрх авах
            боломжтой.
          </Text>
        </ModalBody>
        <Divider variant="dashed" />
        <ModalFooter>
          <Button>Худалдан авалт хийх</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
