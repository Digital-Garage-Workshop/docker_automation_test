"use client";
import Rate from "@/components/Rate";
import DistanceFromLocation from "@/components/repair-service/DistanceFromCurrentLocaion";
import {analytics} from "@/config/firebaseConfig";
import {UseApi} from "@/hooks/useApi";
import {useCustomToast} from "@/hooks/useCustomToast";
import {CalendarIcon, DownArrow} from "@/icons";
import {ServicesDetail} from "@/services";
import {CopyIcon} from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {logEvent} from "firebase/analytics";
import Image from "next/image";
import {useParams} from "next/navigation";
import {useEffect} from "react";

export default function Page() {
  const params = useParams();
  // const toast = useToast();
  const showToast = useCustomToast();
  useEffect(() => {
    if (analytics) {
      // Example: Log a custom event when the app loads
      logEvent(analytics, "page_view", {
        page_name: "Repair Service Page",
      });
    }
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast({
        type: "success",
        title: "Амжилттай хуулагдлаа!",
        description: "",
      });
    });
  };

  const [
    {data: service, isLoading: serviceLoader, error: serviceError},
    serviceFetch,
  ] = UseApi({
    service: ServicesDetail,
  });

  useEffect(() => {
    serviceFetch({
      serviceid: params?.serviceid,
    });
  }, []);
  //test
  return (
    <VStack
      minH={"100vh"}
      w={"100vw"}
      align={"center"}
      bg="#F1F2F3"
      pt={"50px"}
      pb={"80px"}
    >
      <VStack w="82%" gap={8}>
        <VStack w="full" gap={4}>
          <Breadcrumb separator="|" w="full">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/repair-service/${decodeURIComponent(
                  params?.name as string
                )}/${params?.categoryid}`}
              >
                {decodeURIComponent(params?.name as string)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{`${service?.organization}/${service?.name}`}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </VStack>
        <HStack w="full" p={6} gap={6} bg="white" borderRadius={8}>
          <Stack
            w="60%"
            h={500}
            pos="relative"
            borderRadius={8}
            overflow={"hidden"}
          >
            <Image
              src={
                service?.images?.[service?.images?.length - 1]?.imgurl400 ||
                "/product.svg"
              }
              alt={`${service?.name}`}
              fill
              style={{objectFit: "cover"}}
            />
          </Stack>
          <VStack w="40%" gap={6}>
            <VStack gap={4} w="full" align="flex-start">
              <Stack alignSelf="flex-start">
                <Rate rank={4} fill="#F75B00" w="16" h="16" />
              </Stack>
              <Text fontSize={28} fontWeight={700}>
                {`${service?.organization}`}
              </Text>
              <HStack gap={2}>
                <Text>{service?.name}</Text>
                <Text>|</Text>
                <DistanceFromLocation
                  placeLat={service?.lang || 47.9185}
                  placeLng={service?.long || 106.917}
                  textSize={16}
                />
              </HStack>
              <HStack gap={2}>
                <CalendarIcon />
                <Text>{service?.startTime}</Text>
                <Text>-</Text>
                <Text>{service?.endTime}</Text>
              </HStack>
              <HStack w="full" shouldWrapChildren={true}>
                {service?.carbrands?.map((item: any, index: number) => {
                  return (
                    <Stack
                      p="4px 8px"
                      border="1px solid #EDEDED"
                      borderRadius={8}
                      key={`-${index}`}
                    >
                      <Text>{item.manuname}</Text>
                    </Stack>
                  );
                })}
              </HStack>
            </VStack>
            <Divider variant="dashed" />
            <VStack gap={4} w="full">
              <VStack gap={1.5} w="full" align="flex-start">
                <Text fontSize={14} fontWeight={600}>
                  Утасны дугаар
                </Text>
                <HStack
                  w="full"
                  p="10px 14px"
                  justify={"space-between"}
                  border="1px solid #D0D5DD"
                  borderRadius={8}
                >
                  <Text>{service?.phone}</Text>
                  <CopyIcon
                    onClick={() => copyToClipboard(service?.phone)}
                    cursor="pointer"
                  />
                </HStack>
              </VStack>
              <VStack gap={1.5} w="full" align="flex-start">
                <Text fontSize={14} fontWeight={600}>
                  Дэлгэрэнгүй хаяг
                </Text>
                <HStack
                  w="full"
                  p="10px 14px"
                  justify={"space-between"}
                  border="1px solid #D0D5DD"
                  borderRadius={8}
                >
                  <Text>{service?.address}</Text>
                  <CopyIcon
                    onClick={() => copyToClipboard(service?.address)}
                    cursor="pointer"
                  />
                </HStack>
              </VStack>
              <Button>Цаг авах</Button>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
