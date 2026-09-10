import React, { useRef } from 'react';
import { FiCamera, FiUser } from 'react-icons/fi';
import { uploadProfileAttachment } from '../../lib/api';

interface ProfileImageUploadProps {
  avatarUrl?: string | null;
  name?: string;
  isEditing: boolean;
  onPhotoChange: (newPhotoUrl: string) => void;
  isDarkMode?: boolean;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  avatarUrl,
  name,
  isEditing,
  onPhotoChange,
  isDarkMode = false
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const initials = (name || 'RR')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'RR';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit. Please choose a smaller image.");
        return;
      }
      try {
        setIsUploading(true);
        const res = await uploadProfileAttachment(file);
        setIsUploading(false);
        if (res && res.url) {
          onPhotoChange(res.url);
        }
      } catch (err: any) {
        setIsUploading(false);
        console.warn("Direct upload error, using local data preview:", err);
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            onPhotoChange(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="relative group inline-block shrink-0">
      <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl overflow-hidden ring-4 shadow-xl flex items-center justify-center relative transition-all duration-300 ${
        isDarkMode ? 'ring-slate-900 bg-slate-800' : 'ring-white bg-slate-100'
      }`}>
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={name || "User Profile"} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white font-bold text-2xl sm:text-3xl flex items-center justify-center tracking-wider shadow-inner">
            {initials}
          </div>
        )}

        {/* Loading Spinner Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
            <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {isEditing && (
        <>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1.5 -right-1.5 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer border-2 border-white dark:border-slate-900"
            title="Upload or Change Photo"
            aria-label="Upload or Change Photo"
          >
            <FiCamera className="w-3.5 h-3.5" />
          </button>
        </>
      )}
    </div>
  );
};
