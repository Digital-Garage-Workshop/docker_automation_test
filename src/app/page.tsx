// "use client";

import {
  Accessories,
  Banner,
  Faq,
  RecentlyViewed,
  // BestSellers,
  CarBrands,
} from "@/components";
import { Stack, VStack } from "@chakra-ui/react";
import { CatalogTest } from "@/components/catalog/CatalogTest";
import { CarSelection } from "@/components/main/CarSelection";
// import { Carousel } from "@/components/main/Carousel";
import { analytics, logEvent } from "@/config/firebaseConfig";
import { useServerApi } from "@/hooks/useServerApi";
import { Banners } from "@/services/banners/banners";
import {
  CarBrands as _CarBrands,
  PartsBrands as _PartsBrands,
  GetFaq,
} from "@/services";
import { AppInstaller } from "@/components/main/AppInstaller";
// import { BestSellers } from "../components/best-seller/BestSellers";
import dynamic from "next/dynamic";

const BestSellers = dynamic(
  () => import("../components/best-seller/BestSellers")
);
const Carousel = dynamic(() => import("../components/main/Carousel"));

export default async function Home() {
  const { data: banners } = await useServerApi({
    service: Banners,
  });

  const { data: carbrands } = await useServerApi({
    service: _CarBrands,
  });
  const { data: partsbrand } = await useServerApi({
    service: _PartsBrands,
  });
  const { data: faq } = await useServerApi({
    service: GetFaq,
  });

  // useEffect(() => {
  const googleAnalytic = () => {
    if (analytics) {
      logEvent(analytics, "page_view", {
        page_name: "Home Page",
      });
    }
  };

  googleAnalytic();
  // }, []);

  return (
    <Stack
      width={{ base: "100vw", md: "100vw" }}
      align="center"
      bg="white"
      p={0}
      pos="relative"
      minH={"100vh"}
    >
      <Stack
        mt={{ base: "56px", md: "52px" }}
        w={{ base: "100%", sm: "100%", md: "82%", lg: "82%", xl: "82%" }}
        p={{ base: 4, sm: 4, md: 0, lg: 0, xl: 0 }}
      >
        <VStack
          width={"100%"}
          gap={{ base: "40px", md: "80px" }}
          p={0}
          pb={{ base: 10, md: 20 }}
        >
          <CarSelection
            // isShow={false}
            isInMain={true}
          />

          <VStack
            w="100vw"
            bg="#EDEDED"
            mt={{ base: "-64px", md: "-84px" }}
            pt={"104px"}
            mb={-20}
            pb={20}
          >
            <VStack
              w={{ base: "100%", md: "82%" }}
              gap={{ base: "40px", md: "80px" }}
              p={0}
            >
              {/* <Carousel banners={banners} /> */}
              <CatalogTest />
              <RecentlyViewed />
            </VStack>
          </VStack>
          {/* <Service /> */}
          <BestSellers />
          <CarBrands data={carbrands} />
          <Accessories data={partsbrand} />
          <Banner />
          {/* <Faq data={faq} /> */}
        </VStack>
        <AppInstaller />
      </Stack>
    </Stack>
  );
}
