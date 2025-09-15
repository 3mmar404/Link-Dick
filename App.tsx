import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, Tag } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { fetchLinkMetadata } from './services/geminiService';
import { detectPlatform } from './utils/platform';
import { LinkInputForm } from './components/LinkInputForm';
import { LinkCard } from './components/LinkCard';
import { SearchBar } from './components/SearchBar';
import { PlatformFilter } from './components/PlatformFilter';
import { Icon } from './components/Icon';
import { Modal } from './components/Modal';
import { Fab } from './components/Fab';

const App: React.FC = () => {
  const [links, setLinks] = useLocalStorage<Link[]>('links', []);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Migration for links without platform or status
    const needsMigration = links.some(link => !link.platform || !link.status);
    if (needsMigration) {
      setLinks(prevLinks =>
        prevLinks.map(link => ({
          ...link,
          platform: link.platform || detectPlatform(link.url),
          status: link.status || 'unread',
        }))
      );
    }
  }, []);

  const handleAddLinks = useCallback(async (urls: string[]) => {
    const newLinks: Link[] = [];
    const newLoadingStates: Record<string, boolean> = {};

    for (const url of urls) {
      if (!url.trim() || links.some(link => link.url === url)) continue;

      const id = `${Date.now()}-${url}`;
      newLoadingStates[id] = true;
      const newLink: Link = {
        id,
        url,
        title: url,
        description: 'Fetching details...',
        image: '',
        platform: detectPlatform(url),
        tags: [],
        status: 'unread',
        createdAt: new Date().toISOString(),
      };
      newLinks.push(newLink);
    }

    setLinks(prevLinks => [...newLinks, ...prevLinks]);
    setLoadingStates(prev => ({ ...prev, ...newLoadingStates }));
    setIsModalOpen(false); // Close modal on submit

    for (const link of newLinks) {
      try {
        const metadata = await fetchLinkMetadata(link.url);
        setLinks(prevLinks =>
          prevLinks.map(l =>
            l.id === link.id ? { ...l, ...metadata, description: metadata.description || 'No description found.' } : l
          )
        );
      } catch (error) {
        console.error(`Failed to fetch metadata for ${link.url}:`, error);
        setLinks(prevLinks =>
          prevLinks.map(l =>
            l.id === link.id ? { ...l, title: `Failed to load: ${l.url}`, description: 'Could not fetch link preview. The link may be broken or private.' } : l
          )
        );
      } finally {
        setLoadingStates(prev => {
          const newStates = { ...prev };
          delete newStates[link.id];
          return newStates;
        });
      }
    }
  }, [links, setLinks]);

  const handleDeleteLink = useCallback((id: string) => {
    setLinks(links.filter(link => link.id !== id));
  }, [links, setLinks]);
  
  const handleUpdateLink = useCallback((updatedLink: Link) => {
    setLinks(links.map(link => (link.id === updatedLink.id ? updatedLink : link)));
  }, [links, setLinks]);

  const allPlatforms = useMemo(() => {
    const platformCount: Record<string, number> = {};
    links.forEach(link => {
        platformCount[link.platform] = (platformCount[link.platform] || 0) + 1;
    });
    return Object.entries(platformCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
  }, [links]);

  const filteredLinks = useMemo(() => {
    return links.filter(link => {
      const searchMatch =
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const platformMatch =
        selectedPlatform === 'All' || link.platform === selectedPlatform;

      return searchMatch && platformMatch;
    });
  }, [links, searchTerm, selectedPlatform]);

  return (
    <div className="min-h-screen font-sans">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Icon name="link" className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight text-text-main">LinkDeck</h1>
            </div>
            <div className="flex items-center gap-4">
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
              <PlatformFilter
                platforms={allPlatforms}
                selectedPlatform={selectedPlatform}
                onSelectPlatform={setSelectedPlatform}
              />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {filteredLinks.length > 0 || Object.keys(loadingStates).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLinks.map(link => (
              <LinkCard
                key={link.id}
                link={link}
                isLoading={loadingStates[link.id] || false}
                onDelete={handleDeleteLink}
                onUpdate={handleUpdateLink}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-secondary rounded-lg text-center p-8">
            <Icon name="inbox" className="w-20 h-20 text-secondary" />
            <h2 className="mt-6 text-xl font-semibold text-text-main">Your deck is empty!</h2>
            <p className="mt-2 text-text-secondary">Click the '+' button to add your first link.</p>
          </div>
        )}
      </main>

      <Fab onClick={() => setIsModalOpen(true)} />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LinkInputForm onAddLinks={handleAddLinks} />
      </Modal>
    </div>
  );
};

export default App;