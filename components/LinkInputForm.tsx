import React, { useState } from 'react';
import { Icon } from './Icon';
import { Loader } from './Loader';

interface LinkInputFormProps {
  onAddLinks: (urls: string[]) => void;
}

export const LinkInputForm: React.FC<LinkInputFormProps> = ({ onAddLinks }) => {
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;
    
    setIsProcessing(true);
    const urls = inputValue.split('\n').filter(url => url.trim() !== '');
    onAddLinks(urls);
    // Keep input value for a moment to show feedback
    setTimeout(() => {
        setInputValue('');
        setIsProcessing(false)
    }, 1000);
  };

  return (
    <div>
        <h2 className="text-2xl font-bold text-text-main mb-4">Add New Links</h2>
        <form onSubmit={handleSubmit}>
            <textarea
            id="link-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Paste one or more links, separated by new lines..."
            className="w-full h-40 p-3 bg-background border-2 border-secondary rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 resize-none"
            disabled={isProcessing}
            />
            <button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-md transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
            {isProcessing ? (
                <>
                <Loader />
                Adding Links...
                </>
            ) : (
                <>
                <Icon name="plus" className="w-5 h-5" />
                Add Links
                </>
            )}
            </button>
        </form>
    </div>
  );
};