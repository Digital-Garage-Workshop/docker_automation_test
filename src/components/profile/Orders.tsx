"use client";

import { UseApi } from "@/hooks/useApi";
import { DeliveryIcon, DownArrow, MyGarageIcon } from "@/icons";
import { setClickedSideBar } from "@/redux/slices/profileSlice";
import { GetOrders } from "@/services/user/orders";
import { formatCurrency } from "@/utils/number_formation";
import {
  VStack,
  HStack,
  Text,
  Stack,
  filter,
  Skeleton,
} from "@chakra-ui/react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";

const states = [
  { title: "Бүгд", states: "Бүгд" },
  { title: "Хүргэлт", states: "delivery" },
  { title: "Очиж авах", states: "pickup" },
];

type OrderDetail = {
  id: number;
  ordertype: string;
  service: string;
  subservice: string;
  part: {
    partid: number;
    category: string;
    generic: string;
    warrenty: string;
    brandname: string;
    articleno: string;
    partimage: string;
  };
  quantity: number;
  price: number;
  totalamount: number;
  branch: {
    id: number;
    name: string;
    phone: string;
    startTime: string;
    endTime: string;
    lang: number;
    long: number;
  };
  organization: {
    id: number;
    name: string;
    logo: string;
  };
};

type Order = {
  orderid: number;
  ordertype: string;
  alltotal: number;
  paidtotal: number;
  allquantity: number;
  deliverytype: string;
  deliverytotal: number;
  lang: string;
  long: string;
  platenumber: string;
  bookingdate: string | null;
  bookingtime: string | null;
  durationtime: string | null;
  address: string;
  status: string;
  statustype: string;
  deliverystatus: string | null;
  ispaid: boolean;
  point: number | null;
  createdDate: string;
  details: OrderDetail[];
};

