export default function RightPanel() {
  return (
    <aside className='w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto'>
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

      <div className='mb-8'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>Notes</h2>
        <div className='border border-gray-200 rounded-lg p-4 h-32 bg-gray-50'></div>
      </div>

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
