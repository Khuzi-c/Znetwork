import React from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';

export const ProfileCard: React.FC = () => {
  const badges = [
    { img: 'https://cdn3.emoji.gg/emojis/37805-nitro-style-gold.png', title: 'Nitro Gold' },
    { img: 'https://cdn3.emoji.gg/emojis/66366-completed-a-quest.png', title: 'Completed a Quest' },
    { img: 'https://cdn3.emoji.gg/emojis/6601-hypesquad-bravery.png', title: 'Discord Bravery' },
    { img: 'https://cdn3.emoji.gg/emojis/9625-evolving-badge-nitro-6-months.png', title: 'Server Boosting' },
    { img: 'https://cdn3.emoji.gg/emojis/41827-orbs.png', title: 'Discord Orbs' },
  ];

  return (
    <div className="profile-card max-w-md mx-auto mb-12 overflow-hidden rounded-xl bg-gray-900 shadow-lg">
      
      {/* Banner */}
      <div className="relative w-full h-36">
        <img
          src="https://cdn.discordapp.com/banners/1006821954721939516/a_5e5ceee786e0c69445b37f2feda2c505.gif?size=1024&animated=true"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="relative p-6 -mt-10 flex items-center space-x-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-purple-600 p-1">
            <img
              src="https://cdn.discordapp.com/avatars/1006821954721939516/b446fb3e40da0a60300ffe44c62404bb.webp?size=1024"
              alt="Profile Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
        </div>

        {/* Name & Tagline */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">The Z</h2>
          <p className="text-gray-300 text-sm">zayyzayy4567 • Mysterious</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap justify-center space-x-2 mt-4 px-6 pb-4">
        {badges.map((badge, index) => (
          <img
            key={index}
            src={badge.img}
            alt={badge.title}
            title={badge.title}
            className="w-6 h-6 rounded-full hover:scale-110 transition-transform cursor-pointer"
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-4 flex space-x-3">
        <button className="flex-1 futuristic-btn flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition">
          <MessageCircle size={16} />
          <span>Add Friend</span>
        </button>
        <a
          href="https://discord.com/users/1006821954721939516"
          target="_blank"
          rel="noopener noreferrer"
          className="futuristic-btn flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition"
        >
          <MessageCircle size={16} />
        </a>
      </div>

      {/* Links Section */}
      <div className="px-6 pb-6 space-y-3">
        <div className="text-sm">
          <p className="text-gray-300 mb-2">
            <span className="font-semibold text-white">Z Ownership Card:</span>
          </p>
          <a
            href="https://zownership.carrd.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
          >
            <span>https://zownership.carrd.co/</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <div className="text-sm">
          <p className="text-gray-300 mb-2">
            <span className="font-semibold text-white">HIRE ME:</span>
          </p>
          <a
            href="https://discord.gg/rfMXrtNgdm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
          >
            <span>https://discord.gg/rfMXrtNgdm</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <div className="text-sm">
          <p className="text-gray-300 mb-2">
            <span className="font-semibold text-white">FREE GROWTH:</span>
          </p>
          <a
            href="https://discord.gg/Jn7JD3RzJb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
          >
            <span>https://discord.gg/Jn7JD3RzJb</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
