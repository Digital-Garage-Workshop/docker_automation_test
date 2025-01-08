import {UseApi} from "@/hooks/useApi";
import {RightArrow} from "@/icons";
import {UserAddress} from "@/services/user/userAddress";
import {
  Button,
  Divider,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import {useEffect} from "react";

type SavedLocationsModalProp = {
  isOpen: boolean;
  onClose: () => void;
};

export const SavedLocationsModal = (props: SavedLocationsModalProp) => {
  const {isOpen, onClose} = props;
  const [
    {
      data: userAddressModalData,
      isLoading: userAddressModalLoader,
      error: userAddressModalError,
    },
    userAddressModalfetch,
  ] = UseApi({
    service: UserAddress,
  });

  useEffect(() => {
    userAddressModalfetch;
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={850} p={6}>
        <VStack w="full" gap={8}>
          <HStack w="full" justify={"space-between"}>
            <VStack gap={0}>
              <Text fontSize={20} fontWeight={700}>
                Хүргэлтийн хаяг сонгох
              </Text>
              <Text fontSize={12}>
                Та хүргэлтийн хаягаа оруулснаар захиалга хийхдээ тухайн хаягийг
                хялбар ашиглах боломжтой
              </Text>
            </VStack>
            <ModalCloseButton />
          </HStack>
          <Divider />
          <VStack gap={6} w="full">
            {userAddressModalData?.map((item: any, index: number) => {
              return (
                <VStack gap={6}>
                  <HStack
                    w={"full"}
                    justify="space-between"
                    borderLeft="1px solid #F75B00"
                  >
                    <VStack gap={0}>
                      <Text>{item.address}</Text>
                      <Text>{item.phone}</Text>
                    </VStack>
                    <Button
                      maxW="134px"
                      rightIcon={<RightArrow color="white" />}
                    >
                      Сонгох
                    </Button>
                  </HStack>
                  {index === userAddressModalData.length - 1 && (
                    <Divider variant="dashed" />
                  )}
                </VStack>
              );
            })}
          </VStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
