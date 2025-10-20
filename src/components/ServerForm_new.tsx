import React, { useState, useEffect } from 'react';
import { Server, ServerInsert } from '../lib/supabase';
import { X, Save, Plus } from 'lucide-react';
import SimpleImageUpload from './SimpleImageUpload';

interface ServerFormProps {
  server?: Server | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ServerInsert) => Promise<void>;
}

export const ServerForm: React.FC<ServerFormProps> = ({ server, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ServerInsert>({
    name: '',
    description: '',
    pfp_url: '',
    banner_url: '',
    invite_url: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ServerInsert>>({});

  const isEditing = !!server;

  useEffect(() => {
    if (server) {
      setFormData({
        name: server.name,
        description: server.description,
        pfp_url: server.pfp_url,
        banner_url: server.banner_url,
        invite_url: server.invite_url,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        pfp_url: '',
        banner_url: '',
        invite_url: '',
      });
    }
  }, [server, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ServerInsert]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = (field: 'pfp_url' | 'banner_url', imageData: string) => {
    setFormData(prev => ({ ...prev, [field]: imageData }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ServerInsert> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Server name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.invite_url.trim()) {
      newErrors.invite_url = 'Invite URL is required';
    } else if (!isValidUrl(formData.invite_url)) {
      newErrors.invite_url = 'Please enter a valid URL';
    }

    if (formData.pfp_url && !isValidImageData(formData.pfp_url)) {
      newErrors.pfp_url = 'Please provide a valid image URL or upload an image';
    }

    if (formData.banner_url && !isValidImageData(formData.banner_url)) {
      newErrors.banner_url = 'Please provide a valid image URL or upload an image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidImageData = (data: string): boolean => {
    return data.startsWith('data:image/') || isValidUrl(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanData: ServerInsert = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        pfp_url: formData.pfp_url || '',
        banner_url: formData.banner_url || '',
        invite_url: formData.invite_url || '',
      };
      
      console.log('Submitting server data:', cleanData);
      await onSubmit(cleanData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error saving server: ' + (error as any)?.message);
    } finally {
      setIsSubmitting(false);
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
        {/* Form Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            {isEditing ? <Save size={24} /> : <Plus size={24} />}
            <span>{isEditing ? 'Edit Server' : 'Add New Server'}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Server Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Server Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter server name"
              maxLength={100}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Describe your server..."
              maxLength={500}
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Server Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Server Profile Picture
            </label>
            <SimpleImageUpload
              label="Upload server profile picture or enter URL"
              value={formData.pfp_url}
              onChange={(imageData: string) => handleImageUpload('pfp_url', imageData)}
            />
          </div>

          {/* Server Banner */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Server Banner
            </label>
            <SimpleImageUpload
              label="Upload server banner or enter URL"
              value={formData.banner_url}
              onChange={(imageData: string) => handleImageUpload('banner_url', imageData)}
            />
          </div>

          {/* Invite URL */}
          <div>
            <label htmlFor="invite_url" className="block text-sm font-medium text-white mb-2">
              Discord Invite URL *
            </label>
            <input
              type="url"
              id="invite_url"
              name="invite_url"
              value={formData.invite_url}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="https://discord.gg/your-invite"
            />
            {errors.invite_url && <p className="text-red-400 text-sm mt-1">{errors.invite_url}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-600">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>{isEditing ? 'Update Server' : 'Add Server'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
