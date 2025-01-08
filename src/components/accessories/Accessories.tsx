"use client";
import { Grid, GridItem, Stack, VStack, Text, Button } from "@chakra-ui/react";
import { DownArrow } from "@/icons";
import Image from "next/image";
import { UseApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { PartsBrands as _PartsBrands } from "@/services";
import Skeleton from "react-loading-skeleton";

export const Accessories = (props: { data: any }) => {
  // const [{ data, isLoading, error }, fetch] = UseApi({
  //   service: _PartsBrands,
  // });
  const { data } = props;
  const [dataNumber, setDataNumber] = useState(7);

  const handleClick = () => {
    dataNumber >= data.length
      ? setDataNumber(8)
      : setDataNumber((prev) => prev + 8);
  };

  // useEffect(() => {
  //   fetch();
  // }, []);

  return (
    <VStack gap={{ base: "16px", md: "32px" }} w="100%" px={{ base: 4, md: 0 }}>
      {/* Title Section */}
      <Stack gap={{ base: "4px", md: "8px" }} alignItems="center" w="100%">
        <Text
          fontWeight={700}
          color="#1E1E1E"
          fontSize={{ base: "20px", md: "24px", lg: "24px" }}
          textAlign="center"
        >
          Сэлбэгийн брэндүүд
        </Text>
        {/* <Text
          maxWidth={{ base: "100%", md: "550px" }}
          textAlign="center"
          fontSize={{ base: "14px", md: "16px" }}
        >
          Бид дэлхийд тэргүүлэгч брэндүүдээс таны хэрэгцээ шаардлагад нийцсэн
          автомашины сэлбэг эд ангийг нийлүүлдэг.
        </Text> */}
      </Stack>

      {/* Brand Grid */}
      <Grid
        w="100%"
        templateColumns={{
          base: "repeat(2, 1fr)", // 2 columns on mobile
          sm: "repeat(4, 1fr)", // 4 columns on small screens
          md: "repeat(6, 1fr)", // 6 columns on medium screens
          lg: "repeat(6, 1fr)", // 8 columns on large screens
        }}
        gap={{ base: "8px", md: "24px" }}
      >
        {// isLoading
        //   ? Array(6)
        //       .fill(" ")
        //       .map((item, index) => (
        //         <GridItem key={index}>
        //           <Skeleton width="full" height={"56px"} />
        //         </GridItem>
        //       ))
        //   :
        data?.slice(0, dataNumber).map((item: any, index: number) => (
          <GridItem key={index} display={index === 4 ? "none" : "flex"}>
            <Stack
              h="80px"
              w="100%"
              bg="white"
              alignItems="center"
              justifyContent="center"
              borderRadius="8px"
              border="1px solid #E4E7EC"
            >
              <Stack position="relative" w="87px" h="48px">
                <Image
                  src={item.images ? item.images.imgurl400 : "/product.svg"}
                  alt={`${item.brandname}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px)"
                  style={{ objectFit: "contain" }}
                />
              </Stack>
            </Stack>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};
