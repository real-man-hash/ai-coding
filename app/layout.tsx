import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI StudyMate Radar",
  description: "AI-powered learning gap analysis and study partner matching system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 百度统计代码 - 使用 Script 组件避免 hydration 错误 */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  var _hmt = _hmt || [];
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?a89966773af811bc99030e29eb670c55";
                  var s = document.getElementsByTagName("script")[0];
                  s.parentNode.insertBefore(hm, s);
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
