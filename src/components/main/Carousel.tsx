"use client";
import { Box, HStack, Skeleton } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import "swiper/css";

import { Autoplay } from "swiper/modules";

export default function Carousel(props: { banners: any }) {
  const { banners } = props;
  const [currentImage, setCurrentImage] = useState<number>(0);
  const swiperRef = useRef<any | null>(null);

  const deleteUserDataOnce = (): void => {
    const localStorageKey = "a9f1e7d5f_uniqueAction_3b2z";

    const hasRunBefore = localStorage.getItem(localStorageKey);

    if (hasRunBefore) {
      return;
    }

    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }

    localStorage.setItem(localStorageKey, "true");
  };

  // const [
  //   {
  //     data: banners,
  //     isLoading: bannerloader,
  //     error: bannerError,
  //     responseTime,
  //   },
  //   getBanners,
  // ] = UseApi({
  //   service: Banners,
  // });

  const handleSlideChange = (slideIndex: number) => {
    setCurrentImage(slideIndex);
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  useEffect(() => {
    deleteUserDataOnce();
  }, []);

  const totalSlides = banners?.length || 4;
  const slidesNeeded = totalSlides % 2 === 0 ? totalSlides : totalSlides + 1;

  return (
    <Box
      w="full"
      maxW={{ base: "100%" }}
      mx="auto"
      overflow="hidden"
      pos="relative"
      px={{ base: 4, md: 0 }}
      mt={{ base: -12, md: 0 }}
    >
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
            slidesPerGroup: 1,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerGroup: 1,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 24,
            slidesPerGroup: 2,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 24,
            slidesPerGroup: 2,
          },
          1440: {
            slidesPerView: 2,
            spaceBetween: 24,
            slidesPerGroup: 2,
          },
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          stopOnLastSlide: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          const slideIndex =
            window.innerWidth >= 768
              ? Math.floor(swiper.realIndex / 2) * 2
              : swiper.realIndex;
          setCurrentImage(slideIndex);
        }}
        modules={[Autoplay]}
      >
        {/* {bannerloader
          ? Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton
                  height={{
                    base: "250px",
                    sm: "250px",
                    md: "150px",
                    lg: "250px",
                    xl: "270px",
                    "2xl": "350px",
                  }}
                  borderRadius="lg"
                  startColor="#E4E7EC"
                  endColor="#E4E7EC"
                  colorScheme="#F2F4F7"
                  w="full"
                />
              </SwiperSlide>
            ))
          :  */}
        {Array.from({ length: slidesNeeded }).map((_, index) => (
          <SwiperSlide key={index}>
            {index < banners?.length ? (
              <Box
                w="full"
                position="relative"
                height={{
                  base: "250px",
                  sm: "250px",
                  md: "150px",
                  lg: "250px",
                  xl: "290px",
                  "2xl": "390px",
                }}
                backgroundImage={`url(${banners?.[index]?.img})`}
                backgroundSize="cover"
                backgroundPosition="center"
                borderRadius="lg"
              />
            ) : (
              <Box
                w="full"
                position="relative"
                height={{
                  base: "250px",
                  sm: "250px",
                  md: "150px",
                  lg: "250px",
                  xl: "270px",
                  "2xl": "350px",
                }}
                backgroundImage={`url(${banners?.[0]?.img})`}
                backgroundSize="cover"
                backgroundPosition="center"
                borderRadius="lg"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <HStack
        justify="center"
        mt={4}
        spacing={2}
        display={{ base: "none", md: "flex" }}
      >
        {Array.from({ length: Math.ceil(slidesNeeded / 2) }, (_, index) => (
          <Box
            key={index}
            w={{ base: "24px", md: "32px" }}
            h="2px"
            bg={Math.floor(currentImage / 2) === index ? "#000" : "gray.300"}
            cursor="pointer"
            transition="background-color 0.3s"
            onClick={() => handleSlideChange(index * 2)}
          />
        ))}
      </HStack>

      {/* Mobile pagination */}
      <HStack
        justify="center"
        mt={4}
        spacing={2}
        display={{ base: "flex", md: "none" }}
      >
        {Array.from({ length: slidesNeeded }, (_, index) => (
          <Box
            key={index}
            w={{ base: "24px", md: "32px" }}
            h="2px"
            bg={currentImage === index ? "#000" : "gray.300"}
            cursor="pointer"
            transition="backgroundColor 0.3s"
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </HStack>
    </Box>
  );
}
