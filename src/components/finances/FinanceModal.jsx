"use client";

import React from "react";

// ============================================
// Modal.jsx - Reusable Modal Components
// ============================================

// Main Modal Component
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-2xl p-8 max-w-md w-full mx-4'>
        <h3 className='text-2xl font-bold text-gray-800 mb-6'>{title}</h3>
        {children}
      </div>
    </div>
  );
}

// Form Input Component
export function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  options,
}) {
  // Handle formatted number input
  const handleNumberChange = (e) => {
    const inputValue = e.target.value.replace(/,/g, ""); // Remove commas

    // Only allow numbers
    if (inputValue === "" || /^\d+$/.test(inputValue)) {
      onChange(e);
    }
  };

  // Format number with commas
  const formatNumber = (num) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
      </label>
      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className='w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none'
        >
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      ) : type === "number" ? (
        <input
          type='text'
          value={formatNumber(value)}
          onChange={handleNumberChange}
          placeholder={placeholder}
          className='w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
      )}
    </div>
  );
}

// Modal Actions Component
export function ModalActions({ onConfirm, onCancel, confirmText = "Add" }) {
  return (
    <div className='flex gap-3 mt-6'>
      <button
        onClick={onConfirm}
        className='flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition'
      >
        {confirmText}
      </button>
      <button
        onClick={onCancel}
        className='flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition'
      >
        Cancel
      </button>
    </div>
  );
}
