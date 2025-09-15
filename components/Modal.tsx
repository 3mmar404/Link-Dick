import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-card rounded-lg shadow-xl p-6 w-full max-w-lg m-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button onClick={onClose} className="absolute -top-2 -right-2 text-text-secondary hover:text-text-main p-2">
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};