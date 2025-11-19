"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Calendar,
  Trash2,
  Tag,
  Smile,
  Filter,
  Edit,
} from "lucide-react";
import useJournalStore from "@/stores/journalStore";
import JournalEntryModal from "./JournalEntryModal";

export default function JournalApp() {
  const { entries, isLoading, error, fetchEntries, deleteEntry, openModal } =
    useJournalStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    tag: "",
    mood: "",
    dateFrom: "",
    dateTo: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const allTags = [...new Set(entries.flatMap((entry) => entry.tags || []))];
  const allMoods = [
    ...new Set(entries.map((entry) => entry.mood).filter((m) => m)),
  ];

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(entry.entry_date)
        .toLocaleDateString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesTag =
      !filters.tag || (entry.tags && entry.tags.includes(filters.tag));
    const matchesMood = !filters.mood || entry.mood === filters.mood;

    let matchesDateRange = true;
    if (filters.dateFrom || filters.dateTo) {
      const entryDate = new Date(entry.entry_date);
      if (filters.dateFrom) {
        matchesDateRange =
          matchesDateRange && entryDate >= new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        matchesDateRange =
          matchesDateRange && entryDate <= new Date(filters.dateTo);
      }
    }

    return matchesSearch && matchesTag && matchesMood && matchesDateRange;
  });

  const handleDeleteEntry = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await deleteEntry(id);
    }
  };

  const clearFilters = () => {
    setFilters({
      tag: "",
      mood: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const activeFiltersCount = Object.values(filters).filter((v) => v).length;

  if (isLoading && entries.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-xl text-gray-600'>Loading entries...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <h1 className='text-5xl font-bold text-gray-900 mb-8'>My Diary</h1>

        <div className='flex items-center gap-4'>
          <div className='flex-1 max-w-2xl relative'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search entries'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
              showFilters || activeFiltersCount > 0
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Filter className='w-5 h-5' />
            <span className='font-medium'>Filters</span>
            {activeFiltersCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className='mt-4 p-4 bg-white border border-gray-200 rounded-lg'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  <Tag className='w-4 h-4 inline mr-1' />
                  Tag
                </label>
                <select
                  value={filters.tag}
                  onChange={(e) =>
                    setFilters({ ...filters, tag: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>All Tags</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  <Smile className='w-4 h-4 inline mr-1' />
                  Mood
                </label>
                <select
                  value={filters.mood}
                  onChange={(e) =>
                    setFilters({ ...filters, mood: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>All Moods</option>
                  {allMoods.map((mood) => (
                    <option key={mood} value={mood}>
                      {mood}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  <Calendar className='w-4 h-4 inline mr-1' />
                  From Date
                </label>
                <input
                  type='date'
                  value={filters.dateFrom}
                  onChange={(e) =>
                    setFilters({ ...filters, dateFrom: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  <Calendar className='w-4 h-4 inline mr-1' />
                  To Date
                </label>
                <input
                  type='date'
                  value={filters.dateTo}
                  onChange={(e) =>
                    setFilters({ ...filters, dateTo: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className='mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium'
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-3xl font-bold text-gray-900'>Entries</h2>

          <button
            onClick={() => openModal("create")}
            className='flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
          >
            <Plus className='w-5 h-5' />
            New Entry
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-red-700'>Error: {error}</p>
          </div>
        )}

        {/* Entries List */}
        <div className='space-y-6'>
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className='bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow'
            >
              <div className='flex items-start justify-between mb-3'>
                <div className='flex items-center gap-3 text-gray-600'>
                  <Calendar className='w-5 h-5' />
                  <span className='font-medium'>
                    {new Date(entry.entry_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => openModal("edit", entry)}
                    className='text-gray-400 hover:text-blue-600 transition-colors'
                  >
                    <Edit className='w-5 h-5' />
                  </button>
                  <button
                    onClick={(e) => handleDeleteEntry(entry.id, e)}
                    className='text-gray-400 hover:text-red-600 transition-colors'
                  >
                    <Trash2 className='w-5 h-5' />
                  </button>
                </div>
              </div>

              <h3 className='text-xl font-bold text-gray-900 mb-3'>
                {entry.title || "Untitled"}
              </h3>
              <p className='text-gray-600 leading-relaxed mb-3'>
                {entry.content?.substring(0, 200)}
                {entry.content?.length > 200 ? "..." : ""}
              </p>

              <div className='flex items-center gap-3'>
                {entry.tags && entry.tags.length > 0 && (
                  <div className='flex items-center gap-2'>
                    {entry.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className='px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {entry.mood && (
                  <span className='px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full flex items-center gap-1'>
                    <Smile className='w-3 h-3' />
                    {entry.mood}
                  </span>
                )}
              </div>
            </div>
          ))}

          {filteredEntries.length === 0 && !isLoading && (
            <div className='text-center py-12'>
              <p className='text-gray-500 text-lg mb-4'>No entries found</p>
              {entries.length === 0 && (
                <button
                  onClick={() => openModal("create")}
                  className='text-blue-600 hover:underline'
                >
                  Create your first entry
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <JournalEntryModal />
    </div>
  );
}
