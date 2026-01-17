import type { Metadata } from "next";
import { inter, oxygen } from "./fonts";
import "./_styles/globals.css";
import { baseMetadata } from "./_templates/metadata";
import Providers from "@/provider/providers";

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${oxygen.variable} ${inter.variable} font-oxygen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
