import rblxBanner from '../../img-assets/rblx banner.gif';

const RobloxProfile = () => {
  const robloxProfileUrl = "https://www.roblox.com/users/4594098890/profile";
  const robloxBadges = [
    {
      name: "Veteran Badge",
      image: "https://images.rbxcdn.com/b7e6cabb5a1600d813f5843f37181fa3.png"
    },
    {
      name: "Friendship Badge",
      image: "https://images.rbxcdn.com/5eb20917cf530583e2641c0e1f7ba95e.png"
    },
    {
      name: "Carrot Connoisseur",
      image: "https://tr.rbxcdn.com/180DAY-fa39f31f541ca982cdc4615d972eb737/420/420/Image/Png/noFilter"
    },
    {
      name: "T Badge",
      image: "https://tr.rbxcdn.com/180DAY-868e08f483d089c3d289afa4cf7d3af9/150/150/Image/Webp/noFilter"
    },
    {
      name: "R Badge",
      image: "https://tr.rbxcdn.com/180DAY-32133b4fa2dacbb14282ae00da01fe4e/150/150/Image/Webp/noFilter"
    },
    {
      name: "A Badge",
      image: "https://tr.rbxcdn.com/180DAY-8bd2027f15c1cfcb391b1d43aabaa98e/150/150/Image/Webp/noFilter"
    },
    {
      name: "D Badge",
      image: "https://tr.rbxcdn.com/180DAY-f37d0fd92487f8dc5d01d8b040ecfb8e/150/150/Image/Webp/noFilter"
    },
    {
      name: "E Badge",
      image: "https://tr.rbxcdn.com/180DAY-5c6e22c166246dc774fdeefbc82a66d3/150/150/Image/Webp/noFilter"
    }
  ];

  return (
    <div className="profile-card roblox-card">
      <div className="profile-banner roblox-banner">
        <img
          src={rblxBanner}
          alt="Roblox Banner"
          className="roblox-full-body"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>

      <div className="profile-content">
        {/* Avatar in its original position */}
        <div className="profile-avatar">
          <img
            src="https://tr.rbxcdn.com/30DAY-AvatarHeadshot-209DF32D3DD5383D22A2CF4EBB6BC8B1-Png/150/150/AvatarHeadshot/Webp/noFilter"
            alt="ZayyTheSlayer444 Avatar"
          />
        </div>

        <div className="profile-info">
          <h2>ZayyTheSlayer444</h2>
          <p className="profile-tagline">@ZayyTheSlayer444</p>
          <p className="join-date">Joined: 2020</p>
          
          <a
            href={robloxProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="roblox-profile-btn"
          >
            Visit Roblox Profile
          </a>
          
          <div className="roblox-badges">
            {robloxBadges.map((badge, index) => (
              <div key={index} className="roblox-badge letter-badge" title={badge.name}>
                <img src={badge.image} alt={badge.name} />
              </div>
            ))}
          </div>

          {/* Replica of what is in the banner (placed below badges) */}
          <div className="roblox-banner-gif" style={{ marginTop: 16 }}>
            <img src={rblxBanner} alt="Roblox banner content" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobloxProfile;