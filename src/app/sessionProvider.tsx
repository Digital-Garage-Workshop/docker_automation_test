import { Header } from "@/components/header/Header";
import { Stack } from "@chakra-ui/react";
import Footer from "@/components/Footer";
import FooterMobile from "@/components/FooterMobile";
import { ScrollProvider } from "@/providers/ScrollContext";

type Props = {
  children: React.ReactNode;
};

export default function SessionProvider({ children }: Props) {
  return (
    // <Provider session={session}>
    <ScrollProvider>
      <Header />
      <Stack
        pt={{ base: "56px", md: "106px" }}
        bg={{ base: "#F1F2F3", md: "white" }}
        pos={"relative"}
        mt={{ base: -8, md: 0 }}
      >
        {children}
      </Stack>
      {/* </div> */}
      <div className="mt-auto">
        <Footer />
        <FooterMobile />
      </div>
    </ScrollProvider>
    // </Provider>
  );
}
