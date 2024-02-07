// components/CustomButton.tsx
import React from 'react';

// Define the type for your props
type CustomButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;  // Optional click handler
  className?: string;    // Optional additional classes
  bgColor?: string;      // Background color class e.g., 'bg-gray-500'
  hoverBgColor?: string; // Hover background color class e.g., 'hover:bg-gray-700'
  textColor?: string;    // Text color class e.g., 'text-white'
  border?: string;       // Border class e.g., 'border'
  borderColor?: string;  // Border color class e.g., 'border-red-500'
  textSize?: string;     // Text size class e.g., 'text-lg'
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  className = "",
  bgColor = "bg-gray-500",
  textColor = "text-white",
  border = "border",
  borderColor = "border-white",
  textSize = "text-sm",
}) => {
  // Construct the complete class string
  const buttonClass = `
    ${bgColor} ${textColor} ${border} ${borderColor} ${textSize}
    font-bold py-3 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105
    ${className}
  `.trim();

  return (
    <button
      onClick={onClick}
      className={buttonClass}
    >
      {children}
    </button>
  );
}

export default CustomButton;
