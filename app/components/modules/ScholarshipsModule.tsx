import { useState } from 'react';
import { 
  FaAward, 
  FaMagnifyingGlass, 
  FaCircleCheck, 
  FaCircleExclamation, 
  FaPaperPlane 
} from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '~/store/store';
import { applyScholarship, setSelectedCategory } from '~/store/slices/scholarshipsSlice';
import { addNotification } from '~/store/slices/notificationsSlice';
import { scholarshipApplicationSchema } from '~/lib/validation';
import { ScholarshipItem } from '~/lib/apiService';

interface ScholarshipsModuleProps {
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const ScholarshipsModule: React.FC<ScholarshipsModuleProps> = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const { items: scholarshipsList, appliedIds, selectedCategory } = useAppSelector(state => state.scholarships);
  const [selectedScholarship, setSelectedScholarship] = useState<ScholarshipItem | null>(null);

  // Form State & Zod Errors for Application Modal
  const [formData, setFormData] = useState({
    gpaOrPercentage: '9.4',
    annualFamilyIncome: '₹4.5 LPA',
    statementOfPurpose: 'I am passionate about applying artificial intelligence and neural computing to solve critical societal challenges...'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filteredScholarships = scholarshipsList.filter(s => {
    return selectedCategory === 'All' || s.category === selectedCategory;
  });

  const cardClass = isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-xs';
  const subCardClass = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-blue-50/40 border-blue-100';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedScholarship) return;

    const result = scholarshipApplicationSchema.safeParse({
      scholarshipId: selectedScholarship.id,
      studentName: 'Alex Rivera',
      ...formData
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }

    // Success dispatch
    dispatch(applyScholarship(selectedScholarship.id));
    dispatch(addNotification({
      title: 'Scholarship Application Submitted',
      message: `Your application for "${selectedScholarship.name}" has been received!`,
      category: 'scholarship'
    }));

    onShowToast(`Successfully submitted application for ${selectedScholarship.name}!`);
    setSelectedScholarship(null);
    setFormErrors({});
  };

  return (
    <div role="main" aria-label="Scholarships and Merit Grants Portal" className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`}>
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaAward className="w-5 h-5 text-blue-500" /> Scholarships & Institutional Merit Grants Desk
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore active fellowships, merit grants, and STEM scholarship opportunities with 1-click application tracking.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2">
          {['All', 'Merit', 'STEM', 'Equity'].map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setSelectedCategory(cat))}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : isDarkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-blue-50 text-slate-700 hover:bg-blue-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List of Scholarships */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredScholarships.map((sch) => {
          const isApplied = appliedIds.includes(sch.id);
          return (
            <div key={sch.id} className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${subCardClass}`}>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20">
                    {sch.provider}
                  </span>
                  <span className="text-emerald-400 text-xs font-bold bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    {sch.fitScore}% Fit
                  </span>
                </div>

                <h3 className="font-semibold text-base leading-snug">{sch.name}</h3>
                <div className="text-emerald-400 font-bold text-lg">{sch.amount}</div>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{sch.description}</p>
                <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <strong>Eligibility:</strong> {sch.eligibility}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/50 flex justify-between items-center">
                <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Deadline: {sch.deadline}</span>
                {isApplied ? (
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1">
                    <FaCircleCheck className="w-3.5 h-3.5" /> Applied
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedScholarship(sch);
                      setFormErrors({});
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    <FaPaperPlane className="w-3 h-3" /> Direct Apply
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Modal with Zod Validation */}
      {selectedScholarship && (
        <div role="dialog" aria-modal="true" aria-labelledby="sch-modal-title" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-5 ${cardClass}`}>
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs text-blue-400 font-semibold">{selectedScholarship.provider}</span>
                <h3 id="sch-modal-title" className="text-lg font-bold text-white">{selectedScholarship.name}</h3>
              </div>
              <button onClick={() => setSelectedScholarship(null)} className="text-slate-400 hover:text-white font-bold p-1 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Current Academic Score / GPA</label>
                <input
                  type="text"
                  value={formData.gpaOrPercentage}
                  onChange={(e) => setFormData({ ...formData, gpaOrPercentage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.gpaOrPercentage && (
                  <span className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                    <FaCircleExclamation className="w-3 h-3" /> {formErrors.gpaOrPercentage}
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Annual Family Income Bracket</label>
                <input
                  type="text"
                  value={formData.annualFamilyIncome}
                  onChange={(e) => setFormData({ ...formData, annualFamilyIncome: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.annualFamilyIncome && (
                  <span className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                    <FaCircleExclamation className="w-3 h-3" /> {formErrors.annualFamilyIncome}
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Statement of Purpose (SOP)</label>
                <textarea
                  rows={4}
                  value={formData.statementOfPurpose}
                  onChange={(e) => setFormData({ ...formData, statementOfPurpose: e.target.value })}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.statementOfPurpose && (
                  <span className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                    <FaCircleExclamation className="w-3 h-3" /> {formErrors.statementOfPurpose}
                  </span>
                )}
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedScholarship(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
                >
                  Submit Official Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
