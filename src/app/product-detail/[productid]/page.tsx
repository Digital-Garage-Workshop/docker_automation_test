"use client";

import {
  Aboutproduct,
  Comments,
  OeNumbers,
  Review,
  SimilarProducts,
  SuggestedCars,
} from "@/components/product-detail";
import Rate from "@/components/Rate";
import { Divider, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useRouter, useParams } from "next/navigation";
import { UseApi } from "@/hooks/useApi";
import { Product } from "@/services";
import { useEffect, useState } from "react";
import { CarSelection } from "@/components/main/CarSelection";
import { VehicleDetail } from "@/components";
import { GetComments } from "@/services/product/getComments";
import Loading from "@/app/loading";
import { Info } from "@/components/product-detail/Info";
import { analytics, logEvent } from "@/config/firebaseConfig";
import { useMetadata } from "@/providers/MetadataProvider";
import React from "react";
import Breadcrumbs from "@/components/global/BreadCrumb";
import { useSelector } from "react-redux";

export default function Page() {
  const { setMetadata } = useMetadata();
  const carDetails = useSelector((state: any) => state.car);

  const params = useParams();
  const [comments, setComments] = useState<any[]>([]);
  const addNewComment = (newComment: any) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const [{ data, isLoading, error }, fetch] = UseApi({
    service: Product,
  });
  // const [comments, setComments] = useState([]);
  const [
    { data: commentData, isLoading: commentsLoader, error: commentsError },
    fetchComments,
  ] = UseApi({
    service: GetComments,
  });

  useEffect(() => {
    if (data?.articleid) fetchComments({ articleid: data?.articleid });
  }, [data?.articleid]);
  useEffect(() => {
    setComments(commentData);
  }, [commentData]);
  const router = useRouter();

  useEffect(() => {
    fetch({
      partId: params?.productid,
      carid: carDetails?.carId,
    });
  }, []);
  useEffect(() => {
    if (analytics) {
      // Example: Log a custom event when the app loads
      logEvent(analytics, "page_view", {
        page_name: "Product Detail Page",
      });
    }
  }, []);
  useEffect(() => {
    if (data)
      setMetadata({
        title: ` ${data?.category}` || "Бүтээгдэхүүний дэлгэрэнгүй",
        description: `${data?.category} сэлбэгийн дэлгэрэнгүй. Үнэ болоод тохирох машины мэдээллүүд.`,
        image: "",
        keywords: `${data?.category}`,
      });
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Stack
      w="100vw"
      bg="#F1F2F3"
      gap="40px"
      align="center"
      minH="100vh"
      p={{ base: 4, sm: 4, md: 0, lg: 0, xl: 0 }}
      pt={{ base: 16, md: 0 }}
      mt={-1}
    >
      <Stack w="100vw" bg="white" mb={-10}>
        <CarSelection />
      </Stack>
      <Stack
        w={{ base: "100%", sm: "100%", md: "82%", lg: "82%", xl: "82%" }}
        mt={{ base: 8, sm: 8, md: 10, lg: -2, xl: -2 }}
      >
        <Stack h={4} />
        <Breadcrumbs />
        <VehicleDetail />
        <Stack gap="80px" w="full">
          <VStack
            w="full"
            gap="32px"
            flexDirection={{
              base: "column-reverse",
              sm: "column-reverse",
              md: "column",
              lg: "column",
              xl: "column",
            }}
          >
            <VStack
              gap={2}
              w="full"
              align="flex-start"
              display={{
                base: "none",
                sm: "none",
                md: "none",
                lg: "flex",
                xl: "flex",
              }}
            >
              <Text fontSize={32} fontWeight={700}>
                {`${data?.brandname} ${data?.category}`}
              </Text>
              {/* <Text>ATF 8HP, 5L, GREEN</Text> */}
              <HStack
                w="full"
                divider={<Stack borderColor="#1E1E1E" height="12px" />}
                gap={2}
              >
                <Text>{`Эдийн дугаар: ${data?.articleno}`}</Text>

                <Rate
                  rank={data?.star || 4}
                  fill="#F75B00"
                  w="16"
                  h="16"
                  stroke="#F75B00"
                />
              </HStack>
            </VStack>
            <Aboutproduct
              mainImg={data?.images[0]?.imgurl400 || "/product.svg"}
              data={data || null}
            />
          </VStack>
        </Stack>
      </Stack>
      <Stack
        w="100vw"
        bg="white"
        align="center"
        pb="80px"
        p={{ base: 4, md: 0 }}
      >
        <Stack
          //  w="82%"
          w={{ base: "100%", sm: "100%", md: "82%", lg: "82%", xl: "82%" }}
          gap={{ base: "40px", md: "80px" }}
          pt={20}
        >
          <Info />
          <SuggestedCars partId={data?.articleid} />
          <OeNumbers articleId={data?.articleid} />
          <Comments commentData={comments} />
          <Divider />
          <Review
            title={`${data?.brandname} ${data?.category}`}
            setComments={setComments}
            articleId={data?.articleid}
          />

          <SimilarProducts categoryid={data?.categoryid} />
        </Stack>
        <Stack h={20} />
      </Stack>
    </Stack>
  );
}
