import React from 'react';
import { Icon } from './Icon';

interface Platform {
    name: string;
    count: number;
}

interface PlatformFilterProps {
  platforms: Platform[];
  selectedPlatform: string;
  onSelectPlatform: (platformName: string) => void;
}

export const PlatformFilter: React.FC<PlatformFilterProps> = ({ platforms, selectedPlatform, onSelectPlatform }) => {
  const allCount = platforms.reduce((acc, p) => acc + p.count, 0);

  const platformOrder = ['YouTube', 'Facebook', 'Instagram', 'Google', 'Twitter', 'Other'];
  const sortedPlatforms = [...platforms].sort((a,b) => platformOrder.indexOf(a.name) - platformOrder.indexOf(b.name));

  return (
    <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
      <button
          title={`All (${allCount})`}
          onClick={() => onSelectPlatform('All')}
          className={`p-2 rounded-md transition-colors ${
          selectedPlatform === 'All'
              ? 'bg-card shadow-sm'
              : 'hover:bg-card/50'
          }`}
      >
          <Icon name="all" className="w-5 h-5 text-text-secondary" />
      </button>
      {sortedPlatforms.map(platform => (
      <button
          key={platform.name}
          title={`${platform.name} (${platform.count})`}
          onClick={() => onSelectPlatform(platform.name)}
          className={`p-2 rounded-md transition-colors ${
          selectedPlatform === platform.name
            ? 'bg-card shadow-sm'
            : 'hover:bg-card/50'
          }`}
      >
          <Icon name={platform.name.toLowerCase().replace(' ', '')} className="w-5 h-5" />
      </button>
      ))}
    </div>
  );
};