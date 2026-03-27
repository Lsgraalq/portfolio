import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import SmoothScrolling from '@/components/SmoothScrolling';
import Header from "@/components/Header";
import JellyCursor from "@/components/JellyCursor";

const slayFont = localFont({
  src: [
    {
      path: '../fonts/TAN_MEMORIES-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/TAN_MEMORIES-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
      variable: '--font-slay',
})

const regularFont = localFont({
  src: [
    {
      path: '../fonts/HelveticaNeueLTW0545Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeueLTW0555Roman.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeueLTW0585Heavy.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-regular',
})

export const metadata: Metadata = {
  title: "Portfolio",
  description: "personal website | Illia Merinets",
};



export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"

          className={`${slayFont.variable} ${regularFont.variable} h-full antialiased`}
      >

      <body className="font-slay min-h-full flex flex-col cursor-none">
      <SmoothScrolling>
      <JellyCursor />
      <Header></Header>
      {children}
      </SmoothScrolling>
      </body>
      </html>
  );
}