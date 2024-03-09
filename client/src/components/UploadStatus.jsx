import React from 'react';

function UploadStatus(props) {
    return (
    <div className="flex">
      {props.status === 'uploading' && (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
      )}
      {props.status === 'success' && (


        <div className='flex flex-row items-center space-x-1'>
            <p className='underline decoration-teal-500 font-mono text-sm text-teal-400 font-semibold'>{props.filename}</p>
            <div className="w-4 h-4 rounded-full border border-teal-600 flex items-center justify-center">
            <svg className='text-teal-500'
        fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            </div>
        </div>
      )}
    </div>
  );
};

export default UploadStatus;