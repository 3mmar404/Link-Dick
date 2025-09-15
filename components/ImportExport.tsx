import React, { useRef } from 'react';
import { Link } from '../types';
import { Icon } from './Icon';

interface ImportExportProps {
  links: Link[];
  onImport: (links: Link[]) => void;
}

export const ImportExport: React.FC<ImportExportProps> = ({ links, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(links, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `linkdeck_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const importedLinks = JSON.parse(text);
          // Simple validation
          if (Array.isArray(importedLinks) && (importedLinks.length === 0 || 'id' in importedLinks[0])) {
            onImport(importedLinks);
            alert('Links imported successfully!');
          } else {
            throw new Error('Invalid file format.');
          }
        }
      } catch (error) {
        console.error('Failed to import links:', error);
        alert('Error importing links. Please check the file format.');
      }
    };
    reader.readAsText(file);
    // Reset file input to allow importing the same file again
    if(event.target) {
        event.target.value = '';
    }
  };

  const triggerFileImport = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
      <button
        onClick={triggerFileImport}
        className="flex items-center gap-2 bg-secondary hover:bg-secondary/70 text-text-main font-semibold py-2 px-4 rounded-md transition-colors"
      >
        <Icon name="upload" className="w-4 h-4" />
        Import
      </button>
      <button
        onClick={handleExport}
        disabled={links.length === 0}
        className="flex items-center gap-2 bg-secondary hover:bg-secondary/70 text-text-main font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="download" className="w-4 h-4" />
        Export
      </button>
    </div>
  );
};