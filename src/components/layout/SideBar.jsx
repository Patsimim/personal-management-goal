"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DollarSign,
  Dumbbell,
  BookOpen,
  Heart,
  Target,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Finances", icon: DollarSign, path: "/finances" },
  { name: "Fitness", icon: Dumbbell, path: "/fitness" },
  { name: "Learning", icon: BookOpen, path: "/learning" },
  { name: "Wellbeing", icon: Heart, path: "/wellbeing" },
  { name: "Goals", icon: Target, path: "/goals" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='w-60 bg-white border-l border-gray-200 flex flex-col'>
      <nav className='flex-1 px-4 py-6 pt-8'>
        <ul className='space-y-2 w-full'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.path || pathname.startsWith(item.path + "/");

            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className='w-5 h-5' />
                  <span className='font-medium'>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
