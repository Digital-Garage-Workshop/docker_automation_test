"use client";

import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";
import { SkeletonTheme } from "react-loading-skeleton";
import NextNProgress from "nextjs-progressbar";
import store, { persistor } from "@/redux/store";
import theme from "@/theme";
import SessionProvider from "../app/sessionProvider";
import GoogleMapsProvider from "./GoogleMapsProvider";
import "typeface-manrope";
import "swiper/swiper-bundle.css";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "@/app/loading";
import Head from "next/head";
import { useEffect } from "react";

interface ProvidersProps {
  session: any;
  children: React.ReactNode;
}

export default function Providers({ session, children }: ProvidersProps) {
  useEffect(() => {
    import("@userback/widget")
      .then((Userback) => {
        Userback.default("A-BgfhZDcZWDY3QWgUkGxIrTmYP").then((ub: any) => {
          ub.identify("123456", {
            name: "someone",
            email: "someone@example.com",
          });
        });
      })
      .catch((error) => {
        console.error("Failed to load Userback widget:", error);
      });
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const warningStyle = {
        fontSize: "30px",
        fontWeight: "bold",
        color: "red",
        backgroundColor: "yellow",
        padding: "10px",
        border: "2px solid red",
      };

      const styleString = Object.entries(warningStyle)
        .map(
          ([key, value]) =>
            `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`
        )
        .join("; ");
      const message =
        "Stop!\n\nThis is a browser feature intended for developers. If someone told you to copy and paste something here, it's a scam and may give them access to your account.";

      console.log("%c" + message, styleString);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Дижитал гараж</title>
        <link rel="icon" href="/logo_vertical.png" />
        <meta
          name="title"
          content="Дижитал гараж Авто сэлбэгийн онлайн платформ"
        />
        <meta
          name="description"
          content="Дижитал Гараж нь зөвхөн таны автомашинд тохирсон сэлбэг хэрэгсэл болон засвар үйлчилгээг цогцоор нь санал болгох, мэдээ мэдээллээр хангах авто үйлчилгээний нэгдсэн платформ."
        />
        <meta charSet="UTF-8" />
        <meta property="og:title" content="Дижитал гараж" />
        <meta
          property="og:description"
          content="Дижитал Гараж нь зөвхөн таны автомашинд тохирсон сэлбэг хэрэгсэл болон засвар үйлчилгээг цогцоор нь санал болгох, мэдээ мэдээллээр хангах авто үйлчилгээний нэгдсэн платформ."
        />
        <meta property="og:image" content="/logo_vertical.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://garage.mn/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          as="style"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />

      <ChakraProvider theme={theme}>
        <SkeletonTheme baseColor="#E4E7EC" highlightColor="#F2F4F7">
          <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <SessionProvider>
                <GoogleMapsProvider>{children}</GoogleMapsProvider>
              </SessionProvider>
            </PersistGate>
          </Provider>
        </SkeletonTheme>
      </ChakraProvider>
    </>
  );
}
