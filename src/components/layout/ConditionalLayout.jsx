"use client";

import { usePathname } from "next/navigation";
import RightPanel from "@/components/layout/RightPanel";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Check if we're on the journal page
  const isJournalPage =
    pathname === "/journal" || pathname.startsWith("/journal/");

  // Check if we're on the home page (where Grid is shown)
  const isHomePage = pathname === "/";

  if (isJournalPage) {
    // Full width for journal page, no padding
    return (
      <main className='flex-1 overflow-y-auto bg-gray-50'>{children}</main>
    );
  }

  // Default layout with RightPanel
  return (
    <>
      <main className='flex-1 overflow-y-auto bg-gray-50 p-6'>{children}</main>
      <RightPanel />
    </>
  );
}
