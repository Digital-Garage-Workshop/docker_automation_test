import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  HStack,
  Box,
  Divider,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { UseApi } from "@/hooks/useApi";
import { UserAddress } from "@/services/user/userAddress";
import { setMarkerPosition, setZipcode } from "@/redux/slices/googleMapsSlice";
import { useDispatch } from "react-redux";
import { RightArrow } from "@/icons";
import Image from "next/image";

interface Address {
  addressid: number;
  phone: number;
  zipcode: number;
  deliverytype: string | null;
  address: string;
  lang: string;
  long: string;
  additional: string;
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect: (address: Address) => void; // New prop
}

const BeforeLocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onAddressSelect,
}) => {
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: UserAddress,
    useAuth: true,
  });

  useEffect(() => {
    if (isOpen) fetch();
  }, [isOpen]);

  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={488} p={6}>
        <ModalHeader p={0} fontSize={20} fontWeight={700}>
          Хүргэлтийн хаяг сонгох
        </ModalHeader>
        <ModalCloseButton />
        <Divider my={6} />
        <ModalBody p={0} w="full">
          <VStack justifyContent={"start"} spacing={4} w="full">
            {isLoading ? (
              <Skeleton
                width="full"
                height={14}
                startColor="#E4E7EC"
                endColor="#E4E7EC"
              />
            ) : data?.length > 0 ? (
              data?.map((location: Address, index: number) => (
                <VStack
                  w="full"
                  justifyContent={"start"}
                  key={index}
                  align="start"
                  spacing={1}
                >
                  <HStack
                    w="full"
                    justifyContent={"space-between"}
                    borderLeft="1px solid #F75B00"
                    pl={4}
                  >
                    <HStack>
                      <VStack align="start" spacing={1}>
                        <Text fontSize={14} fontWeight={700}>
                          {location.address}
                        </Text>
                        <Text fontSize={14}>
                          {location.zipcode} | {location.additional}
                        </Text>
                      </VStack>
                    </HStack>
                    <Stack>
                      <Button
                        onClick={() => {
                          dispatch(
                            setMarkerPosition({
                              lat: Number(location.lang),
                              lng: Number(location.long),
                            })
                          );
                          dispatch(setZipcode(String(location.zipcode)));
                          onAddressSelect(location);
                          onClose();
                        }}
                        p={2}
                        w={9}
                        h={9}
                      >
                        <RightArrow color="white" />
                      </Button>
                    </Stack>
                  </HStack>
                  <Box h={2} />
                  <Divider />
                </VStack>
              ))
            ) : (
              <Box>
                <Image
                  alt="garage.mn"
                  src="/svgs/empty.svg"
                  width={263}
                  height={217}
                />
                <Text
                  fontWeight={600}
                  color="#344054"
                  textAlign="center"
                  maxW={260}
                  mt={2}
                >
                  Өмнө нь бүртгэсэн хүргэлтийн хаяг байхгүй байна.
                </Text>
              </Box>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BeforeLocationModal;
