import { useRef, useState } from 'react';
import ytLogo from '../../img-assets/yt logo no bg.gif';
import spotifyLogo from '../../img-assets/spotify no bg.png';
import carrdLogo from '../../img-assets/carrd logo no bg.png';
import hireLogo from '../../img-assets/HireMe no Bg.png';
import growthGif from '../../img-assets/Growth but with White BG.gif';
import rblxBannerGif from '../../img-assets/rblx banner.gif';

const DiscordProfile = () => {
  const socialLinks = [
    {
      name: 'Not_Z_YT',
      url: 'https://www.youtube.com/channel/UCLXXZEYOjaUgF2pSjif0k4A',
      icon: 'yt',
      iconImg: ytLogo,
      color: '#FF0000',
    },
    {
      name: '#Vibin out',
      url: 'https://open.spotify.com/user/cn9o1vvdgnh4ztde4omgb3dni',
      icon: '🎵',
      iconImg: spotifyLogo,
      color: '#1DB954',
    },
    {
      name: 'Z Ownership',
      url: 'https://zownership.carrd.co/',
      icon: '👑',
      iconImg: carrdLogo,
      color: '#FFD700',
    },
    {
      name: 'HIRE ME',
      url: 'https://discord.gg/rfMXrtNgdm',
      icon: '💼',
      iconImg: hireLogo,
      color: '#5865F2',
    },
    {
      name: 'FREE GROWTH',
      url: 'https://discord.gg/Jn7JD3RzJb',
      icon: '📈',
      iconImg: growthGif,
      color: '#00D26A',
    },
  ];

  const discordBadges = [
    { name: 'Nitro Gold', icon: '💎' },
    { name: 'Quest', icon: '🎯' },
    { name: 'Bravery', icon: '⚡' },
    { name: 'Server Boosting', icon: '🚀' },
    { name: 'Orbs', icon: '🌟' },
    { name: 'ZPM Elite Member', icon: '⚔️', className: 'zpm-sword' },
  ];

  // Ink overlay state for interactive social link animation
  const [ink, setInk] = useState<{
    active: boolean;
    color: string;
    x: number;
    y: number;
    image?: string;
  }>({
    active: false,
    color: '#FF0000',
    x: 0,
    y: 0,
    image: undefined,
  });
  const inkTimer = useRef<number | undefined>(undefined);

  const triggerInkAndOpen = (
    e: React.MouseEvent,
    url: string,
    color: string
  ) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
  // Use Roblox banner GIF (provided asset) as the link-click animation image
  setInk({ active: true, color, x, y, image: rblxBannerGif });
    // Open after 3 seconds
    window.clearTimeout(inkTimer.current);
    inkTimer.current = window.setTimeout(() => {
      window.open(url, '_blank', 'noopener');
      // small delay to remove overlay after navigation trigger
      window.setTimeout(
        () => setInk((prev) => ({ ...prev, active: false, image: undefined })),
        300
      );
    }, 3000);
  };

  return (
    <div className="profile-card discord-card">
      <div className="profile-banner">
        <img
          src="https://cdn.discordapp.com/banners/1006821954721939516/a_5e5ceee786e0c69445b37f2feda2c505.gif?size=1024&animated=true"
          alt="Discord Banner"
        />
      </div>

      <div className="profile-content">
        <div className="profile-avatar">
          <img
            src="https://cdn.discordapp.com/avatars/1006821954721939516/b446fb3e40da0a60300ffe44c62404bb.webp?size=1024"
            alt="The Z Avatar"
          />
          <div className="status-indicator online"></div>
        </div>

        <div className="profile-info">
          <h2>The Z</h2>
          <p className="profile-tagline">Discord Profile</p>

          <div className="discord-badges">
            {discordBadges.map((badge, index) => (
              <span
                key={index}
                className={`badge ${badge.className || ''}`}
                title={badge.name}
              >
                {badge.icon}
              </span>
            ))}
          </div>

          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                onClick={(e) => triggerInkAndOpen(e, link.url, link.color)}
                className="social-link"
                style={{ borderColor: link.color }}
              >
                {link.iconImg ? (
                  <img
                    src={link.iconImg}
                    alt={link.name}
                    className="social-icon"
                    style={{ width: link.name === 'HIRE ME' ? 28 : 18, height: link.name === 'HIRE ME' ? 28 : 18, objectFit: 'contain' }}
                    onError={(evt) => {
                      (evt.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="social-icon">{link.icon}</span>
                )}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      {ink.active && (
        <div
          className={`ink-overlay ${ink.image ? 'has-image' : ''}`}
          style={{
            ['--ink-color' as any]: ink.color,
            ['--ink-x' as any]: `${ink.x}px`,
            ['--ink-y' as any]: `${ink.y}px`,
            ...(ink.image ? { ['--ink-image' as any]: `url(${ink.image})` } : {}),
          }}
        />
      )}
    </div>
  );
};

export default DiscordProfile;