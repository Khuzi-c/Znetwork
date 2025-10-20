import { useState, useCallback } from 'react';

interface ImageUploadProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pfp_url: '',
    banner_url: '',
    invite_url: ''
  });
  
  const [dragActive, setDragActive] = useState({ pfp: false, banner: false });
  const [previews, setPreviews] = useState({ pfp: '', banner: '' });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleDrag = useCallback((e: React.DragEvent, type: 'pfp' | 'banner') => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => ({ ...prev, [type]: true }));
    } else if (e.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [type]: false }));
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent, type: 'pfp' | 'banner') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [type]: false }));

    const files = Array.from(e.dataTransfer.files);
    if (files && files[0]) {
      await handleFile(files[0], type);
    }
  }, []);

  const handleFile = async (file: File, type: 'pfp' | 'banner') => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setFormData(prev => ({ 
        ...prev, 
        [type === 'pfp' ? 'pfp_url' : 'banner_url']: base64 
      }));
      setPreviews(prev => ({ ...prev, [type]: base64 }));
    } catch (error) {
      console.error('Error converting file:', error);
      alert('Error processing file');
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>, type: 'pfp' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file, type);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pfp_url || !formData.banner_url) {
      alert('Please upload both profile picture and banner');
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form className="image-upload-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Server Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label>Discord Invite URL</label>
        <input
          type="url"
          value={formData.invite_url}
          onChange={(e) => setFormData(prev => ({ ...prev, invite_url: e.target.value }))}
          required
        />
      </div>

      <div className="image-uploads">
        {/* Profile Picture Upload */}
        <div className="image-upload-section">
          <label>Profile Picture</label>
          <div 
            className={`drop-zone ${dragActive.pfp ? 'drag-active' : ''}`}
            onDragEnter={(e) => handleDrag(e, 'pfp')}
            onDragLeave={(e) => handleDrag(e, 'pfp')}
            onDragOver={(e) => handleDrag(e, 'pfp')}
            onDrop={(e) => handleDrop(e, 'pfp')}
          >
            {previews.pfp ? (
              <img src={previews.pfp} alt="Profile preview" className="image-preview" />
            ) : (
              <div className="drop-message">
                <p>Drag & drop profile picture here</p>
                <p>or</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInput(e, 'pfp')}
                  className="file-input"
                />
                <button type="button" className="browse-btn">Browse Files</button>
              </div>
            )}
          </div>
        </div>

        {/* Banner Upload */}
        <div className="image-upload-section">
          <label>Banner Image</label>
          <div 
            className={`drop-zone ${dragActive.banner ? 'drag-active' : ''}`}
            onDragEnter={(e) => handleDrag(e, 'banner')}
            onDragLeave={(e) => handleDrag(e, 'banner')}
            onDragOver={(e) => handleDrag(e, 'banner')}
            onDrop={(e) => handleDrop(e, 'banner')}
          >
            {previews.banner ? (
              <img src={previews.banner} alt="Banner preview" className="image-preview banner-preview" />
            ) : (
              <div className="drop-message">
                <p>Drag & drop banner image here</p>
                <p>or</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInput(e, 'banner')}
                  className="file-input"
                />
                <button type="button" className="browse-btn">Browse Files</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Add Server
        </button>
      </div>
    </form>
  );
};

export default ImageUpload;