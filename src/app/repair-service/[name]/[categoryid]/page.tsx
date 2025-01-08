"use client";
import { ChakraNextImage } from "@/components/global/image";
import Rate from "@/components/Rate";
import DistanceFromLocation from "@/components/repair-service/DistanceFromCurrentLocaion";
import { UseApi } from "@/hooks/useApi";
import { DownArrow } from "@/icons";
import { CarBrands, Diagnose, ServicesByCategory } from "@/services";
import {
  border,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [
    { data: carBrands, isLoading: carBrandLoader, error: carBrandError },
    carBrandFetch,
  ] = UseApi({
    service: CarBrands,
  });

  const [
    { data: services, isLoading: serviceLoader, error: serviceError },
    serviceFetch,
  ] = UseApi({
    service: ServicesByCategory,
  });

  const visibleItems = carBrands?.slice(
    currentPage,
    currentPage + itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < carBrands?.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    carBrandFetch();
    serviceFetch({
      categoryid: params?.categoryid,
    });
  }, []);

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
            <BreadcrumbItem isCurrentPage={true}>
              <BreadcrumbLink href="/repair-service">
                {decodeURIComponent(params?.name as string)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {/* <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Contact</BreadcrumbLink>
            </BreadcrumbItem> */}
          </Breadcrumb>
          <VStack gap={8} w="100%" pos="relative">
            <Text fontSize={28} fontWeight={700} w="100%">
              {decodeURIComponent(params?.name as string)}
            </Text>
            <HStack w="100%">
              <Stack>
                <Button
                  disabled={currentPage === 0}
                  onClick={handlePrev}
                  p={0}
                  _hover={{ bg: "#F1F2F3" }}
                  bg="#F1F2F3"
                  sx={{ transform: "rotate(90deg)" }}
                >
                  <DownArrow color="#354052" w="24" h="24" />
                </Button>
              </Stack>
              <Grid
                maxW="100%"
                overflowX="auto"
                gap={4}
                templateColumns={`repeat(${carBrands?.length}, 190px)`}
              >
                {carBrands?.map((item: any, index: number) => (
                  <GridItem key={index} minW="0">
                    <VStack
                      w="100%"
                      p="16px 0px"
                      bg="#F9FAFB"
                      gap={2}
                      _hover={{
                        border: "1px solid #F75B00",
                        transition: "borderColor 300ms ease",
                      }}
                    >
                      {/* {index === 0 ? (
                  <Window />
                ) : ( */}
                      <Stack width="56px" height="56px" pos="relative">
                        <ChakraNextImage
                          src={item.image ? item.image.imgurl400 : "/img.svg"}
                          alt=""
                          style={{ objectFit: "cover" }}
                        />
                      </Stack>
                      {/* )} */}
                      <Text>{item.name}</Text>
                    </VStack>
                  </GridItem>
                ))}
              </Grid>
              <Stack>
                <Button
                  disabled={currentPage >= carBrands?.length - 1}
                  onClick={handleNext}
                  p={0}
                  bg="#F1F2F3"
                  _hover={{ bg: "#F1F2F3" }}
                  sx={{ transform: "rotate(-90deg)" }}
                >
                  <DownArrow color="#354052" w="24" h="24" />
                </Button>
              </Stack>
            </HStack>
          </VStack>
        </VStack>
        <VStack w="full" gap={6}>
          <Text fontSize={20} fontWeight={700} alignSelf={"flex-start"}>
            Засварын төвүүд
          </Text>
          <Grid w="full" templateColumns="repeat(4, 1fr)" gap={6}>
            {services?.map((item: any, index: number) => {
              return (
                <GridItem key={index}>
                  <VStack
                    w="full"
                    gap={4}
                    p={4}
                    bg="white"
                    borderRadius={8}
                    // onClick={() => {
                    //   router.push(
                    //     `repair-service/${params?.name}/${params?.categoryid}/${item.service?.serviceid}`
                    //   );
                    // }}
                    onClick={(e) => {
                      e.preventDefault();

                      if (e.button === 2) {
                        window.open(
                          `repair-service/${params?.name}/${params?.categoryid}/${item.service?.serviceid}`,
                          "_blank"
                        );
                      } else if (e.button === 0) {
                        router.push(
                          `repair-service/${params?.name}/${params?.categoryid}/${item.service?.serviceid}`
                        );
                      }
                    }}
                    cursor="pointer"
                  >
                    <Stack
                      pos="relative"
                      w="full"
                      h="151px"
                      borderRadius={8}
                      overflow="hidden"
                    >
                      <ChakraNextImage
                        src={
                          item.images?.[item.images?.length - 1]?.imgurl400 ||
                          "/product.svg"
                        }
                        alt={`${item.name}`}
                      />
                    </Stack>
                    <Stack alignSelf="flex-start">
                      <Rate rank={4} fill="#F75B00" w="16" h="16" />
                    </Stack>
                    <VStack gap={2} align={"flex-start"} w="full">
                      <Text
                        fontWeight={700}
                        w={"full"}
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >{`${item.organization}`}</Text>
                      <HStack gap={2}>
                        <Text fontSize={12}>{item.name}</Text>
                        <Text fontSize={12}>|</Text>
                        <DistanceFromLocation
                          textSize={12}
                          placeLat={item?.lang || 47.9185}
                          placeLng={item?.long || 106.917}
                        />
                      </HStack>
                    </VStack>
                    <HStack w="full">
                      {item.carbrands?.map((brands: any, index: number) => {
                        if (index <= 1) {
                          return (
                            <Stack
                              p="4px 6px"
                              border="1px solid #EDEDED"
                              borderRadius={8}
                              key={`brands-${index}`}
                            >
                              <Text fontSize={12}>{brands.manuname}</Text>
                            </Stack>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </HStack>
                  </VStack>
                </GridItem>
              );
            })}
          </Grid>
        </VStack>
      </VStack>
    </VStack>
  );
}
