import React from 'react';

function Input({ label, placeholder, name, value, setValue, type = 'text' }) {
  return (
    <div className="mb-4">
      {/* Label for the input */}
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      {/* Input field */}
      <input
        id={name}
        placeholder={placeholder}
        name={name}
        value={value}       // Controlled input
        onChange={(e) => setValue(e.target.value)} // Update state on change
        type={type}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-yellow-500" // Tailwind CSS styles
      />
    </div>
  );
}

export default Input;
