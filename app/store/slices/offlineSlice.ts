import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OfflineState {
  isOnline: boolean;
  lastSyncedTimestamp: number;
  syncQueueCount: number;
}

const initialState: OfflineState = {
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  lastSyncedTimestamp: Date.now(),
  syncQueueCount: 0
};

export const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
      if (action.payload) {
        state.lastSyncedTimestamp = Date.now();
        state.syncQueueCount = 0;
      }
    },
    addToSyncQueue: (state) => {
      state.syncQueueCount += 1;
    }
  }
});

export const { setOnlineStatus, addToSyncQueue } = offlineSlice.actions;
export default offlineSlice.reducer;
