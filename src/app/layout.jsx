import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

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
      <body className={`${quicksand.className} antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-green-500/20 selection:text-green-700 dark:selection:text-green-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Universal Background Layer */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Mesh Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-500/10 blur-[120px] dark:bg-green-500/5 opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/5 opacity-60"></div>

            {/* Dot Pattern Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] dark:bg-[radial-gradient(#18181b_1px,transparent_1px)] opacity-70"></div>

            {/* Bottom Fade */}
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent"></div>
          </div>

          <Navbar />
          <main className="min-h-screen flex justify-center pt-24">
            <div className="lg:w-16/20 md:w-17/20 sm:w-18/20 w-full px-1 relative z-0">{children}</div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
