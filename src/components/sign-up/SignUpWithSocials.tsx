import { VStack, Stack, Text, Button, color } from "@chakra-ui/react";
import { FacebookIcon, GoogleIcon } from "@/icons";
import { signIn } from "next-auth/react";

export const SignUpWithSocials = (props: { isLogIn: number }) => {
  const { isLogIn } = props;
  return (
    <VStack sx={{ display: isLogIn === 3 ? "none" : "block" }} w="100%">
      <Stack width={"100%"} gap={"16px"}>
        <Button
          leftIcon={<GoogleIcon />}
          variant={"outline"}
          size={"lg"}
          lineHeight={6}
          onClick={() => signIn("google")}
          border="1px solid #D0D5DD"
          color="#1E1E1E"
          fontSize={14}
          bg="transparent"
          _hover={{ bg: "#F9FAFB" }}
        >
          Google-р нэвтрэх
        </Button>
        {/* <Button
          leftIcon={<FacebookIcon />}
          variant={"outline"}
          size={"lg"}
          lineHeight={6}
          onClick={() => signIn("facebook")}
          border="1px solid #D0D5DD"
          color="#1E1E1E"
        >
          Facebook-р нэвтрэх
        </Button> */}
      </Stack>
    </VStack>
  );
};
