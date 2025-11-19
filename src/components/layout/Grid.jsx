"use client";

import { Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNotesStore } from "@/stores/noteStore";
import Modal from "@/components/layout/Modal";
import { useState, useEffect } from "react";

export default function DashboardGrid() {
  const { notes, fetchNotes, updateNote, deleteNote } = useNotesStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleEdit = (note) => {
    setEditNoteId(note.id);
    setEditContent(note.content || note.title || "");
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editNoteId) return;

    await updateNote(editNoteId, null, editContent);
    setIsEditModalOpen(false);
    setEditNoteId(null);
    setEditContent("");
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {/* Net Worth Card */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h3 className='text-sm font-medium text-gray-600 mb-4'>Net worth</h3>
        <div className='flex items-center mb-4'>
          <span className='text-5xl font-bold text-gray-900'>$</span>
        </div>
        <div className='h-2 bg-gray-200 rounded-full w-full'></div>
      </div>

      {/* Current Streaks Card */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h3 className='text-sm font-medium text-gray-600 mb-4'>
          Current streaks
        </h3>
        <div className='flex items-center mb-4'>
          <svg
            className='w-16 h-16 text-gray-400'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M12 2c1.5 4 4.5 6 6.5 8.5 1.5 2 2 4.5 1.5 7-.5 3-3 5.5-6 6-3 .5-6-1-7.5-3.5-1-1.5-1.5-3.5-1-5.5.5-2.5 2-4.5 3.5-6.5C10.5 6 11.5 4 12 2z' />
          </svg>
        </div>
        <div className='h-2 bg-gray-200 rounded-full w-full'></div>
      </div>

      {/* Learning Goals Card */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h3 className='text-sm font-medium text-gray-600 mb-4'>
          Learning goals
        </h3>
        <div className='flex items-center justify-center'>
          <div className='relative w-32 h-32'>
            <svg className='w-32 h-32 transform -rotate-90'>
              <circle
                cx='64'
                cy='64'
                r='56'
                stroke='currentColor'
                strokeWidth='12'
                fill='none'
                className='text-gray-200'
              />
              <circle
                cx='64'
                cy='64'
                r='56'
                stroke='currentColor'
                strokeWidth='12'
                fill='none'
                strokeDasharray='351.86'
                strokeDashoffset='263.9'
                className='text-gray-400'
              />
            </svg>
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='text-2xl font-bold text-gray-600'>00%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Finances Card */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h3 className='text-sm font-medium text-gray-900 mb-4'>Finances</h3>
        <div className='flex items-center gap-4 mb-6'>
          <div className='relative w-24 h-24'>
            <svg className='w-24 h-24 transform -rotate-90'>
              <circle
                cx='48'
                cy='48'
                r='40'
                fill='none'
                stroke='#E5E7EB'
                strokeWidth='16'
              />
              <circle
                cx='48'
                cy='48'
                r='40'
                fill='none'
                stroke='#9CA3AF'
                strokeWidth='16'
                strokeDasharray='80 171'
                strokeLinecap='round'
              />
              <circle
                cx='48'
                cy='48'
                r='40'
                fill='none'
                stroke='#6B7280'
                strokeWidth='16'
                strokeDasharray='60 191'
                strokeDashoffset='-80'
                strokeLinecap='round'
              />
            </svg>
          </div>
          <div className='flex-1 space-y-2'>
            <div className='h-2 bg-gray-200 rounded-full w-full'></div>
            <div className='h-2 bg-gray-200 rounded-full w-3/4'></div>
          </div>
        </div>
        <div>
          <p className='text-sm text-gray-600 mb-2'>Monthly savings</p>
          <div className='h-3 bg-gray-200 rounded-full w-full'></div>
        </div>
      </div>

      {/* Fitness Card */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h3 className='text-sm font-medium text-gray-900 mb-4'>Fitness</h3>
        <div className='space-y-6'>
          <div>
            <p className='text-sm text-gray-600 mb-3'>Weekly workout</p>
            <svg className='w-full h-16' viewBox='0 0 300 60'>
              <path
                d='M 0 40 Q 30 35 50 38 T 100 42 T 150 35 T 200 40 T 250 38 T 300 42'
                fill='none'
                stroke='#D1D5DB'
                strokeWidth='2'
              />
            </svg>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-3'>Weight trend</p>
            <svg className='w-full h-16' viewBox='0 0 300 60'>
              <path
                d='M 0 35 Q 30 30 50 32 T 100 38 T 150 35 T 200 32 T 250 35 T 300 38'
                fill='none'
                stroke='#D1D5DB'
                strokeWidth='2'
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Goal Tracker Card */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h3 className='text-sm font-medium text-gray-900 mb-4'>Goal tracker</h3>
        <div className='flex gap-4'>
          <div className='flex-1'>
            <p className='text-xs text-gray-500 mb-3'>To do</p>
            <div className='space-y-2'>
              <div className='h-2 bg-gray-200 rounded-full'></div>
              <div className='h-2 bg-gray-200 rounded-full'></div>
              <div className='h-2 bg-gray-200 rounded-full'></div>
              <div className='h-2 bg-gray-200 rounded-full'></div>
            </div>
          </div>
          <div className='flex-1'>
            <p className='text-xs text-gray-500 mb-3'>Done</p>
            <div className='space-y-2'>
              <div className='h-2 bg-gray-200 rounded-full'></div>
              <div className='h-2 bg-gray-200 rounded-full'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Journal Entries Card */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h3 className='text-sm font-medium text-gray-900 mb-4'>
          Journal Entries
        </h3>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <p className='text-4xl font-bold text-gray-900 mb-1'>12</p>
            <p className='text-sm text-gray-500'>Total entries</p>
          </div>
          <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-purple-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
              />
            </svg>
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-gray-600'>This week</span>
            <span className='font-medium text-gray-900'>3</span>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-gray-600'>This month</span>
            <span className='font-medium text-gray-900'>8</span>
          </div>
        </div>
      </div>

      {/* Reminders & Notes Card */}
      <div className='bg-white rounded-xl border border-gray-200 p-6 lg:col-span-2'>
        <h3 className='text-sm font-medium text-gray-900 mb-4'>
          Reminders & Notes
        </h3>
        <div className='flex gap-8'>
          <div className='flex-1 space-y-3'>
            {notes.length === 0 ? (
              <p className='text-sm text-gray-500 italic'>No notes yet</p>
            ) : (
              notes.slice(0, 5).map((note) => (
                <div key={note.id} className='flex items-start gap-3 group'>
                  <div className='w-2 h-2 rounded-full bg-gray-400 mt-1.5 flex-shrink-0'></div>
                  <div className='flex-1 min-w-0'>
                    <span className='text-sm text-gray-700 block'>
                      {note.title
                        ? truncateText(note.title, 40)
                        : truncateText(note.content, 40)}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 flex-shrink-0'>
                    <button
                      onClick={() => handleEdit(note)}
                      className='text-blue-500 hover:text-blue-700 transition-colors'
                    >
                      <FontAwesomeIcon icon={faEdit} className='w-4 h-4' />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className='text-red-500 flex-shrink-0'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Daily Inspiration Card - Spans full width */}
      <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-8 lg:col-span-3'>
        <div className='flex items-start gap-4'>
          <div className='flex-shrink-0'>
            <svg
              className='w-10 h-10 text-blue-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
              />
            </svg>
          </div>
          <div className='flex-1'>
            <h3 className='text-sm font-semibold text-gray-900 mb-3'>
              Daily Inspiration
            </h3>
            <blockquote className='text-lg text-gray-700 italic mb-2'>
              "For I know the plans I have for you, declares the Lord, plans to
              prosper you and not to harm you, plans to give you hope and a
              future."
            </blockquote>
            <p className='text-sm text-gray-600'>— Jeremiah 29:11</p>
          </div>
          <button className='flex-shrink-0 p-2 hover:bg-white/50 rounded-lg transition-colors'>
            <svg
              className='w-5 h-5 text-gray-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Edit Note Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title='Edit Note'
        footer={
          <>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className='flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
            >
              Save Changes
            </button>
          </>
        }
      >
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder='Edit your note here...'
          className='w-full h-64 p-4 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
          autoFocus
        />
      </Modal>
    </div>
  );
}
