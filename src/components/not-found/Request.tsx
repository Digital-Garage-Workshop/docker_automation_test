import {
  VStack,
  HStack,
  Text,
  Stack,
  Button,
  FormControl,
  Input,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import {FilledInfo} from "@/icons";

export const Request = () => {
  return (
    <Stack
      gap="24px"
      w="85%"
      py="40px"
      align="flex-start"
      justify="flex-start"
      flexDirection={{
        base: "column",
        sm: "column",
        md: "column",
        lg: "row",
        xl: "row",
      }}
    >
      <VStack
        gap="24px"
        w={{base: "100%", sm: "100%", md: "100%", lg: "50%", xl: "50%"}}
        align="flex-start"
      >
        <Text fontWeight={700} fontSize={28} maxWidth="552px">
          BMW 1 Cabrio (E88) 118 i (105 кВт / 143 PS) 0 илэрц олдлоо
        </Text>
        <HStack w="100%">
          <FilledInfo />
          <Text maxWidth="426px">
            Сэлбэг олдохгүй байна уу? Манай каталогийг шалгах эсвэл бидэнд
            лавлагаа илгээнэ үү.
          </Text>
        </HStack>
      </VStack>
      <Stack
        w={{base: "full", sm: "full", md: "full", lg: "1px", xl: "1px"}}
        h={{base: "1px", sm: "1px", md: "1px", lg: "454px", xl: "454px"}}
        bg="#EDEDED"
      />
      <VStack
        gap="16px"
        w={{base: "100%", sm: "100%", md: "100%", lg: "50%", xl: "50%"}}
      >
        <FormControl w="100%">
          <VStack align="start" gap="6px">
            <FormLabel fontSize={14} fontWeight={600} m={0.5}>
              Улсын дугаар
            </FormLabel>
            <Input
              p="10px 14px"
              name="email"
              variant={"outline"}
              borderRadius="8px"
              placeholder="E-Mail"
              borderColor={"#D0D5DD"}
              focusBorderColor="#F75B00"
              w="100%"
            />
          </VStack>
        </FormControl>
        <FormControl w="100%" gap="6px">
          <VStack align="start" gap="6px">
            <FormLabel fontSize={14} fontWeight={600} m={0.5}>
              Утасны дугаар
            </FormLabel>
            <Input
              p="10px 14px"
              name="email"
              variant={"outline"}
              borderRadius="8px"
              placeholder="VIN"
              borderColor={"#D0D5DD"}
              focusBorderColor="#F75B00"
              w="100%"
            />
          </VStack>
        </FormControl>
        <FormControl w="100%" gap="6px">
          <VStack align="start" gap="6px">
            <FormLabel fontSize={14} fontWeight={600} m={0.5}>
              Сэлбэгийн нэр
            </FormLabel>
            <Input
              p="10px 14px"
              name="email"
              variant={"outline"}
              borderRadius="8px"
              placeholder="VIN"
              borderColor={"#D0D5DD"}
              focusBorderColor="#F75B00"
              w="100%"
            />
          </VStack>
        </FormControl>
        <FormControl w="100%" gap="6px">
          <VStack align="start" gap="6px">
            <FormLabel fontSize={14} fontWeight={600} m={0.5}>
              Нэмэлт мэдээлэл
            </FormLabel>
            <Textarea
              p="10px 14px"
              name="email"
              variant={"outline"}
              borderRadius="8px"
              placeholder="text"
              borderColor={"#D0D5DD"}
              focusBorderColor="#F75B00"
              w="100%"
              h="94px"
            />
          </VStack>
        </FormControl>
        <Button borderRadius="8px" mt="8px">
          Submit
        </Button>
      </VStack>
    </Stack>
  );
};
