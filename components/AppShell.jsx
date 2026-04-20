"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FloatingCompareBar from "@/components/FloatingCompareBar";
import { ShopContextProvider } from "@/context/show-context";
import { CompareContextProvider } from "@/context/compare-context";

const AUTH_ROUTES = new Set(["/users/login", "/users/signup"]);

export default function AppShell({ children }) {
  const pathname = usePathname();
  const shouldHideChrome = AUTH_ROUTES.has(pathname);

  return (
    <ShopContextProvider>
      <CompareContextProvider>
        {!shouldHideChrome && <NavBar />}
        {children}
        {!shouldHideChrome && (
          <>
            <FloatingActions />
            <FloatingCompareBar />
          </>
        )}
        <Footer />
      </CompareContextProvider>
    </ShopContextProvider>
  );
}
