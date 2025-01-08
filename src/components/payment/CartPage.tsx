"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import {
  HStack,
  VStack,
  Text,
  Checkbox,
  Button,
  Image,
  Divider,
} from "@chakra-ui/react";
// import { Checkbox } from "@chakra-ui/cli/Checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { formatCurrency } from "@/utils/number_formation";
import { useRouter } from "next/navigation";
import { UseApi } from "@/hooks/useApi";
import { CreateOrderDelivery } from "@/services/createOrder/createOrderDelivery";
import { CreateOrderPickUp } from "@/services/createOrder/createOrderPickup";
import { setOrderData } from "@/redux/slices/orderDataSlice";
import {
  setDelivery,
  setPickup,
  clearShippingMethod,
} from "@/redux/slices/shippingMethodSlice";
import { PaymentCard } from "./PaymentCard";
import { useSession } from "next-auth/react";
import { useCustomToast } from "@/hooks/useCustomToast";
import { setCheckedState, setSelectedArticles } from "@/redux/slices/cartSlice";
import { CartItem, ShippingMethod } from "../../../types";
import { RootState } from "@/redux/store";
import {
  selectProduct,
  updateProduct,
} from "@/redux/slices/selectedProductSlice";
import { DeliveryIcon, FastDeliveryIcon, InfoIcon, MapIcon } from "@/icons";
import { border } from "@chakra-ui/react";

enum ShippingMethodType {
  Delivery = "delivery",
  Pickup = "pickup",
}

