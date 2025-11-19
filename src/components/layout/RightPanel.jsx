"use client";
import { Plus, Maximize2, X } from "lucide-react";
import { useNotesStore } from "@/stores/noteStore";

export default function RightPanel() {
  const {
    noteText,
    isModalOpen,
    modalNoteText,
    setNoteText,
    setModalNoteText,
    setIsModalOpen,
    addNote,
    addModalNote,
  } = useNotesStore();

  return (
    <aside className='w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto'>
      {/* Daily habits */}
      <div className='mb-8'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          Daily habits
        </h2>
        <div className='space-y-3'>
          <div className='h-3 bg-gray-200 rounded-full w-full'></div>
          <div className='h-3 bg-gray-200 rounded-full w-full'></div>
          <div className='h-3 bg-gray-200 rounded-full w-full'></div>
        </div>
      </div>

      {/* Notes Section */}
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold text-gray-900'>Notes</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className='p-1 hover:bg-gray-100 rounded transition-colors'
            title='Expand'
          >
            <Maximize2 className='w-4 h-4 text-black' />
          </button>
        </div>

        <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-4'>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder='Write a note...'
            className='w-full h-24 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-3'
          />
          <button
            onClick={addNote}
            className='w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors'
          >
            Add Note
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col'>
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
              <h2 className='text-xl font-semibold text-gray-900'>Add Note</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <X className='w-5 h-5 text-gray-600' />
              </button>
            </div>

            <div className='p-6 flex-1 overflow-y-auto'>
              <textarea
                value={modalNoteText}
                onChange={(e) => setModalNoteText(e.target.value)}
                placeholder='Write your note here...'
                className='w-full h-64 p-4 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                autoFocus
              />
            </div>

            <div className='flex gap-3 p-6 border-t border-gray-200'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={addModalNote}
                className='flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      <div>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          Notifications
        </h2>
        <div className='space-y-4'>
          <div className='flex items-start gap-3 p-3 bg-gray-50 rounded-lg'>
            <div className='w-6 h-6 bg-gray-200 rounded flex-shrink-0 mt-1'></div>
            <div className='flex-1'>
              <div className='h-3 bg-gray-200 rounded w-3/4 mb-2'></div>
              <div className='h-3 bg-gray-200 rounded w-full'></div>
            </div>
          </div>

          <div className='flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100'>
            <div className='w-6 h-6 bg-blue-400 rounded flex-shrink-0 mt-1 flex items-center justify-center'>
              <svg
                className='w-4 h-4 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <p className='text-sm text-gray-700 flex-1'>
              You're close to your fitness goal
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
