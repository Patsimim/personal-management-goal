"use client";

import { MessageCircle, Bell } from "lucide-react";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className='bg-white border-b border-gray-200 px-6 py-4'>
      <div className='flex items-center justify-between'>
        {/* Left side - User profile */}
        <div className='flex items-center gap-4'>
          <div className='w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center'>
            <span className='text-white text-lg font-semibold'>YN</span>
          </div>
          <span className='text-gray-700 font-medium'>Your Name</span>
        </div>

        {/* Center - Action buttons */}
        <div className='flex items-center gap-3'>
          <button className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors'>
            Add goal
          </button>
          <button className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors'>
            Add expense
          </button>
          <button className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors'>
            Log workout
          </button>
        </div>

        {/* Right side - Date and icons */}
        <div className='flex items-center gap-4'>
          <span className='text-gray-600 text-sm'>{currentDate}</span>
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <MessageCircle className='w-5 h-5 text-gray-600' />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <Bell className='w-5 h-5 text-gray-600' />
          </button>
        </div>
      </div>
    </header>
  );
}
