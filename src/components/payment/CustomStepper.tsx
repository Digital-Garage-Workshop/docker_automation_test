"use client";
import { useAppSelector } from "@/hooks/hooks";
import { GarageLogo } from "@/icons";
import { HStack, VStack, Text, Stack, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useCustomToast } from "@/hooks/useCustomToast";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { number } from "yup";
type Step = {
  label: string;
  number: number;

  link: string;
};

const deliverySteps: Step[] = [
  { label: "Сагс", number: 1, link: "/payment" },
  { label: "Нэвтрэх", number: 2, link: "/payment/login" },
  { label: "Хаяг", number: 3, link: "/payment/address" },
  { label: "Баталгаажуулах", number: 4, link: "/payment/checkout" },
  { label: "Төлбөр", number: 5, link: "/payment/pay" },
];

const pickupSteps: Step[] = [
  { label: "Сагс", number: 1, link: "/payment" },
  { label: "Нэвтрэх", number: 2, link: "/payment/login" },
  { label: "Баталгаажуулах", number: 3, link: "/payment/checkout" },
  { label: "Төлбөр", number: 4, link: "/payment/pay" },
];

type CustomStepperProps = {};

export const CustomStepper = (props: CustomStepperProps) => {
  const shippingMethod = useAppSelector(
    (state) => state.shippingMethod.shippingMethod
  );
  const showToast = useCustomToast();
  const router = useRouter();
  const pathname = usePathname();

  // Determine steps based on shipping method
  const { data: session } = useSession();
  let steps =
    shippingMethod === "delivery" || shippingMethod === null
      ? deliverySteps
      : pickupSteps;

  if (session) {
    steps = steps.filter((step) => step.label !== "Нэвтрэх");
  }

  // Find the index of the current active step
  const activeIndex = steps.findIndex((step) => step.link === pathname);

  return (
    <Stack
      pos="relative"
      top="0px"
      w="85%"
      px={6}
      justify="space-between"
      flexDirection={{ base: "column", md: "row" }}
      pb={4}
    >
      <Box display={{ base: "none", md: "flex" }}>
        <Link href="/" style={{ alignSelf: "center" }}>
          <GarageLogo />
        </Link>
      </Box>
      <HStack
        justify="flex-start"
        align="flex-start"
        gap={0}
        pos="relative"
        top="0px"
        justifySelf={"center"}
        alignSelf="center"
      >
        {steps.map((item, index) => (
          <HStack
            key={index}
            align="center"
            gap={0}
            h="64px"
            onClick={() =>
              index <= activeIndex
                ? router.push(item.link)
                : showToast({
                    title: "Түр хүлээгээрэй",
                    type: "warning",
                    description: "Та өмнөх алхам руу шилжих боломжтой",
                  })
            }
          >
            <VStack align="center" justify="center" pos="relative">
              <Stack
                cursor="pointer"
                w={{ md: "32px" }}
                h="32px"
                align="center"
                justify="center"
                borderRadius="100%"
                // Apply active color for the current and all previous steps
                bg={index <= activeIndex ? "#F75B00" : "#EDEDED"}
                color={index <= activeIndex ? "white" : "#717171"}
                p="4px 12px"
              >
                <Text fontWeight="bold">
                  {item.number === 1
                    ? item.number
                    : session
                      ? item.number - 1
                      : item.number}
                </Text>
              </Stack>
              <Text
                display={{
                  base: index == activeIndex ? "flex" : "none",
                  md: "block",
                }}
                fontSize={{ base: 12, md: 14 }}
                fontWeight={index == activeIndex ? "bold" : "normal"}
                color={index == activeIndex ? "#F75B00" : "#717171"}
                pos="absolute"
                top="42px"
                sx={{ whiteSpace: "nowrap" }}
              >
                {item.label}
              </Text>
            </VStack>
            {index < steps.length - 1 && (
              <Stack
                // Apply active border color for the current and all previous steps
                borderColor={index < activeIndex ? "#F75B00" : "#EDEDED"}
                borderWidth="1px"
                w={{ sm: "42px", base: "32px", md: "104px" }}
                m={0}
                p={0}
              />
            )}
          </HStack>
        ))}
      </HStack>
      <Stack w="10%"></Stack>
    </Stack>
  );
};
