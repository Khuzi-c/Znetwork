import React, { useCallback, useState } from 'react';

export interface SimpleImageUploadProps {
  label: string;
  value: string;
  onChange: (imageData: string) => void;
}

export const SimpleImageUpload: React.FC<SimpleImageUploadProps> = ({ label, value, onChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [url, setUrl] = useState(value || '');

  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return alert('Please select an image file');
    if (file.size > 5 * 1024 * 1024) return alert('Max size is 5MB');
    const b64 = await toBase64(file);
    onChange(b64);
    setUrl('');
  };

  const onInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) await handleFile(f);
  }, []);

  const onDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) await handleFile(f);
  }, []);

  const applyUrl = () => {
    if (!url) return;
    try {
      new URL(url);
      onChange(url);
    } catch {
      alert('Enter a valid image URL');
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-300">{label}</p>
      <div
        className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${dragActive ? 'border-blue-400 bg-white/10' : 'border-gray-600 bg-gray-800'}`}
        onDragEnter={() => setDragActive(true)}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
      >
        {value ? (
          <img src={value} alt="preview" className="max-h-40 mx-auto rounded-lg" />
        ) : (
          <>
            <p className="text-gray-300">Drag & drop image here</p>
            <p className="text-gray-500 text-sm">or click to browse</p>
            <input type="file" accept="image/*" onChange={onInput} className="mt-3" />
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="url"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button type="button" onClick={applyUrl} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Use URL</button>
      </div>
    </div>
  );
};

export default SimpleImageUpload;
