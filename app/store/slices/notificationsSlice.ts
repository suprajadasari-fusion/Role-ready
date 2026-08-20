import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationItem } from '~/lib/apiService';

interface NotificationsState {
  items: NotificationItem[];
  unreadCount: number;
}

const initialItems: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'AI Interview Practice Ready',
    message: 'Your AI Mock Interview for "Junior AI Architect" is generated.',
    category: 'interview',
    timestamp: '10 mins ago',
    isRead: false,
    actionUrl: '/interview-ai'
  },
  {
    id: 'notif-2',
    title: 'High AI Fit Job Posting (96%)',
    message: 'NeuralCorp AI Labs posted "Junior AI & Deep Learning Engineer".',
    category: 'jobs',
    timestamp: '1 hour ago',
    isRead: false,
    actionUrl: '/jobs'
  },
  {
    id: 'notif-3',
    title: 'Scholarship Application Update',
    message: 'Stage 1 verified for National STEM Fellowship grant.',
    category: 'scholarship',
    timestamp: '3 hours ago',
    isRead: true,
    actionUrl: '/scholarships'
  },
  {
    id: 'notif-4',
    title: '14-Day Study Streak Badge',
    message: 'You earned the Study Streak Gold Badge in Learning Center.',
    category: 'learning',
    timestamp: 'Yesterday',
    isRead: true,
    actionUrl: '/learning-center'
  }
];

const initialState: NotificationsState = {
  items: initialItems,
  unreadCount: initialItems.filter(i => !i.isRead).length
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter(i => !i.isRead).length;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && !item.isRead) {
        item.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach(i => { i.isRead = true; });
      state.unreadCount = 0;
    },
    addNotification: (state, action: PayloadAction<Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>>) => {
      const newNotif: NotificationItem = {
        ...action.payload,
        id: `notif-${Date.now()}`,
        timestamp: 'Just now',
        isRead: false
      };
      state.items.unshift(newNotif);
      state.unreadCount += 1;
    },
    clearAllNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    }
  }
});

export const { setNotifications, markAsRead, markAllAsRead, addNotification, clearAllNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
