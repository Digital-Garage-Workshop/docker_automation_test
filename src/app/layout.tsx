import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { MetadataProvider } from "@/providers/MetadataProvider";
import AuthProvider from "@/providers/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import "typeface-manrope";
import { Manrope } from "next/font/google";
import Registry from "./Registry";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: "Дижитал гараж Авто сэлбэгийн онлайн платформ",
  description:
    "Дижитал Гараж нь зөвхөн таны автомашинд тохирсон сэлбэг хэрэгсэл сэлбэг захиалга болон засвар үйлчилгээг цогцоор нь санал болгох, мэдээ мэдээллээр хангах авто үйлчилгээний нэгдсэн платформ.",
  icons: {
    icon: "/Home/Group.svg",
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
    shortcut: "/shortcut-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-icon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon-96x96.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
  // manifest: "/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Дижитал гараж",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Registry>
          <AuthProvider session={session}>
            {/* <SessionProvider session={session}> */}
            <MetadataProvider>{children}</MetadataProvider>
            {/* </SessionProvider> */}
          </AuthProvider>
        </Registry>
      </body>
    </html>
  );
}
