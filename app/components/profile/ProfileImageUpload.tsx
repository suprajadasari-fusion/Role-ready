import React, { useRef } from 'react';
import { FiCamera, FiUpload, FiUser } from 'react-icons/fi';

interface ProfileImageUploadProps {
  avatarUrl: string;
  isEditing: boolean;
  onPhotoChange: (newPhotoUrl: string) => void;
  isDarkMode?: boolean;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  avatarUrl,
  isEditing,
  onPhotoChange,
  isDarkMode = false
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit. Please choose a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onPhotoChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group inline-block">
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt="User Profile" 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <FiUser className="w-12 h-12 text-slate-400" />
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
            className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-2xl shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer border-2 border-white dark:border-slate-800"
            title="Change / Upload Photo"
          >
            <FiCamera className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
};
