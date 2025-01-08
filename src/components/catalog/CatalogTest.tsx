// "use client";
import {
  VStack,
  Text,
  Button,
  Spinner,
  Stack,
  Grid,
  Heading,
} from "@chakra-ui/react";
import { DownArrow } from "@/icons";
import { UseApi } from "@/hooks/useApi";
import { Category as _Category } from "@/services/category/category";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CatalogGrid } from "./CatalogGrid";
import Skeleton from "react-loading-skeleton";
import { useServerApi } from "@/hooks/useServerApi";
import Link from "next/link";
import { SubCategory } from "@/services";
import { GetServerSideProps } from "next";

export const CatalogTest = async () => {
  // const router = useRouter();

  const { data } = await useServerApi({
    service: _Category,
  });

  const getSubcategories = async (categoryid: number, carid?: number) => {
    "use server";
    return await useServerApi({
      service: SubCategory,
      body: {
        categoryid: categoryid,
        carid: carid,
      },
    });
  };

  // useEffect(() => {
  //   fetch();
  // }, []);

  return (
    <VStack
      gap={{ base: "16px", md: "32px" }}
      w="100%"
      p={{
        base: 4,
        md: 0,
      }}
    >
      {/* Header Texts */}
      <VStack gap={{ base: 1, md: 2 }} textAlign="center" maxW="100%">
        <Heading
          fontWeight={700}
          color="#1E1E1E"
          fontSize={{ base: "20px", md: "24px", lg: "24px" }}
          as="h1"
        >
          Сэлбэгийн ангилал
        </Heading>
        <Text
          maxWidth={{ base: "100%", md: "564px" }}
          fontSize={{ base: "14px", md: "16px" }}
          color="gray.600"
          as="h1"
        >
          Бид дэлхийд тэргүүлэгч брэндүүдээс таны хэрэгцээ шаардлагад нийцсэн
          автомашины сэлбэг эд ангийг нийлүүлдэг. 
        </Text>
      </VStack>

      {/* Loading Spinner or CatalogGrid */}
      {
        // isLoading ? (
        //   <Grid
        //     templateColumns={{
        //       base: "repeat(2, 1fr)", // 2 columns on mobile
        //       sm: "repeat(3, 1fr)", // 3 columns on small screens
        //       md: "repeat(4, 1fr)", // 4 columns on medium screens
        //       lg: "repeat(5, 1fr)",
        //       xl: "repeat(6, 1fr)", // 6 columns on large screens
        //     }}
        //     gap={{ base: 2, md: 4 }}
        //     w="full"
        //     position="relative"
        //   >
        //     {Array(12)
        //       .fill("")
        //       .map((_, index) => {
        //         return (
        //           <Skeleton
        //             key={index}
        //             width="full"
        //             height={264}
        //             borderRadius={8}
        //             baseColor="#E4E7EC"
        //             highlightColor="#E4E7EC"
        //           ></Skeleton>
        //         );
        //       })}
        //   </Grid>
        // ) :
        <CatalogGrid data={data} isExpandable={false} isAll={false} />
      }
      <Link href={"/category"}>
        <Button
          variant="outline"
          padding="8px 24px"
          w={{ base: "full", md: "fit-content" }}
          fontWeight={600}
          fontSize={{ base: "12px", md: "14px" }}
          rightIcon={
            <Stack p={0} transform="rotate(-90deg)">
              <DownArrow w="20" h="20" color="#1E1E1E" />
            </Stack>
          }
          _hover={{ borderColor: "#D0D5DD", bg: "#F2F4F7" }}
          bg="#F9FAFB"
          // onClick={() => router.push("/category")}/
        >
          Ангиллын дэлгэрэнгүй
        </Button>
      </Link>
    </VStack>
  );
};
