import React from 'react';
import { Server } from '../lib/supabase';
import { Edit, Trash2, ExternalLink, Image } from 'lucide-react';

interface ServerCardProps {
  server: Server;
  isOwnerMode: boolean;
  onCardClick: (server: Server) => void;
  onEdit: (server: Server) => void;
  onDelete: (serverId: string) => void;
}

export const ServerCard: React.FC<ServerCardProps> = ({
  server,
  isOwnerMode,
  onCardClick,
  onEdit,
  onDelete,
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on action buttons
    if ((e.target as HTMLElement).closest('.action-buttons')) {
      return;
    }
    onCardClick(server);
  };

  const truncateDescription = (text: string, maxLength: number = 120) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div
      className={`glass-card glow-hover transition-all duration-300 transform cursor-pointer overflow-hidden relative group ${
        server.name === "Khxzi's Dev Services" ? 'ring-2 ring-yellow-500 ring-opacity-50 glow-yellow' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Featured badge */}
      {(server as any).featured && (
        <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold z-10 flex items-center space-x-1">
          <span>⭐</span>
          <span>FEATURED</span>
        </div>
      )}
      {/* Server Profile Picture */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-4">
          {server.pfp_url ? (
            <img
              src={server.pfp_url}
              alt={`${server.name} logo`}
              className="w-16 h-16 rounded-full object-cover border-2 border-purple-500 glow-blue"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center border-2 border-purple-500 glow-blue ${server.pfp_url ? 'hidden' : ''}`}>
            <Image size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span>{server.name}</span>
              {(server as any).custom_tag && (
                <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {(server as any).custom_tag}
                </span>
              )}
            </h3>
            <div className="flex items-center space-x-2">
              <p className="text-gray-300 text-sm">
                {new Date(server.created_at).toLocaleDateString()}
              </p>
              {/* Optional extra meta here if needed */}
            </div>
          </div>
        </div>
      </div>

      {/* Server Description */}
      <div className="px-6 pb-6">
        <p className="text-gray-200 leading-relaxed">
          {truncateDescription(server.description)}
        </p>
      </div>

      {/* Owner Action Buttons */}
      {isOwnerMode && (
        <div className="action-buttons bg-black bg-opacity-30 px-6 py-4 border-t border-gray-600 flex justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(server);
            }}
            className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm glow-blue"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Are you sure you want to delete "${server.name}"?`)) {
                onDelete(server.id);
              }
            }}
            className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm glow-red"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      )}

      {/* Hover indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ExternalLink size={20} className="text-purple-400" />
      </div>
    </div>
  );
};
