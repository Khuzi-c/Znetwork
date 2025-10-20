import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #D51A0C 0%, #3B04E0 50%, #03124C 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h2>Loading Za Website...</h2>
          <p>Initializing Discord server discovery platform</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #D51A0C 0%, #3B04E0 50%, #03124C 100%)',
      color: 'white',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '1rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>Za Website</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Search servers..."
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: 'white',
                outline: 'none'
              }}
            />
            <button style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              color: 'white',
              cursor: 'pointer'
            }}>
              Owner Panel
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Profile Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>About Me</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Discord Profile Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 style={{ color: '#5865F2', marginBottom: '1rem' }}>🎮 Discord Profile</h3>
              <div style={{ textAlign: 'center' }}>
                <img
                  src="https://cdn.discordapp.com/avatars/1006821954721939516/b446fb3e40da0a60300ffe44c62404bb.webp?size=128"
                  alt="Discord Avatar"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                    border: '3px solid #5865F2'
                  }}
                />
                <h4 style={{ margin: '0.5rem 0' }}>The Z</h4>
                <p style={{ margin: '0.5rem 0', opacity: 0.8 }}>💻 Coding amazing projects</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                  <span title="Nitro Gold">💎</span>
                  <span title="Quest">🎯</span>
                  <span title="Bravery">⚡</span>
                  <span title="Server Boosting">🚀</span>
                  <span title="Orbs">🌟</span>
                </div>
              </div>
            </div>

            {/* Roblox Profile Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 style={{ color: '#00A2FF', marginBottom: '1rem' }}>🎯 Roblox Profile</h3>
              <div style={{ textAlign: 'center' }}>
                <img
                  src="https://tr.rbxcdn.com/30DAY-AvatarHeadshot-209DF32D3DD5383D22A2CF4EBB6BC8B1-Png/150/150/AvatarHeadshot/Webp/noFilter"
                  alt="Roblox Avatar"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                    border: '3px solid #00A2FF'
                  }}
                />
                <h4 style={{ margin: '0.5rem 0' }}>ZayyTheSlayer444</h4>
                <p style={{ margin: '0.5rem 0', opacity: 0.8 }}>Joined: 2020</p>
                <a
                  href="https://www.roblox.com/users/4594098890/profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    background: '#00A2FF',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Server Discovery Section */}
        <section>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem'
          }}>
            <h2>Discord Server Discovery</h2>
            <button style={{
              background: '#5865F2',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Add Server
            </button>
          </div>

          {/* Featured Server - Khxzi's Dev Services */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px solid #FFD700',
            boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)',
            marginBottom: '2rem',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: '#FFD700',
              color: '#000',
              padding: '0.25rem 0.75rem',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              ⭐ FEATURED
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginTop: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                border: '2px solid #FFD700'
              }}>
                ⚡
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, color: '#FFD700' }}>Khxzi's Dev Services</h3>
                  <span style={{
                    background: '#8B5CF6',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    Dev Khxzi
                  </span>
                </div>
                
                <p style={{ margin: '0 0 1rem 0', opacity: 0.9, lineHeight: 1.5 }}>
                  🚀 Professional Development Services | 💻 Custom Bots & Websites | 🎨 UI/UX Design | 📱 Mobile Apps | 🛠️ Full-Stack Solutions | ⚡ Fast Delivery | 💯 Satisfaction Guaranteed
                </p>
                
                <a
                  href="https://discord.gg/THbZwYpsJs"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    background: '#5865F2',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  Join Server
                </a>
              </div>
            </div>
          </div>

          {/* Placeholder for other servers */}
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ marginBottom: '1rem', opacity: 0.8 }}>More Servers Coming Soon!</h3>
            <p style={{ opacity: 0.6 }}>Add your Discord server to get discovered by the community</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: '4rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '2rem 0',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, opacity: 0.7 }}>
          © 2024 Z Network. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;