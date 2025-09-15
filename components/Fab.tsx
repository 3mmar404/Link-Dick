import React from 'react';
import { Icon } from './Icon';

interface FabProps {
  onClick: () => void;
}

export const Fab: React.FC<FabProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 w-14 h-14 bg-primary hover:bg-primary-hover rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Add new link"
    >
      <Icon name="plus" className="w-8 h-8" />
    </button>
  );
};