export const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useCustomToast();
  const { data: session } = useSession();

  const [{ data, isLoading, error }, fetchDeliveryOrder] = UseApi({
    service: CreateOrderDelivery,
    useAuth: true,
  });

  const [
    { data: pickupData, isLoading: pickupIsLoading, error: pickupError },
    fetchPickupOrder,
  ] = UseApi({
    service: CreateOrderPickUp,
    useAuth: true,
  });
  useEffect(() => {
    if (error || pickupError) {
      toast({
        title: "Түр хүлээгээрэй",
        description: ` ${error || pickupError}`,
        type: "error",
      });
    }
  }, [pickupError, error]);
  const [currentShippingMethod, setCurrentShippingMethod] =
    React.useState<ShippingMethod | null>(null);

  const {
    pickupItems,
    deliveryItems,
    checkedDelivery,
    checkedPickup,
    selectedArticles,
    total,
  } = useAppSelector((state) => state.cart);
  const shippingMethod = useAppSelector(
    (state: RootState) => state.shippingMethod.shippingMethod
  );
  const carDetails = useAppSelector((state: RootState) => state.car);

  // useEffect(() => {
  //   if (!currentShippingMethod) {
  //     if (deliveryItems.length > 0) {
  //       setCurrentShippingMethod("delivery");
  //       dispatch(setDelivery());

  //       deliveryItems.forEach((item) => {
  //         dispatch(
  //           setCheckedState({
  //             itemId: item.branchparts[0].partid,
  //             isChecked: true,
  //             shippingMethod: "delivery",
  //           })
  //         );
  //       });

  //       const updatedSelectedArticles = deliveryItems.map((item) => ({
  //         ...item,
  //         shippingMethod: "delivery" as ShippingMethod,
  //       }));

  //       dispatch(setSelectedArticles(updatedSelectedArticles));
  //     } else if (pickupItems.length > 0) {
  //       setCurrentShippingMethod("pickup");
  //       dispatch(setPickup());

  //       pickupItems.forEach((item) => {
  //         dispatch(
  //           setCheckedState({
  //             itemId: item.branchparts[0].partid,
  //             isChecked: true,
  //             shippingMethod: "pickup",
  //           })
  //         );
  //       });

  //       const updatedSelectedArticles = pickupItems.map((item) => ({
  //         ...item,
  //         shippingMethod: "pickup" as ShippingMethod,
  //       }));

  //       dispatch(setSelectedArticles(updatedSelectedArticles));
  //     }
  //   }
  // }, [currentShippingMethod, dispatch]);

  const handleSelectAllDelivery = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        dispatch(setDelivery());
        setCurrentShippingMethod("delivery");
      } else {
        dispatch(clearShippingMethod());
        setCurrentShippingMethod(null);
      }
      deliveryItems.forEach((item) => {
        dispatch(
          setCheckedState({
            itemId: item.branchparts[0].partid,
            isChecked,
            shippingMethod: "delivery" as ShippingMethod,
          })
        );
      });

      const updatedSelectedArticles = isChecked
        ? [
            ...selectedArticles.filter(
              (item) => item.shippingMethod !== "pickup"
            ),
            ...deliveryItems.map((item) => ({
              ...item,
              shippingMethod: "delivery" as ShippingMethod,
            })),
          ]
        : selectedArticles.filter((item) => item.shippingMethod !== "delivery");

      dispatch(setSelectedArticles(updatedSelectedArticles));
    },
    [dispatch, deliveryItems, selectedArticles, toast]
  );
  const handleSelectAllPickup = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        dispatch(setPickup());
        setCurrentShippingMethod("pickup");
      } else {
        dispatch(clearShippingMethod());
        setCurrentShippingMethod(null);
      }
      pickupItems.forEach((item) => {
        dispatch(
          setCheckedState({
            itemId: item.branchparts[0].partid,
            isChecked,
            shippingMethod: "pickup" as ShippingMethod,
          })
        );
      });

      const updatedSelectedArticles = isChecked
        ? [
            ...selectedArticles.filter(
              (item) => item.shippingMethod !== "delivery"
            ),
            ...pickupItems.map((item) => ({
              ...item,
              shippingMethod: "pickup" as ShippingMethod,
            })),
          ]
        : selectedArticles.filter((item) => item.shippingMethod !== "pickup");

      dispatch(setSelectedArticles(updatedSelectedArticles));
    },
    [dispatch, pickupItems, selectedArticles, toast]
  );

  const handleIndividualCheck = useCallback(
    (isChecked: boolean, item: CartItem, method: ShippingMethod) => {
      const itemId = item.branchparts[0].partid;

      // Get the current selectedArticles from the state
      const currentSelectedArticles = [...selectedArticles];

      if (isChecked) {
        if (method === "pickup") {
          dispatch(setPickup());
          setCurrentShippingMethod("pickup");

          // Uncheck all delivery items
          deliveryItems.forEach((deliveryItem) => {
            dispatch(
              setCheckedState({
                itemId: deliveryItem.branchparts[0].partid,
                isChecked: false,
                shippingMethod: "delivery",
              })
            );
          });

          // Remove all delivery items from selectedArticles
          const updatedSelectedArticles = currentSelectedArticles.filter(
            (selectedItem) => selectedItem.shippingMethod !== "delivery"
          );

          // Add the current item to selectedArticles
          updatedSelectedArticles.push({ ...item, shippingMethod: method });

          dispatch(setSelectedArticles(updatedSelectedArticles));
        } else {
          dispatch(setDelivery());
          setCurrentShippingMethod("delivery");

          // Uncheck all pickup items
          pickupItems.forEach((pickupItem) => {
            dispatch(
              setCheckedState({
                itemId: pickupItem.branchparts[0].partid,
                isChecked: false,
                shippingMethod: "pickup",
              })
            );
          });

          // Remove all pickup items from selectedArticles
          const updatedSelectedArticles = currentSelectedArticles.filter(
            (selectedItem) => selectedItem.shippingMethod !== "pickup"
          );

          // Add the current item to selectedArticles
          updatedSelectedArticles.push({ ...item, shippingMethod: method });

          dispatch(setSelectedArticles(updatedSelectedArticles));
        }
      } else {
        // Remove the item from selectedArticles
        const updatedSelectedArticles = currentSelectedArticles.filter(
          (selectedItem) => selectedItem.branchparts[0].partid !== itemId
        );

        dispatch(setSelectedArticles(updatedSelectedArticles));

        // If no items remain selected, clear the shipping method
        if (updatedSelectedArticles.length === 0) {
          dispatch(clearShippingMethod());
          setCurrentShippingMethod(null);
        }
      }

      // Update the checked state for the specific item
      dispatch(
        setCheckedState({
          itemId,
          isChecked,
          shippingMethod: method,
        })
      );

      // toast({
      //   description: isChecked
      //     ? `${method === "delivery" ? "Хүргэлтийн" : "Очиж авах"} бараа сонгогдлоо.`
      //     : `${method === "delivery" ? "Хүргэлтийн" : "Очиж авах"} бараа сонголтоос хасагдлаа.`,
      //   title: "Success",
      //   type: "success",
      // });
    },
    [dispatch, selectedArticles, deliveryItems, pickupItems, toast]
  );
  const handleContinue = useCallback(() => {
    if (selectedArticles.length === 0) {
      toast({
        title: "Ямар ч бараа сонгогдоогүй.",
        description: "Үргэлжлүүлэхийн тулд дор хаяж нэг бараа сонгоно уу.",
        type: "warning",
      });
      return;
    }

    const orderData = {
      carid: carDetails.carId,
      platenumber: carDetails.plate,
      items: selectedArticles.map((item) => ({
        partid: item.branchparts?.[0]?.partid ?? 0,
        quantity: item.quantity,
        type: item.shippingMethod,
      })),
    };
    if (session) {
      if (shippingMethod === ShippingMethodType.Delivery) {
        fetchDeliveryOrder(orderData);
      } else {
        fetchPickupOrder(orderData);
      }
    } else {
      router.push("/payment/login");
      dispatch(
        selectProduct(
          selectedArticles.map((item) => ({
            ...item,
            partid: item.branchparts?.[0]?.partid ?? 0,
            quantity: item.quantity,
            shippingMethod: item.shippingMethod,
          }))
        )
      );
    }
  }, [selectedArticles, session, router, toast]);
  useEffect(() => {
    if (data) {
      dispatch(setOrderData(data));
      router.push("/payment/address");
    } else if (pickupData) {
      dispatch(setOrderData(pickupData));
      router.push("/payment/checkout");
    }
  }, [data, pickupData, dispatch, router]);
  // Calculate the total based on the selected shipping method
  const filteredTotal = useMemo(() => {
    return selectedArticles?.reduce((acc, item) => {
      const price =
        item.branchparts?.[0]?.pricesale ?? item.branchparts?.[0]?.price;
      return acc + (price ?? 0) * item.quantity;
    }, 0);
  }, [selectedArticles]);
  return (
    <HStack
      gap={6}
      // pos="relative"
      w="full"
      justifyContent="center"
      flexDirection={{ base: "column", md: "row" }}
    >
      <VStack
        gap={6}
        // bgColor="white"
        borderRadius={8}
        w={{ base: "100%", md: "65%" }}
      >
        {deliveryItems.length + pickupItems.length === 0 ? (
          <VStack gap={4} bg="white" borderRadius={8} w="full" p={6}>
            <Image src="/svgs/empty.svg" alt="Empty cart" />

            <Text fontSize={14} fontWeight={700} color="#344054">
              Сагс хоосон байна
            </Text>
            <Text
              textAlign="center"
              maxW={370}
              fontSize={14}
              color="#667085"
              mt={-4}
            >
              Худалдан авахаар төлөвлөж байгаа бүтээгдэхүүнээ Зүрх товчлуурыг
              ашиглан хадгалаарай
            </Text>
            <Button
              variant="outline"
              onClick={() => {
                router.push("/category");
              }}
              w="fit-content"
              size="md"
            >
              Худалдан авалт хийх
            </Button>
          </VStack>
        ) : // <Text fontSize={20} fontWeight={700} w="100%">
        //   {`Таны сагсалсан бараанууд (${pickupItems?.length + deliveryItems?.length})`}
        // </Text>
        null}

        {deliveryItems.length > 0 && (
          <VStack
            gap={4}
            w="full"
            align="flex-start"
            bg="white"
            borderRadius={8}
            p={6}
          >
            <HStack gap={2}>
              <Checkbox
                isChecked={deliveryItems.every(
                  (item) => checkedDelivery[item.branchparts[0].partid] === true
                )}
                onChange={(e) => handleSelectAllDelivery(e.target.checked)}
                pr={2}
                variant="outline"
              />
              <FastDeliveryIcon />
              <VStack align="flex-start" gap={1}>
                <Text fontSize={14} fontWeight={700}>
                  Хүргэлтээр
                </Text>
                <Text fontSize={14}>
                  Таны захиалгын хаягйин дагуу хүргэж өгнө.
                </Text>
              </VStack>
            </HStack>
            <Divider />
            {deliveryItems.map((item, index) => (
              <VStack
                key={item.articleid + item.branchparts[0].partid}
                w="full"
              >
                <PaymentCard
                  articleid={item.articleid}
                  category={item.category}
                  articleno={item.articleno}
                  brandname={item.brandname}
                  star={item.star}
                  images={item.images}
                  reward={item.reward}
                  branchparts={item.branchparts[0]}
                  carid={item.carid}
                  onCheck={(isChecked) =>
                    handleIndividualCheck(isChecked, item, "delivery")
                  }
                  quantity={item.quantity}
                  isChecked={
                    checkedDelivery[item.branchparts[0].partid] ?? false
                  }
                  isDelivery
                />
                {index < deliveryItems?.length - 1 && (
                  <Divider variant="dashed" colorScheme="#E4E7EC" />
                )}
              </VStack>
            ))}
          </VStack>
        )}

        {pickupItems.length > 0 && (
          <VStack
            gap={4}
            w="full"
            align="flex-start"
            borderRadius={8}
            bg="white"
            p={6}
          >
            <HStack gap={2}>
              <Checkbox
                isChecked={pickupItems.every(
                  (item) => checkedPickup[item.branchparts[0].partid] === true
                )}
                onChange={(e) => handleSelectAllPickup(e.target.checked)}
                variant="outline"
                pr={2}
              />
              <MapIcon color="#1E1E1E" />
              <VStack align="flex-start" gap={1}>
                <Text fontSize={14} fontWeight={700}>
                  Очиж авах
                </Text>
                <Text fontSize={14}>Та захиалгаа хаягйин дагуу очиж авна.</Text>
              </VStack>
            </HStack>
            <Divider />
            {pickupItems.map((item, index) => (
              <VStack
                w="full"
                key={item.articleid + item.branchparts[0].partid}
              >
                <PaymentCard
                  articleid={item.articleid}
                  category={item.category}
                  articleno={item.articleno}
                  brandname={item.brandname}
                  star={item.star}
                  images={item.images}
                  reward={item.reward}
                  branchparts={item.branchparts[0]}
                  carid={item.carid}
                  onCheck={(isChecked) =>
                    handleIndividualCheck(isChecked, item, "pickup")
                  }
                  quantity={item.quantity}
                  isChecked={checkedPickup[item.branchparts[0].partid] ?? false}
                  isDelivery={false}
                />
                {index < pickupItems?.length - 1 && (
                  <Divider variant="dashed" colorScheme="#E4E7EC" />
                )}
              </VStack>
            ))}
          </VStack>
        )}
      </VStack>

      <VStack
        width={{ base: "full", md: "35%" }}
        gap={8}
        p="12px 18px"
        bg="white"
        alignSelf="flex-start"
        borderRadius={8}
        padding={6}
      >
        <Text fontSize={20} fontWeight={700} alignSelf="flex-start">
          Таны захиалга:
        </Text>
        <HStack w="full" justify="space-between">
          <Text fontSize={16} fontWeight={600}>
            Нийт төлөх үнэ:
          </Text>
          <Text fontSize={24} fontWeight={700}>
            {formatCurrency(filteredTotal)}
          </Text>
        </HStack>
        <Button
          isLoading={isLoading || pickupIsLoading}
          onClick={handleContinue}
          colorScheme="blue"
          isDisabled={
            isLoading || pickupIsLoading || selectedArticles.length === 0
          }
          _disabled={{
            bg: "#F2F4F7",
            color: "#98A2B3",
            cursor: "not-allowed",
            _hover: { bg: "#F2F4F7" },
          }}
        >
          Үргэлжлүүлэх
        </Button>
        <HStack
          w="full"
          bg="#FFC45333"
          borderRadius={8}
          gap={2}
          p="10px"
          align="flex-start"
          mt={-4}
          display={
            pickupItems?.length !== 0 && deliveryItems?.length !== 0
              ? "flex"
              : "none"
          }
        >
          <InfoIcon color="#916A00" w="30" h="30" />
          <Text color="#916A00" fontSize={14}>
            Та Хүргэлтээр болон Очиж авах захиалгуудыг хамтад нь захиалах
            боломжгүйг анхаарна уу.
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};
