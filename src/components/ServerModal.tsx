import React from 'react';
import { Server } from '../lib/supabase';
import { X, ExternalLink } from 'lucide-react';

interface ServerModalProps {
  server: Server | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServerModal: React.FC<ServerModalProps> = ({ server, isOpen, onClose }) => {
  if (!isOpen || !server) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto glow-hover">
        {/* Modal Header with Banner */}
        <div className="relative">
          {server.banner_url ? (
            <img
              src={server.banner_url}
              alt={`${server.name} banner`}
              className="w-full h-48 object-cover rounded-t-2xl"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-full h-48 bg-gradient-to-br from-red-500 via-purple-600 to-blue-800 rounded-t-2xl flex items-center justify-center ${server.banner_url ? 'hidden' : ''}`}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-2xl font-bold gradient-text">{server.name.charAt(0)}</span>
              </div>
              <p className="text-white text-lg font-semibold">{server.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-90 transition-all backdrop-blur-sm"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          {/* Server Info Header */}
          <div className="flex items-center space-x-4 mb-6">
            {server.pfp_url ? (
              <img
                src={server.pfp_url}
                alt={`${server.name} logo`}
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-500 glow-blue"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center border-2 border-purple-500 glow-blue ${server.pfp_url ? 'hidden' : ''}`}>
              <span className="text-2xl font-bold text-white">{server.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{server.name}</h2>
              <div className="flex items-center space-x-3">
                <p className="text-gray-300">
                  Created on {new Date(server.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                {server.name === "Khxzi's Dev Services" && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Dev Khxzi
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                      <span>⭐</span>
                      <span>FEATURED</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Server Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-3">About This Server</h3>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
              {server.description}
            </p>
          </div>

          {/* Invite Link */}
          <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-gray-600 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Join This Server</h3>
            {server.invite_url ? (
              <a
                href={server.invite_url}
                target="_blank"
                rel="noopener noreferrer"
                className="futuristic-btn inline-flex items-center space-x-2 font-medium"
              >
                <ExternalLink size={20} />
                <span>Join Server</span>
              </a>
            ) : (
              <p className="text-gray-400">No invite link available</p>
            )}
          </div>

          {/* Discord Widget: prefer widget_embed from server data if provided */}
          {(() => {
            const widget = (server as any).widget_embed as string | undefined;
            if (!widget) return null;
            return (
              <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-4">Live Server Info</h3>
                <div className="discord-widget-container" dangerouslySetInnerHTML={{ __html: widget }} />
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
