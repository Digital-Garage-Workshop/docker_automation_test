// components/SearchComponent.tsx

import {
  VStack,
  HStack,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Divider,
  InputGroup,
} from "@chakra-ui/react";
import {ChangeEvent, FormEvent, useState} from "react";

interface FormValues {
  email: string;
  vin: string;
  articleNumber: string;
}

const PartNotFound: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    vin: "",
    articleNumber: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormValues((prevValues) => ({...prevValues, [name]: value}));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <HStack spacing={10} w="100%" bg="white" p={8} justifyContent={"center"}>
      {/* Left Section */}
      <HStack
        w="85%"
        gap="32px"
        justifyContent="space-between"
        alignItems="center"
        alignSelf={"center"}
      >
        <VStack
          justifyContent="space-between"
          w="50%"
          align="flex-start"
          spacing={12}
        >
          <Text fontSize="2xl" fontWeight="bold">
            0 илэрц олдлоо
          </Text>
          <Button colorScheme="orange" size="lg">
            Машинаа хайх
          </Button>
          <Text color="orange.500" cursor="pointer">
            Бүх машины брэндийн үр дүнг харуулах
          </Text>
          <HStack alignItems="center">
            <Text>Сэлбэг олдохгүй байна уу? Манай каталоги...</Text>
          </HStack>
        </VStack>
        <Divider borderColor="#EDEDED" orientation="vertical" h={"300px"} />

        {/* Right Section */}
        <VStack
          as="form"
          onSubmit={handleSubmit}
          w="50%"
          spacing={4}
          p={8}
          borderRadius="md"
        >
          <FormControl isRequired>
            <FormLabel fontSize={14}>
              Имэйл хаягаа оруулна уу, ингэснээр бид үүнийг авах үед танд
              мэдэгдэх болно.
            </FormLabel>
            <Input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize={14}>
              Та мөн тээврийн хэрэгслийнхээ VIN буюу дугаарыг оруулж, энэ нь
              үнэхээр танд хэрэгтэй эд анги мөн эсэхийг баталгаажуулах
              боломжтой.
            </FormLabel>
            <HStack>
              <InputGroup>
                <Input
                  type="text"
                  name="vin"
                  value={formValues.vin}
                  onChange={handleInputChange}
                  placeholder="Enter VIN number"
                />
              </InputGroup>
              <Input
                type="text"
                name="articleNumber"
                value={formValues.articleNumber}
                onChange={handleInputChange}
                placeholder="Enter article number"
              />
            </HStack>
          </FormControl>

          <Button type="submit" colorScheme="orange" size="lg" w="100%">
            Submit
          </Button>
        </VStack>
      </HStack>
    </HStack>
  );
};

export default PartNotFound;
