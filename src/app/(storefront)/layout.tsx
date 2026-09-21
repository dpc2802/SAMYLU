import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import MinimalCookieBanner from "@/components/layout/MinimalCookieBanner";
import Footer from "@/components/layout/Footer";
import SplashLoader from "@/components/ui/SplashLoader";
import PageTransition from "@/components/ui/PageTransition";

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SplashLoader />
      <Header />
      <main className="min-h-screen">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <MinimalCookieBanner />
    </>
  );
}
