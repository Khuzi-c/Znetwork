import { useState, useEffect } from 'react';
import { Server } from './lib/supabase';
import { servers as hardcodedServers } from './data/servers';
import DiscordProfile from './components/DiscordProfile';
import RobloxProfile from './components/RobloxProfile';
import { ServerCard } from './components/ServerCard';
import { ServerModal } from './components/ServerModal';
import { SearchBar } from './components/SearchBar';
import OwnerPanel from './components/OwnerPanel';
import CursorCycle from './components/CursorCycle';

function App() {
  const [servers] = useState<Server[]>(hardcodedServers);
  const [filteredServers, setFilteredServers] = useState<Server[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading] = useState(false);
  // No public error state for hardcoded data
  const [showOwnerPanel, setShowOwnerPanel] = useState(false);
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');

  // Theme definitions matching your specification
  const themes = {
    default: 'linear-gradient(135deg, #D51A0C 0%, #3B04E0 50%, #03124C 100%)',
    sunset: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)',
    'pink-dream': 'linear-gradient(135deg, #6A0572 0%, #AB83A1 50%, #FFC0CB 100%)',
    nature: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 50%, #90EE90 100%)',
    ocean: 'linear-gradient(135deg, #4169E1 0%, #1E90FF 50%, #87CEEB 100%)',
    love: 'linear-gradient(135deg, #DC143C 0%, #FF1493 50%, #FF69B4 100%)'
  };

  // Always include featured server first in filtered results

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('zawebsite-theme') || 'default';
    setCurrentTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Filter servers based on search query
    const base = [...servers].sort((a, b) => {
      const fa = (a as any).featured ? -1 : 0;
      const fb = (b as any).featured ? -1 : 0;
      return fa - fb;
    });
    if (searchQuery.trim() === '') {
      setFilteredServers(base);
    } else {
      const filtered = base.filter(server =>
        server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServers(filtered);
    }
  }, [servers, searchQuery]);

  const changeTheme = (themeName: string) => {
    setCurrentTheme(themeName);
    localStorage.setItem('zawebsite-theme', themeName);
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: themes[currentTheme as keyof typeof themes],
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
  {/* Dynamic cursor (cycles images every 10s) */}
  <CursorCycle />
  {/* Remove falling effects since these are real cursors; keep disabled */}
  {/* <CursorBurst /> */}
      {/* Header */}
      <header className="glass-morphism border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Za Website</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Profile Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <DiscordProfile />
            <RobloxProfile />
          </div>
        </section>

        {/* Server Discovery Section */}
        <section>
          <div className="glass-card p-4 mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Discord Server Discovery</h2>
            <SearchBar searchTerm={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-white mt-4">Loading servers...</p>
            </div>
          )}

          {/* Error State */}
          {/* No public error UI for normal visitors */}

          {/* Servers Grid */}
          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServers.map((server) => (
                <ServerCard
                  key={server.id}
                  server={server}
                  isOwnerMode={isOwnerLoggedIn}
                  onCardClick={(server) => setSelectedServer(server)}
                  onEdit={(server) => console.log('Edit server:', server)}
                  onDelete={(serverId) => console.log('Delete server:', serverId)}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredServers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">No servers found</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/20 bg-black/20">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-white/70">
            &copy; 2024 Z Network. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modals */}
      {selectedServer && (
        <ServerModal
          server={selectedServer}
          isOpen={!!selectedServer}
          onClose={() => setSelectedServer(null)}
        />
      )}

      {/* No Add Server modal for normal visitors */}

      {showOwnerPanel && (
        <OwnerPanel
          isOpen={showOwnerPanel}
          isLoggedIn={isOwnerLoggedIn}
          onLogin={setIsOwnerLoggedIn}
          onClose={() => setShowOwnerPanel(false)}
          currentTheme={currentTheme}
          onThemeChange={changeTheme}
        />
      )}
    </div>
  );
}

export default App;