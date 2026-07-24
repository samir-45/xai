import ReduxProvider from "@/redux/provider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton/ScrollToTopButton";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sora = Sora({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Xai - Intelligence Workspace",
  description:
    "An intelligence workspace for teams that would rather decide than dashboard. Turn scattered signal into structured decisions with row-level evidence.",
  keywords: ["intelligence workspace", "AI analytics", "decision engine", "change point detection", "automated telemetry"],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Xai - Intelligence Workspace",
    description: "An intelligence workspace for teams that would rather decide than dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        suppressHydrationWarning={true}
        className={`${sora.variable} ${inter.variable} antialiased !bg-white`}
      >
        <SmoothScrollProvider>
          <ReduxProvider>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: "var(--font-sora), sans-serif",
                  colorPrimary: "#0BA8CC",
                  colorInfo: "#0BA8CC",
                  colorSuccess: "#3ECF8E",
                  colorWarning: "#FAAD14",
                  colorError: "#FF6B6B",

                  colorTextBase: "#1F1F1F",
                  colorBgBase: "#FFFFFF",
                  borderRadius: 8,
                  fontSize: 15,
                  lineHeight: 1.6,
                  controlHeight: 40,
                },
                components: {
                  Button: {
                    colorPrimary: "#0BA8CC",
                    colorPrimaryHover: "#0aa0bd",
                    colorPrimaryActive: "#088aa3",

                    colorSuccess: "#3ECF8E",
                    colorSuccessHover: "#36b87d",
                    colorSuccessActive: "#2fa36e",

                    colorWarning: "#FAAD14",
                    colorWarningHover: "#e89c0f",
                    colorWarningActive: "#c27e0d",

                    colorError: "#FF6B6B",
                    colorErrorHover: "#e95e5e",
                    colorErrorActive: "#c94d4d",
                  },
                },
              }}
            >
              <div className="min-h-screen grid grid-rows-[auto_1fr_auto] text-title max-w-[100vw] overflow-x-clip">
                {children}
              </div>
              <ScrollToTopButton />
            </ConfigProvider>
          </ReduxProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
