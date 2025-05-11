import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Theme/providers";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Animelib",
  description: "Webist Kumpulan Informasi Detail Anime Terbaru Hingga Terlama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quicksand.className} antialiased `}>
        <Providers>
          <Navbar />
          <main className="w-full flex justify-center ">
            <div className="lg:w-16/20 md:w-17/20 sm:w-18/20 w-19/20">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
