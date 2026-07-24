import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xai - Intelligence Workspace",
  description: "An intelligence workspace for teams that would rather decide than dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen w-full bg-surface text-ink overflow-x-clip">
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}
