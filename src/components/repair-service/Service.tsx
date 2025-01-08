"use client";
import {
  VStack,
  Stack,
  Spinner,
  Text,
  GridItem,
  Button,
  Box,
} from "@chakra-ui/react";
import {UseApi} from "@/hooks/useApi";
import {Diagnose} from "@/services";
import {useEffect, useRef} from "react";
import {NextButton} from "./NextButton";
import {useRouter} from "next/navigation";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore from "swiper";

export const Service = () => {
  const router = useRouter();
  const [{data, isLoading}, fetch] = UseApi({
    service: Diagnose,
  });

  const itemsPerPage = 5;
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    fetch();
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      const maxIndex = Math.ceil(data?.length / itemsPerPage) - 1;
      const nextIndex = Math.min(
        swiperRef.current.realIndex + itemsPerPage,
        data?.length - itemsPerPage
      );
      swiperRef.current.slideTo(nextIndex);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      const prevIndex = Math.max(swiperRef.current.realIndex - itemsPerPage, 0);
      swiperRef.current.slideTo(prevIndex);
    }
  };

  return isLoading ? (
    <Stack w="100%" h="200px">
      <Spinner />
    </Stack>
  ) : (
    <VStack gap={8} w="100%" pos="relative" mt={20}>
      <Text
        mt={{base: 10, md: 0}}
        textAlign="center"
        fontSize={{base: 20, md: 28}}
        fontWeight={700}
      >
        Авто засвар, Үйлчилгээ
      </Text>

      <Stack
        pos="absolute"
        left="-60px"
        top="60%"
        display={{
          base: "none",
          sm: "none",
          md: "none",
          lg: "flex",
          xl: "flex",
        }}
      >
        <Button
          onClick={handlePrev}
          p={0}
          _hover={{bg: "#F1F2F3"}}
          bg="#F1F2F3"
        >
          <NextButton rotateAngle="90deg" />
        </Button>
      </Stack>

      <Stack
        pos="absolute"
        right="-60px"
        top="60%"
        display={{
          base: "none",
          sm: "none",
          md: "none",
          lg: "flex",
          xl: "flex",
        }}
      >
        <Button onClick={handleNext} p={0} bg="#fff" _hover={{bg: "#F1F2F3"}}>
          <NextButton rotateAngle="-90deg" />
        </Button>
      </Stack>

      <Box
        w="full"
        maxW={{base: "100%"}}
        mx="auto"
        overflow="hidden"
        pos="relative"
        px={{base: 4, md: 0}}
      >
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          loop={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={() => {}}
        >
          {data?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <GridItem
                key={index}
                onClick={() => {
                  router.push(
                    `/repair-service/${item.name}/${item.categoryid}`
                  );
                }}
                h={{
                  base: "120px",
                  sm: "120px",
                  md: "120px",
                  lg: "135px",
                  xl: "135px",
                }}
                w="full"
              >
                <Stack
                  bgImage={`url('${item.img400}')`}
                  borderRadius={"8px"}
                  overflow="hidden"
                  h={"100%"}
                  w="100%"
                  cursor="pointer"
                  transition="transform 0.5s ease-in-out"
                  _hover={{transform: "scale(1.05)"}}
                >
                  <Stack
                    backdropFilter="auto"
                    backdropBrightness="30%"
                    px={6}
                    align="center"
                    justify="center"
                    w="100%"
                    h="100%"
                  >
                    <Text
                      textAlign="center"
                      fontSize={20}
                      fontWeight={700}
                      color="white"
                    >
                      {item.name}
                    </Text>
                  </Stack>
                </Stack>
              </GridItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </VStack>
  );
};
