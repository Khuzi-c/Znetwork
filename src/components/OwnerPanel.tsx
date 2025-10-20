import { useState } from 'react';
import ThemeSelector from './ThemeSelector';

interface OwnerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogin: (status: boolean) => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const OwnerPanel: React.FC<OwnerPanelProps> = ({ 
  isOpen, 
  onClose, 
  isLoggedIn, 
  onLogin,
  currentTheme,
  onThemeChange
}) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const OWNER_PASSWORD = 'ZNetwork2024!'; // Change this to your desired password

  const [loginError, setLoginError] = useState('');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === OWNER_PASSWORD) {
      onLogin(true);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    // In a real app, you would update this in a secure backend
    alert('Password changed successfully! (This is a demo - password not actually changed)');
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePassword(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto glow-hover" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <h2 className="text-2xl font-bold text-white">Owner</h2>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>×</button>
        </div>
        <div className="p-6 space-y-6">
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-white">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholder="Enter owner password"
                  required
                />
                {loginError && <p className="text-red-400 text-sm mt-2">{loginError}</p>}
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Login</button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-green-400">Authenticated ✔</div>
              <div>
                <h3 className="text-white font-semibold mb-2">Theme Settings</h3>
                <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Security</h3>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg" onClick={() => setShowChangePassword(!showChangePassword)}>
                  {showChangePassword ? 'Cancel' : 'Change Password'}
                </button>
                {showChangePassword && (
                  <form onSubmit={handlePasswordChange} className="space-y-3 mt-4">
                    <div>
                      <label className="block text-sm mb-1 text-white">New Password</label>
                      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white" minLength={8} required />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-white">Confirm Password</label>
                      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white" minLength={8} required />
                    </div>
                    <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update Password</button>
                  </form>
                )}
              </div>
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={() => { onLogin(false); onClose(); }}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerPanel;