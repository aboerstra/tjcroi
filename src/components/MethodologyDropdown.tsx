import React from 'react';

interface MethodologyDropdownProps {
  title: string;
  children: React.ReactNode;
}

const MethodologyDropdown: React.FC<MethodologyDropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm text-[#38003C] hover:text-[#38003C]/80 focus:outline-none"
      >
        <svg
          className={`w-4 h-4 mr-1 transition-transform ${isOpen ? 'transform rotate-90' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        {title}
      </button>
      
      {isOpen && (
        <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200 text-sm">
          {children}
        </div>
      )}
    </div>
  );
};

export default MethodologyDropdown;
