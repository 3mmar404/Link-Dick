import React, { useState, useRef } from 'react';
import { Link, Status } from '../types';
import { Loader } from './Loader';
import { Icon } from './Icon';

interface LinkCardProps {
  link: Link;
  isLoading: boolean;
  onDelete: (id: string) => void;
  onUpdate: (link: Link) => void;
}

const PLATFORM_COLORS: Record<string, string> = {
    'YouTube': 'bg-youtube',
    'Facebook': 'bg-facebook',
    'Instagram': 'bg-instagram',
    'Google': 'bg-google',
    'Twitter': 'bg-twitter',
    'Other': 'bg-other',
};

const STATUS_CONFIG: Record<Status, { color: string; label: string }> = {
  unread: { color: 'bg-blue-500', label: 'Unread' },
  important: { color: 'bg-yellow-400', label: 'Important' },
  reviewed: { color: 'bg-green-500', label: 'Reviewed' },
};

export const LinkCard: React.FC<LinkCardProps> = ({ link, isLoading, onDelete, onUpdate }) => {
    const [tagInput, setTagInput] = useState('');
    const tagInputRef = useRef<HTMLInputElement>(null);

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            const newTag = tagInput.trim().toLowerCase();
            if (!link.tags.includes(newTag)) {
                onUpdate({ ...link, tags: [...link.tags, newTag] });
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        onUpdate({ ...link, tags: link.tags.filter(tag => tag !== tagToRemove) });
    };

    const platformColor = PLATFORM_COLORS[link.platform] || 'bg-other';

    return (
        <div className="bg-card rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg border border-secondary relative">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="relative block group h-40 bg-secondary">
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <img 
                        src={link.image || `https://picsum.photos/seed/${link.id}/400/200`} 
                        alt={link.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${link.id}/400/200` }}
                    />
                )}
            </a>
            <div className="p-4 flex flex-col flex-grow">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-md text-text-main line-clamp-2 pr-2">{link.title}</h3>
                    <span title={link.status} className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${STATUS_CONFIG[link.status]?.color || 'bg-gray-400'}`}></span>
                </div>
                <p className="text-text-secondary text-sm flex-grow mb-4 line-clamp-2">{link.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {link.tags.map(tag => (
                        <span key={tag} className="flex items-center bg-sky-100 text-sky-800 text-xs font-medium px-2 py-0.5 rounded-full">
                            {tag}
                            <button onClick={() => handleRemoveTag(tag)} className="ml-1 -mr-0.5 text-sky-600 hover:text-sky-800 focus:outline-none">&times;</button>
                        </span>
                    ))}
                </div>
            </div>
            <div className="px-4 pb-3 border-t border-secondary flex justify-between items-center text-xs text-text-secondary">
                <div className="flex items-center gap-2" title={link.platform}>
                    <Icon name={link.platform.toLowerCase().replace(' ', '')} className="w-4 h-4" />
                    <span>{new Date(link.createdAt).toLocaleDateString()}</span>
                </div>
                <button onClick={() => onDelete(link.id)} title="Delete Link" className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none p-1 rounded-full hover:bg-red-500/10">
                    <Icon name="trash" className="w-4 h-4" />
                </button>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${platformColor}`}></div>
        </div>
    );
};
