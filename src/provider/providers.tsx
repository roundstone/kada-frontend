"use client";

import { Suspense } from "react";
import { SocketProvider } from "@/provider/socket";
import ReactQueryProvider from "@/provider/react-query";
import PreviousPathnameProvider from "@/provider/previous-pathname";
import LoaderProvider from "@/provider/loader";
import { Toaster } from "@/components/common/toast";
import GlobalModal from "@/components/modal";
import GlobalDrawer from "@/components/drawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SocketProvider>
      <ReactQueryProvider>
        <PreviousPathnameProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <LoaderProvider>
              <Toaster />
              {children}
              <GlobalModal />
              <GlobalDrawer />
            </LoaderProvider>
          </Suspense>
        </PreviousPathnameProvider>
      </ReactQueryProvider>
    </SocketProvider>
  );
}