export const Orders = (props: { clicked: string }) => {
  const { clicked } = props;
  const dispatch = useDispatch();
  const [selectedState, setSelectedState] = useState("Бүгд");
  const [orders, setorders] = useState<Order[]>([]);
  const router = useRouter();
  const [
    { data: orderData, isLoading: orderLoader, error: orderError },
    orderFetch,
  ] = UseApi({
    service: GetOrders,
    useAuth: true,
  });

  const filterOrders = () => {
    if (selectedState === "Бүгд") {
      setorders(orderData);
    } else {
      setorders(
        orderData?.filter((item: Order) => {
          const matches = item.ordertype === selectedState;

          return matches;
        })
      );
    }
  };

  useEffect(() => {
    if (clicked === "Захиалгууд") orderFetch();
  }, [clicked]);

  useEffect(() => {
    filterOrders();
  }, [selectedState, orderData]);

  const handleOnClick = (orderid: number) => {
    router.push(`/profile/orders/${orderid}`);
  };

  return (
    <VStack
      p={"16px 24px"}
      gap={8}
      borderRadius={8}
      w={"100%"}
      display={clicked === "Захиалгууд" ? "flex" : "none"}
      bg={{
        base: "transparent",
        sm: "transparent",
        md: "transparent",
        lg: "white",
        xl: "white",
      }}
      minH={{ base: "86vh", sm: "86vh", md: "86vh", lg: "fit", xl: "fit" }}
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
        <Text fontWeight={600}>Захиалгууд</Text>
      </HStack>
      <HStack w="full" justify="space-between">
        <VStack gap={1} align="flex-start">
          <Text fontSize={20} fontWeight={700}>
            {`Захиалгууд (${orderData?.length || 0})`}
          </Text>
          {/* <Text fontSize={12}>
            Та хүргэлтийн хаягаа оруулснаар захиалга хийхдээ тухайн хаягийг
            хялбар ашиглах боломжтой
          </Text> */}
        </VStack>
      </HStack>
      <HStack
        w="full"
        gap={2}
        display={orderData?.length === 0 ? "none" : "flex"}
      >
        {states.map((item, index) => (
          <Stack
            key={index}
            p="8px 14px"
            bgColor={
              selectedState === item.states ? "#F75B0026" : "transparent"
            }
            borderRadius={32}
            color={selectedState === item.states ? "#F75B00" : "#717171"}
            onClick={() => setSelectedState(item.states.toString())}
            cursor="pointer"
          >
            <Text fontSize={14} fontWeight={700}>
              {item.title.toString()}
            </Text>
          </Stack>
        ))}
      </HStack>
      {orderLoader ? (
        <VStack gap={6} w="full">
          {[1, 2, 3, 4, 5].map((el) => (
            <Skeleton
              key={el}
              width={"100%"}
              height="86px"
              borderRadius={8}
              startColor="#F9FAFB"
              endColor="#F9FAFB"
              borderLeft={`8px solid #E4E7EC`}
            />
          ))}
        </VStack>
      ) : orders?.length !== 0 ? (
        orders?.map((item: Order, index: number) => {
          return (
            <Stack
              cursor="pointer"
              key={item.orderid}
              w="full"
              borderRadius={8}
              bg="#FAFAFA"
              p="16px 32px"
              border="1px solid #FAFAFA"
              pos="relative"
              justify="space-between"
              onClick={() => {
                handleOnClick(item.orderid);
              }}
              borderLeft={`8px solid ${
                item.status === "Захиалга хийсэн"
                  ? "#FFC453"
                  : item.status === "Дууссан"
                    ? "#53BC00"
                    : "#D82C0D"
              }`}
              flexDirection={{
                base: "column",
                sm: "column",
                md: "column",
                lg: "row",
                xl: "row",
              }}
            >
              {/* {item.ordertype === "delivery" ? (
                <DeliveryIcon />
              ) : (
                <MyGarageIcon color="#1e1e1e" />
              )} */}
              {/* <Stack
                w="8px"
                h="86px"
                borderBottomLeftRadius="8px"
                borderTopLeftRadius="8px"
                pos="absolute"
                bg={
                  item.status === "Захиалга хийсэн"
                    ? "#FFC453"
                    : item.status === "Дууссан"
                      ? "#53BC00"
                      : "#D82C0D"
                }
                top="0px"
                left="0px"
              /> */}
              <VStack gap="6px" align="flex-start">
                <HStack w="full" justify="space-between">
                  <Text
                    display={{
                      base: "flex",
                      sm: "flex",
                      md: "flex",
                      lg: "none",
                      xl: "none",
                    }}
                    color="#667085"
                    fontWeight={600}
                    fontSize={14}
                  >{`#${item.orderid.toString()}`}</Text>
                  <HStack
                    gap={4}
                    fontSize={{ base: 12, sm: 12, md: 12, lg: 16, xl: 16 }}
                  >
                    <Text>{`${item.createdDate.toString().slice(0, 10)}`}</Text>
                    <Text>{`${item.createdDate.toString().slice(11, 16)}`}</Text>
                  </HStack>
                </HStack>
                <HStack gap={3}>
                  <Text
                    display={{
                      base: "none",
                      sm: "none",
                      md: "none",
                      lg: "flex",
                      xl: "flex",
                    }}
                    fontWeight={700}
                  >{`#${item.orderid.toString()}`}</Text>
                  <Stack
                    display={{
                      base: "none",
                      sm: "none",
                      md: "none",
                      lg: "flex",
                      xl: "flex",
                    }}
                    w="5px"
                    h="5px"
                    borderRadius={"full"}
                    bg="black"
                  />
                  <Text
                    fontWeight={{
                      base: 600,
                      sm: 600,
                      md: 600,
                      lg: 700,
                      xl: 700,
                    }}
                  >
                    {item.status === "Дууссан"
                      ? item.ordertype === "delivery"
                        ? "Хүргэлтэд гарсан"
                        : "Очиж авахад бэлэн болсон"
                      : item.status === "Захиалга хийсэн"
                        ? "Төлбөр хүлээгдэж буй"
                        : item.status.toString()}
                  </Text>
                </HStack>
              </VStack>
              {/* <HStack gap={4}>
                <Text>{`${item.createdDate.toString().slice(0, 10)}`}</Text>
                <Text>{`${item.createdDate.toString().slice(11, 16)}`}</Text>
              </HStack> */}

              <HStack gap={4}>
                <VStack gap="6px" align="flex-end">
                  <Text
                    display={{
                      base: "none",
                      sm: "none",
                      md: "none",
                      lg: "flex",
                      xl: "flex",
                    }}
                  >
                    Дүн
                  </Text>
                  <Text fontWeight={700}>{formatCurrency(item.alltotal)}</Text>
                </VStack>
                <Stack
                  sx={{ transform: "rotate(-90deg)" }}
                  display={{
                    base: "none",
                    sm: "none",
                    md: "none",
                    lg: "flex",
                    xl: "flex",
                  }}
                >
                  <DownArrow color="#1E1E1E" w="20" h="20" />
                </Stack>
              </HStack>
            </Stack>
          );
        })
      ) : (
        <VStack w={"75%"} align="center" minH="100vh">
          <Stack w={390} h={294} pos="relative">
            <Image src="/svgs/empty.svg" alt="garage.mn" fill priority={true} />
          </Stack>
          <Text color="#667085" fontSize={14} fontWeight={600}>
            Танд захиалсан бүтээгдэхүүн одоогоор байхгүй байна
          </Text>
        </VStack>
      )}
    </VStack>
  );
};
