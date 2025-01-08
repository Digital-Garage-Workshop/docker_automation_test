"use client";
import {
  NarrowEditIcon,
  OrangePlusIcon,
  PlusIcon,
  TrashbinIcon,
} from "@/icons";
import {
  VStack,
  HStack,
  Text,
  Button,
  useDisclosure,
  Skeleton,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { AddUserLocation } from "./AddUserLocation";
import { UseApi } from "@/hooks/useApi";
import { UserAddress } from "@/services/user/userAddress";
import { useEffect, useState } from "react";
import { DeleteUserAddress } from "@/services/user/deleteUserAddress";
import { AreYouSureModal } from "./AreYouSureModal";
import { useCustomToast } from "@/hooks/useCustomToast";
import Image from "next/image";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import { useDispatch } from "react-redux";

export const DeliveryInfo = (props: { clicked: string }) => {
  const { clicked } = props;
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [addressid, setAddressid] = useState(0);
  const {
    isOpen: areUsureIsOpen,
    onClose: areUsureOnClose,
    onOpen: areUsureOnOpen,
  } = useDisclosure();

  const [userAddresses, setUserAddresses] = useState<any[]>([]);

  const showToast = useCustomToast();

  const [
    {
      data: userAddressData,
      isLoading: userAddressLoader,
      error: userAddressError,
    },
    userAddressFetch,
  ] = UseApi({
    service: UserAddress,
    useAuth: true,
  });

  const [
    {
      data: deleteUserData,
      isLoading: deleteUserLoader,
      error: deleteUserError,
    },
    deleteUserAddress,
  ] = UseApi({
    service: DeleteUserAddress,
    useAuth: true,
  });

  useEffect(() => {
    if (clicked === "Хүргэлтийн хаяг") userAddressFetch();
  }, [clicked]);

  useEffect(() => {
    if (userAddressData) {
      setUserAddresses(userAddressData);
    }
  }, [userAddressData]);

  const handleAddAddress = (newAddress: any) => {
    setUserAddresses((prev) => [...prev, newAddress]);
  };

  const handleDeleteAddress = (addressId: number) => {
    deleteUserAddress({ id: addressId });
  };

  useEffect(() => {
    if (deleteUserData) {
      setUserAddresses((prev) =>
        prev.filter((address) => address.addressid !== addressid)
      );

      showToast({
        type: "success",
        title: "Амжилттай устгалаа",
        description: "Хаяг амжилттай устгалаа.",
      });
      areUsureOnClose();
    }
  }, [deleteUserData]);

  useEffect(() => {
    if (deleteUserError) {
      showToast({
        type: "error",
        title: "Алдаа гарлаа",
        description: "Хаягийг устгах үед алдаа гарлаа.",
      });
      areUsureOnClose();
    }
  }, [deleteUserError]);

  return (
    <VStack
      p={"16px 24px"}
      gap={8}
      borderRadius={8}
      w={"100%"}
      display={clicked === "Хүргэлтийн хаяг" ? "flex" : "none"}
      bg={{
        base: "transparent",
        sm: "transparent",
        md: "transparent",
        lg: "white",
        xl: "white",
      }}
      minH={{ base: "86vh", sm: "86vh", md: "86vh", lg: "fit", xl: "fit" }}
      pos="relative"
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
        <Text fontWeight={600}>Хүргэлтийн хаяг</Text>
      </HStack>

      <HStack w="full" justify="space-between">
        <VStack gap={1} align="flex-start">
          <Text fontSize={20} fontWeight={700}>
            Хүргэлтийн хаяг
          </Text>
          <Text fontSize={14}>
            Та хүргэлтийн мэдээдэлээ оруулснаар захиалга хийхэд хялбар болно.
          </Text>
        </VStack>

        <Button
          variant="outline"
          fontSize={14}
          fontWeight={600}
          p="8px 14px"
          w="177px"
          leftIcon={<PlusIcon />}
          onClick={onOpen}
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "flex",
            xl: "flex",
          }}
        >
          Шинэ хаяг үүсгэх
        </Button>
        <AddUserLocation
          isOpen={isOpen}
          onClose={onClose}
          onAddAddress={handleAddAddress}
        />
      </HStack>
      <Divider />
      {userAddressLoader ? (
        <VStack w="full" gap={6}>
          {[...Array(3)].map((_, index) => (
            <VStack w="full" gap={4} key={index}>
              <Skeleton
                height="54px"
                width="full"
                borderRadius={8}
                startColor="#F2F4F7"
                endColor="#F2F4F7"
              />
            </VStack>
          ))}
        </VStack>
      ) : userAddresses?.length !== 0 ? (
        userAddresses.map((item: any, index: number) => {
          return (
            <VStack gap={6} w="full" key={index}>
              <HStack
                w="full"
                pl={4}
                justify="space-between"
                borderLeft="1px solid #F75B00"
              >
                <VStack
                  gap={2}
                  w={{
                    base: "80%",
                    sm: "80%",
                    md: "100%",
                    lg: "100%",
                    xl: "100%",
                  }}
                >
                  <Text
                    fontWeight={600}
                    fontSize={14}
                    alignSelf="flex-start"
                    w="full"
                    whiteSpace={{
                      base: "nowrap",
                      sm: "nowrap",
                      md: "nowrap",
                      lg: "wrap",
                      xl: "wrap",
                    }}
                    textOverflow={{
                      base: "ellipsis",
                      sm: "ellipsis",
                      md: "ellipsis",
                      lg: "none",
                      xl: "none",
                    }}
                    overflow={{
                      base: "hidden",
                      sm: "hidden",
                      md: "hidden",
                      lg: "flex",
                      xl: "flex",
                    }}
                  >
                    {item.address}
                  </Text>
                  <HStack gap={2} w="full">
                    <Text fontSize={14}>
                      {`${item.phone}  ${item.apartmentnumber ? ` , Байрны дугаар- ${item.apartmentnumber} ,` : ""} ${item.doornumber ? `Oрц/Xаалга-${item.doornumber}` : ""}`}
                    </Text>
                  </HStack>
                </VStack>

                <Button
                  variant="ghost"
                  fontSize={14}
                  fontWeight={600}
                  p="8px "
                  onClick={() => {
                    setAddressid(item.addressid);
                    areUsureOnOpen();
                  }}
                  w="102px"
                  leftIcon={<TrashbinIcon color="#1E1E1E" w="20" h="20" />}
                  display={{ base: "none", md: "flex" }}
                >
                  Устгах
                </Button>
                <Button
                  variant="solid"
                  fontSize={14}
                  fontWeight={600}
                  p="8px "
                  onClick={() => {
                    setAddressid(item.addressid);
                    areUsureOnOpen();
                  }}
                  w="fit-content"
                  display={{ base: "flex", md: "none" }}
                >
                  <TrashbinIcon color="#fff" w="20" h="20" />
                </Button>
              </HStack>
              <Divider
                display={index === userAddresses?.length - 1 ? "none" : "flex"}
                variant="dashed"
              />
            </VStack>
          );
        })
      ) : (
        <VStack w={"100%"} align="center" minH="100vh">
          <Stack w={390} h={294} pos="relative">
            <Image src="/svgs/empty.svg" alt="garage.mn" fill priority={true} />
          </Stack>
          <Text color="#667085" fontSize={14} fontWeight={600}>
            Танд хадгалсан хаяг одоогоор байхгүй байна
          </Text>
        </VStack>
      )}

      <AreYouSureModal
        isOpen={areUsureIsOpen}
        onClose={areUsureOnClose}
        title="Та хадгалсан хаягаа устгахдаа итгэлтэй байна уу?"
        description="Та энэхүү хаягийг устгаснаар хүргэлт хийхэд дахин автоматаар бөглөгдөн гарч ирэхгүйг анхаарна уу."
        buttonString="Устгах"
        action={() => handleDeleteAddress(addressid)}
      />
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
          onClick={onOpen}
          leftIcon={<PlusIcon color="white" />}
        >
          Шинэ хаяг үүсгэх
        </Button>
      </Stack>
    </VStack>
  );
};
