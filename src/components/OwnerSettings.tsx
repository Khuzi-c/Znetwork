import React, { useState } from 'react';
import { Settings, X, Eye, EyeOff, Palette } from 'lucide-react';

interface OwnerSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordChange: (oldPassword: string, newPassword: string) => boolean;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { id: 'default', name: 'Red-Blue Gradient', colors: 'from-red-500 via-purple-600 to-blue-800' },
  { id: 'purple', name: 'Purple Dreams', colors: 'from-purple-900 via-purple-600 to-indigo-800' },
  { id: 'green', name: 'Matrix Green', colors: 'from-green-900 via-green-600 to-emerald-800' },
  { id: 'orange', name: 'Sunset Orange', colors: 'from-orange-900 via-orange-600 to-red-800' },
  { id: 'blue', name: 'Ocean Blue', colors: 'from-blue-900 via-blue-600 to-cyan-800' },
  { id: 'dark', name: 'Dark Mode', colors: 'from-gray-900 via-gray-800 to-black' },
];

export const OwnerSettings: React.FC<OwnerSettingsProps> = ({
  isOpen,
  onClose,
  onPasswordChange,
  currentTheme,
  onThemeChange,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    const success = onPasswordChange(oldPassword, newPassword);
    if (success) {
      setSuccess('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 2000);
    } else {
      setError('Current password is incorrect');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto glow-hover">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Settings size={24} />
            <span>Owner Settings</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Theme Selection */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Palette size={20} />
              <span>Website Theme</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onThemeChange(theme.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currentTheme === theme.id
                      ? 'border-purple-500 bg-purple-500 bg-opacity-20'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className={`w-full h-8 rounded mb-2 bg-gradient-to-r ${theme.colors}`}></div>
                  <p className="text-white font-medium">{theme.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Password Change */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Current Password */}
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-white mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-black bg-opacity-30 text-white placeholder-gray-400"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-white mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-black bg-opacity-30 text-white placeholder-gray-400"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-black bg-opacity-30 text-white placeholder-gray-400"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="futuristic-btn"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
