import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { V3Provider } from "@/components/V3Provider";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ลุยดิวะ | CrossFit Open Thailand 2026",
  description: "วิเคราะห์ผลการแข่งขัน CrossFit Open Thailand 2026 — สถิติ · Rankings · Percentiles · Affiliates 604 นักกีฬา 24 Boxes 7 จังหวัด",
  keywords: ["CrossFit", "CrossFit Open 2026", "Thailand", "CrossFit Thailand", "ลุยดิวะ", "สถิติ CrossFit", "26.1", "26.2", "26.3"],
  authors: [{ name: "ลุยดิวะ" }],
  openGraph: {
    title: "ลุยดิวะ | CrossFit Open Thailand 2026",
    description: "วิเคราะห์ผลการแข่งขัน CrossFit Open Thailand 2026 — 604 นักกีฬา · 24 Affiliates · 7 จังหวัด",
    url: "https://three-pearl-56.vercel.app",
    siteName: "ลุยดิวะ",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ลุยดิวะ | CrossFit Open Thailand 2026",
    description: "วิเคราะห์ผลการแข่งขัน CrossFit Open Thailand 2026 — 604 นักกีฬา · 24 Affiliates",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${sarabun.variable} font-sans antialiased min-h-screen`}>
        <V3Provider>
          <Navbar />
          {children}
        </V3Provider>
      </body>
    </html>
  );
}
