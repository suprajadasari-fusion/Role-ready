import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  FaBullhorn, 
  FaCheck, 
  FaTrash, 
  FaBriefcase, 
  FaAward, 
  FaBrain, 
  FaBookOpen,
  FaArrowRight,
  FaXmark,
  FaCircleCheck,
  FaArrowRightToBracket
} from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '~/store/store';
import { markAsRead, markAllAsRead, clearAllNotifications } from '~/store/slices/notificationsSlice';
import { NotificationItem } from '~/lib/apiService';

interface NotificationsModuleProps {
  onShowToast: (msg: string) => void;
  onNavigateView?: (view: string) => void;
  isDarkMode?: boolean;
}

export const NotificationsModule: React.FC<NotificationsModuleProps> = ({ 
  onShowToast, 
  onNavigateView,
  isDarkMode = true 
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items: notifList, unreadCount } = useAppSelector(state => state.notifications);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null);

  const cardClass = isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-xs';
  const subCardClass = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-blue-50/40 border-blue-100';

  const filteredNotifs = notifList.filter(n => {
    return activeCategory === 'All' || n.category === activeCategory.toLowerCase();
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'interview': return <FaBrain className="w-4 h-4 text-purple-400" />;
      case 'jobs': return <FaBriefcase className="w-4 h-4 text-blue-400" />;
      case 'scholarship': return <FaAward className="w-4 h-4 text-emerald-400" />;
      case 'learning': return <FaBookOpen className="w-4 h-4 text-amber-400" />;
      default: return <FaBullhorn className="w-4 h-4 text-blue-400" />;
    }
  };

  const handleNavigateToUrl = (actionUrl?: string) => {
    if (!actionUrl) return;
    const cleanView = actionUrl.replace(/^\//, '');
    if (onNavigateView) {
      onNavigateView(cleanView);
    } else {
      navigate(`/${cleanView}`);
    }
  };

  const handleNotificationClick = (n: NotificationItem) => {
    dispatch(markAsRead(n.id));
    setSelectedNotif(n);
  };

  return (
    <div role="main" aria-label="Central Notifications Center" className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`}>
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaBullhorn className="w-5 h-5 text-blue-500" /> Notifications & Platform System Alerts
            {unreadCount > 0 && (
              <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            )}
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Real-time updates on job applications, interview schedules, scholarships, and learning milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              dispatch(markAllAsRead());
              onShowToast('Marked all notifications as read!');
            }}
            className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 font-medium text-xs px-3.5 py-2 rounded-xl transition cursor-pointer border border-blue-500/30 flex items-center gap-1.5"
          >
            <FaCheck className="w-3 h-3" /> Mark All as Read
          </button>
          <button
            onClick={() => {
              dispatch(clearAllNotifications());
              onShowToast('Cleared all notifications.');
            }}
            className="bg-slate-800 text-slate-400 hover:text-white font-medium text-xs px-3.5 py-2 rounded-xl transition cursor-pointer border border-slate-700 flex items-center gap-1.5"
          >
            <FaTrash className="w-3 h-3" /> Clear All
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Interview', 'Jobs', 'Scholarship', 'Learning', 'System'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeCategory === cat
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

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className={`p-8 text-center rounded-2xl border ${cardClass}`}>
            <p className="text-sm text-slate-400">No notifications found in this category.</p>
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 hover:-translate-y-0.5 ${
                !n.isRead 
                  ? 'bg-blue-950/40 border-blue-500/40 shadow-md' 
                  : subCardClass
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                  {getCategoryIcon(n.category)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-white">{n.title}</h3>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    )}
                  </div>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{n.message}</p>
                  <span className="text-[11px] text-slate-400 mt-1 block">{n.timestamp}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(markAsRead(n.id));
                  if (n.actionUrl) {
                    handleNavigateToUrl(n.actionUrl);
                  } else {
                    setSelectedNotif(n);
                  }
                }}
                className="bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white px-3 py-1.5 rounded-xl border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer"
              >
                <span>View Details</span>
                <FaArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* NOTIFICATION DETAILS PREVIEW MODAL */}
      {selectedNotif && (
        <div role="dialog" aria-modal="true" aria-labelledby="notif-modal-title" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-5 ${cardClass}`}>
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                  {getCategoryIcon(selectedNotif.category)}
                </div>
                <div>
                  <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">{selectedNotif.category} Alert</span>
                  <h3 id="notif-modal-title" className="text-lg font-bold text-white">{selectedNotif.title}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedNotif(null)} 
                aria-label="Close notification modal"
                className="text-slate-400 hover:text-white font-bold p-1 cursor-pointer"
              >
                <FaXmark className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <span className="text-xs text-slate-400 block font-mono">Timestamp: {selectedNotif.timestamp}</span>
                <p className="text-sm text-slate-200 leading-relaxed">{selectedNotif.message}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <FaCircleCheck className="w-3.5 h-3.5" /> Marked as Read
                </span>
                <span>ID: {selectedNotif.id}</span>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedNotif(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer"
              >
                Close
              </button>
              {selectedNotif.actionUrl && (
                <button
                  type="button"
                  onClick={() => {
                    const url = selectedNotif.actionUrl;
                    setSelectedNotif(null);
                    handleNavigateToUrl(url);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
                >
                  <FaArrowRightToBracket className="w-3.5 h-3.5" /> Go to Module
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
