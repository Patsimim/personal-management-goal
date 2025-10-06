import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";
import RightPanel from "@/components/layout/RightPanel";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='flex flex-col h-screen overflow-hidden'>
          <Header />
          <div className='flex flex-1 overflow-hidden'>
            <Sidebar />
            <main className='flex-1 overflow-y-auto bg-gray-50 p-6'>
              {children}
            </main>
            <RightPanel />
          </div>
        </div>
      </body>
    </html>
  );
}
