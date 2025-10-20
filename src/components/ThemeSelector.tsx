interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const THEMES = {
  default: {
    name: 'Default',
    gradient: 'linear-gradient(135deg, #D51A0C 0%, #3B04E0 50%, #03124C 100%)',
    preview: '#D51A0C'
  },
  sunset: {
    name: 'Sunset',
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)',
    preview: '#FF6B35'
  },
  pinkDream: {
    name: 'Pink Dream',
    gradient: 'linear-gradient(135deg, #6A0572 0%, #AB83A1 50%, #FFC0CB 100%)',
    preview: '#6A0572'
  },
  nature: {
    name: 'Nature',
    gradient: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 50%, #90EE90 100%)',
    preview: '#2E8B57'
  },
  ocean: {
    name: 'Ocean',
    gradient: 'linear-gradient(135deg, #4169E1 0%, #1E90FF 50%, #87CEEB 100%)',
    preview: '#4169E1'
  },
  love: {
    name: 'Love',
    gradient: 'linear-gradient(135deg, #DC143C 0%, #FF1493 50%, #FF69B4 100%)',
    preview: '#DC143C'
  }
};

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="theme-selector">
      <label>Theme:</label>
      <div className="theme-options">
        {Object.entries(THEMES).map(([key, theme]) => (
          <button
            key={key}
            className={`theme-option ${currentTheme === key ? 'active' : ''}`}
            onClick={() => onThemeChange(key)}
            style={{ backgroundColor: theme.preview }}
            title={theme.name}
          >
            <div 
              className="theme-preview" 
              style={{ background: theme.gradient }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;