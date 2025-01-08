"use client";
import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { HeaderTop } from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
import { HeaderTopMobile } from "./HeaderTopMobile";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { UseApi } from "@/hooks/useApi";
import { HeadBanners } from "@/services/banners/headBanner";

const useScrollHeader = (threshold = 300, scrollUpThreshold = 50) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);
        const isScrollingUp = currentScrollY < lastScrollY;

        if (currentScrollY > threshold) {
          if (!isScrollingUp) {
            setIsVisible(false);
            setScrollDirection("down");
          } else if (
            scrollDifference > scrollUpThreshold ||
            scrollDirection === "up"
          ) {
            setIsVisible(true);
            setScrollDirection("up");
          }
        } else {
          setIsVisible(true);
          setScrollDirection("up");
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrollDirection, threshold, scrollUpThreshold]);

  return isVisible;
};

export const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const isVisible = useScrollHeader();

  const [{ data: headBanner, isLoading }, categoryFetch] = UseApi({
    service: HeadBanners,
  });

  useEffect(() => {
    categoryFetch();
  }, []);

  const Overlay = () => (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100vw"
      height="500vh"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex={10}
      onClick={() => setIsExpanded(false)}
    />
  );

  if (pathname?.toString().includes("payment")) {
    return <HeaderTopMobile />;
  }

  return (
    <>
      {isExpanded && <Overlay />}
      <Stack
        width={{ base: "100%", md: "100vw" }}
        bg="#fff"
        pos="fixed"
        zIndex={100}
        gap={0}
        transform={isVisible ? "translateY(0)" : "translateY(-100%)"}
        transition="transform 0.3s ease-in-out"
        boxShadow="0px 0px 24px 0px rgba(0, 0, 0, 0.05)"
        top={0}
      >
        <Stack w="100%" bg="#0B192C" p={2} align="center">
          {isLoading ? (
            <Stack h={4} w={4} />
          ) : (
            <Text
              color="white"
              fontWeight="bold"
              textAlign="center"
              fontSize={{ base: "11", md: "sm" }}
            >
              {headBanner?.[0]?.content ?? ""}
            </Text>
          )}
        </Stack>
        <Container maxWidth={{ base: "100%", lg: "83%" }} gap={0}>
          <HeaderTop setIsExpanded={setIsExpanded} />
          <HeaderTopMobile />
          <HeaderBottom isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </Container>
      </Stack>
    </>
  );
};
