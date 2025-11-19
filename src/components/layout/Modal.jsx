import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900'>{title}</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <X className='w-5 h-5 text-gray-600' />
          </button>
        </div>

        <div className='p-6 flex-1 overflow-y-auto'>{children}</div>

        {footer && (
          <div className='flex gap-3 p-6 border-t border-gray-200'>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
