import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { site, siteUrl } from "@/content/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Effects } from "@/components/Effects";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.hero.ko,
  openGraph: { title: site.title, description: site.hero.ko, type: "website", locale: "ko_KR" },
};

/* Runs before paint so the page never flashes the wrong theme. The approved design is dark, so
   dark is the default regardless of the OS preference; only a stored choice switches to light.
   Everything is inside try/catch (private mode, blocked storage). */
const themeScript = `(function(){try{if(localStorage.getItem('theme')==='light'){document.documentElement.setAttribute('data-theme','light')}}catch(e){}})();`;

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html lang="ko" data-section="hero" className={poppins.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.min.css" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="ambient" aria-hidden="true">
          <div className="blob blob-a" />
          <div className="blob blob-b" />
        </div>
        <div className="progress" aria-hidden="true">
          <span id="progressBar" />
        </div>
        <Nav />
        {children}
        <Footer />
        {modal}
        <Effects />
      </body>
    </html>
  );
}
