import React, { useState } from 'react';
import { FiX, FiCpu, FiPlus } from 'react-icons/fi';

interface ActionModalProps {
  isOpen: boolean;
  title: string;
  subtitle: string;
  fields: Array<{ label: string; name: string; type: string; placeholder: string }>;
  onClose: () => void;
  onSubmit: (data: Record<string, string>) => void;
  isDarkMode?: boolean;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  title,
  subtitle,
  fields,
  onClose,
  onSubmit,
  isDarkMode = true
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(formData);
      setFormData({});
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const cardBg = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-2xl'
    : 'bg-white border-blue-100 text-slate-900 shadow-2xl';

  const headerBg = isDarkMode
    ? 'bg-slate-950/40 border-slate-800'
    : 'bg-blue-50/60 border-blue-100';

  const inputBg = isDarkMode
    ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-400 focus:ring-blue-500'
    : 'bg-slate-50 border-blue-200 text-slate-900 placeholder-slate-400 focus:ring-blue-500 focus:bg-white';

  const labelColor = isDarkMode ? 'text-slate-300' : 'text-slate-700';
  const subtitleColor = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const titleColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-blue-100';

  const cancelBtnClass = isDarkMode
    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
    : 'border-blue-200 text-slate-700 hover:bg-blue-50';

  const closeIconClass = isDarkMode
    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
    : 'text-slate-400 hover:text-slate-800 hover:bg-blue-50';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in font-sans ${
      isDarkMode ? 'bg-slate-950/70' : 'bg-slate-900/40'
    }`}>
      <div className={`border rounded-3xl max-w-md w-full overflow-hidden relative animate-scale-up ${cardBg}`}>
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between ${headerBg}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-500 border border-blue-500/30 flex items-center justify-center">
              <FiCpu className="w-5 h-5 text-blue-500" />
            </div>
            <div>
<<<<<<< HEAD
              <h3 className={`font-semibold text-base tracking-tight ${titleColor}`}>{title}</h3>
              <p className={`text-xs font-normal ${subtitleColor}`}>{subtitle}</p>
=======
              <h3 className={`font-bold text-base tracking-tight ${titleColor}`}>{title}</h3>
              <p className={`text-xs ${subtitleColor}`}>{subtitle}</p>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`p-2 rounded-xl transition cursor-pointer ${closeIconClass}`}
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className={`block text-[13px] font-medium mb-1.5 ${labelColor}`}>{f.label}</label>
              <input
                type={f.type}
                required
                value={formData[f.name] || ''}
                onChange={(e) => handleChange(f.name, e.target.value)}
                placeholder={f.placeholder}
                className={`w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`}
              />
            </div>
          ))}

          <div className={`pt-4 flex items-center justify-end gap-3 border-t ${borderDivider}`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition cursor-pointer ${cancelBtnClass}`}
            >
              Cancel
            </button>
            <button
              type="submit"
<<<<<<< HEAD
              className="px-5 py-2.5 rounded-xl bg-[#12163A] hover:bg-[#1A2050] text-white text-sm font-medium transition shadow-md cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95"
=======
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#12163A] hover:bg-[#1A2050] text-white font-bold transition shadow-md cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            >
              <FiPlus className="w-4 h-4 text-[#3665EE]" />
              <span>{isSubmitting ? 'Saving...' : 'Submit & Save'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
