import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import MinimalCookieBanner from "@/components/layout/MinimalCookieBanner";
import Footer from "@/components/layout/Footer";

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <MinimalCookieBanner />
    </>
  );
}
