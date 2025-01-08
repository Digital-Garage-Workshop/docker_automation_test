"use client";
import {
  VStack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { RateProduct } from "./RateProduct";
import { useEffect, useState } from "react";
import { UseApi } from "@/hooks/useApi";
import { AddComment } from "@/services";
import { useCustomToast } from "@/hooks/useCustomToast";
import { GetComments } from "@/services/product/getComments";
import { useSession } from "next-auth/react";
type Props = {
  articleId: number;
  setComments: (comments: any) => void;
  title: string;
};
export const Review = (props: Props) => {
  const { articleId, setComments, title } = props;
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: AddComment,
    useAuth: true,
  });
  const session = useSession();

  const [
    { data: comments, isLoading: commentsLoader, error: commentsError },
    fetchComments,
  ] = UseApi({
    service: GetComments,
  });

  const showToast = useCustomToast();

  const makePostRequest = async () => {
    if (session) {
      try {
        await fetch({
          articleid: articleId.toString(),
          star: star == null ? "" : star.toString(),
          comment: comment,
        });
      } catch (err) {
        showToast({
          type: "error",
          title: "Алдаа гарлаа",
          description: "Дараа дахин оролдоно уу",
        });
      }
    } else {
      showToast({
        type: "warning",
        title: "Нэвтэрнэ үү",
        description: "Та нэвтэрч орсны дараа дахин оролдоно уу.",
      });
    }
  };

  useEffect(() => {
    if (data) {
      fetchComments({ articleid: articleId });
      showToast({
        type: "success",
        title: "Амжилттай",
        description: "Таны сэтгэгдэл амжилттай бүртгэгдлээ",
      });

      setStar(0);
      setComment("");
      setComments((prev: any) => [...prev, data]);
    }
  }, [data]);

  useEffect(() => {
    setComments(comments);
  }, [comments]);

  useEffect(() => {
    if (error) {
      showToast({
        type: "error",
        title: "Алдаа гарлаа",
        description: "Дараа дахин оролдоно уу",
      });
    }
  }, [error]);

  return (
    <Stack
      gap={10}
      align="flex-start"
      flexDirection={{
        base: "column",
        sm: "column",
        md: "column",
        lg: "row",
        xl: "row",
      }}
    >
      <VStack
        gap={2}
        align="flex-start"
        justify="flex-start"
        // flex={1}
        w={{ base: "full", sm: "full", md: "full", lg: "50%", xl: "50%" }}
      >
        <Text fontSize={24} fontWeight={700}>
          {title} сэлбэгийн талаар сэтгэгдэл үлдээх.
        </Text>
        <Text>
          Та сэлбэгийн талаар өөрийн сэтгэгдлээ хуваалцсанаар бид сэлбэгийн
          чанараа улам сайжруулах болно.
        </Text>
      </VStack>
      <VStack
        gap={4}
        // flex="1"
        align="flex-start"
        w={{ base: "full", sm: "full", md: "full", lg: "50%", xl: "50%" }}
      >
        <RateProduct
          rank={star}
          fill="#F75B00"
          w="56px"
          h="56px"
          onRate={(newRating) => setStar(newRating)}
        />
        <FormControl id="notes" sx={{ gap: "6px" }}>
          <FormLabel>Сэтгэгдэл үлдээх</FormLabel>
          <Textarea
            placeholder="Сэтгэгдэл үлдээх"
            value={comment}
            sx={{ height: "152px" }}
            border="1px solid var(--Gray-300, #D0D5DD)"
            background="var(--Primary-White, #FFF)"
            boxShadow="0px 1px 2px 0px rgba(10, 13, 18, 0.05)"
            _hover={{
              border: "1px solid var(--Gray-300, #D0D5DD)",
              background: "var(--Gray-50, #F9FAFB)",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            }}
            _focus={{
              border: "1px solid var(--Primary-Brand, #F75B00)",
              background: "var(--Primary-White, #FFF)",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.1)",
              outline: "none",
            }}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="orange"
          w="100%"
          borderRadius={8}
          onClick={makePostRequest}
          mt={2}
          isLoading={isLoading}
          disabled={!comment || !star}
        >
          Илгээх
        </Button>
      </VStack>
    </Stack>
  );
};
