"use client";
import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const randomTexts = [
  "Та сэлбэгээ шуурхай хүрэлт (2-5) цаг энгийн хүргэлт (24-48) цагийн дотор  хүргүүлэн авах боломжтой",
  "Та сэлбэг худалдан авахдаа Store pay болон Pocket zero ашиглан хуваан төлөх боломжтой",
  "Бид танд чанарын баталгаатай сэлбэгээр үйлчлэх болно",
  "Та сэлбэгээ худалдан авалт хийж манайхтай гэрээт засварын газруудаар үйлчлүүлэх боломжтой",
  "Digital Garage app-г татаж сэлбэгийн хямдрал урамшууллын мэдээллийг алгасахгүй аваарай",
];

export default function Loading() {
  const [randomText, setRandomText] = useState(randomTexts[0]);

  useEffect(() => {
    setRandomText(randomTexts[Math.floor(Math.random() * randomTexts.length)]);
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      bg="gray.50"
      width="100vw"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flex={1}
    >
      <Image
        alt="loader"
        src="/loading.gif"
        width={{ base: "100px", md: 60 }}
        opacity={1}
      />
      <Text
        maxW={500}
        textAlign="center"
        fontSize={{ base: 14, md: 16 }}
        fontWeight={600}
      >
        {randomText}
      </Text>
    </Flex>
  );
}
