import React from 'react';
import { Icon } from './Icon';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative w-48 md:w-64">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon name="search" className="w-5 h-5 text-text-secondary"/>
      </div>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search..."
        className="w-full bg-card border border-secondary rounded-md pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-shadow duration-200"
      />
    </div>
  );
};