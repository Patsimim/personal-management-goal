"use client";
import React, { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import useJournalStore from "@/stores/journalStore";

export default function JournalEntryModal() {
  const {
    isModalOpen,
    modalMode,
    formData,
    updateFormData,
    closeModal,
    saveEntry,
    isLoading,
  } = useJournalStore();

  // Local state for tag input string
  const [tagInput, setTagInput] = useState("");

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleString("en-US", { month: "long" });
  const currentYear = today.getFullYear();

  // Sync tag input with formData when modal opens
  useEffect(() => {
    if (isModalOpen && Array.isArray(formData.tags)) {
      setTagInput(formData.tags.join(", "));
    }
  }, [isModalOpen, formData.tags]);

  if (!isModalOpen) return null;

  const moods = [
    { emoji: "😄", label: "Happy" },
    { emoji: "🙂", label: "Good" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "☹️", label: "Sad" },
    { emoji: "😢", label: "Crying" },
  ];
  const themes = ["bg-blue-100", "bg-pink-100", "bg-yellow-100"];

  const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();

  const handleSave = async () => {
    if (formData.title && formData.content) {
      const entryDate = new Date(
        currentYear,
        today.getMonth(),
        formData.selectedDate
      );

      // Convert tag input string to array before saving
      const tagsArray = tagInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

      const entryPayload = {
        title: formData.title,
        content: formData.content,
        tags: tagsArray,
        mood: formData.mood,
        entry_date: entryDate.toISOString(),
      };

      await saveEntry(entryPayload);
    }
  };

  const handleTagInputChange = (value) => {
    setTagInput(value);
  };

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <div className='bg-white w-[90vw] h-[65vh] max-w-[1000px] rounded-2xl shadow-lg p-8 relative flex gap-8'>
        {/* Close Button */}
        <button
          onClick={closeModal}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          <X size={24} />
        </button>

        {/* Left Section */}
        <div className='flex-1 flex flex-col'>
          <h2 className='text-2xl font-semibold mb-3 text-gray-700'>
            {modalMode === "edit" ? "Edit Entry" : "New Entry"}
          </h2>

          {/* Title Input */}
          <input
            type='text'
            placeholder='Title...'
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            className='w-full border border-gray-700 rounded-lg p-2 mb-3 text-gray-700 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />

          {/* Main Textarea */}
          <textarea
            placeholder='Start writing...'
            value={formData.content}
            onChange={(e) => updateFormData("content", e.target.value)}
            className='flex-1 p-3 border border-gray-700 rounded-lg text-gray-700 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none mb-3'
          />

          {/* Formatting Toolbar */}
          <div className='flex items-center gap-2 mb-3'>
            <button className='text-gray-700 px-2 py-1 border rounded hover:bg-blue-400 font-bold'>
              B
            </button>
            <button className='text-gray-700 px-2 py-1 border rounded hover:bg-blue-400 italic'>
              I
            </button>
            <button className='text-gray-700 px-2 py-1 border rounded hover:bg-blue-400'>
              ≡
            </button>
          </div>

          {/* Tag input */}
          <input
            type='text'
            placeholder='Tag name... (comma separated)'
            value={tagInput}
            onChange={(e) => handleTagInputChange(e.target.value)}
            className='w-full border border-gray-700 rounded-lg p-2 mb-3 text-gray-700 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!formData.title || !formData.content || isLoading}
            className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed'
          >
            {isLoading ? "Saving..." : modalMode === "edit" ? "Update" : "Save"}
          </button>
        </div>

        {/* Right Section */}
        <div className='w-[35%] flex flex-col gap-6'>
          {/* Calendar */}
          <div className='flex-shrink-0'>
            <div className='flex items-center gap-3 mb-3 py-2'>
              <Calendar className='w-6 h-6 text-gray-700' />
              <h3 className='font-semibold text-gray-800 text-lg'>
                {currentMonth} {currentYear}
              </h3>
            </div>
            <div className='grid grid-cols-7 gap-x-1 gap-y-3 text-[15px] mt-2'>
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div
                  key={i}
                  className='text-center font-medium text-gray-600 pb-1'
                >
                  {d}
                </div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => (
                <button
                  key={i}
                  onClick={() => updateFormData("selectedDate", i + 1)}
                  className={`py-2 rounded-lg text-center cursor-pointer hover:bg-blue-100 transition-all duration-200 ${
                    formData.selectedDate === i + 1
                      ? "bg-blue-500 text-white font-semibold shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Selector */}
          <div className='flex-shrink-0 py-3'>
            <h3 className='font-semibold mb-3 text-gray-700 text-lg'>Mood</h3>
            <div className='flex gap-4'>
              {moods.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => updateFormData("mood", m.label)}
                  className={`text-4xl transition-transform hover:scale-110 ${
                    formData.mood === m.label
                      ? "scale-125 opacity-100"
                      : "opacity-60 hover:opacity-80"
                  }`}
                  title={m.label}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Themes */}
          <div className='flex-shrink-0 py-3'>
            <h3 className='font-semibold mb-3 text-gray-700 text-lg'>Themes</h3>
            <div className='flex gap-4'>
              {themes.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => updateFormData("theme", color)}
                  className={`w-12 h-12 rounded-full cursor-pointer border-2 transition-transform hover:scale-110 ${
                    formData.theme === color
                      ? "border-blue-500 scale-110"
                      : "border-gray-300"
                  } ${color}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
