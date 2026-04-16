"use client";

import "./globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FloatingCompareBar from "@/components/FloatingCompareBar";
import { ShopContextProvider } from "@/context/show-context";
import { CompareContextProvider } from "@/context/compare-context";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathName = usePathname();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ShopContextProvider>
          <CompareContextProvider>
            {pathName !== "/users/login" && pathName !== "/users/signup" && (
              <NavBar />
            )}
            {children}
            {pathName !== "/users/login" && pathName !== "/users/signup" && (
              <>
                <FloatingActions />
                <FloatingCompareBar />
              </>
            )}
            <Footer />
          </CompareContextProvider>
        </ShopContextProvider>
      </body>
    </html>
  );
}
