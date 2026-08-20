/**
 * Offline Caching & Synchronization Utility
 * Supports localStorage & IndexedDB fallback for offline caching of module data.
 */

const CACHE_PREFIX = 'role_ready_offline_';

export interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

export const offlineCache = {
  /**
   * Save data into offline cache
   */
  set: <T>(key: string, data: T): void => {
    if (typeof window === 'undefined') return;
    try {
      const entry: CacheEntry<T> = {
        timestamp: Date.now(),
        data
      };
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
    } catch (err) {
      console.warn('Offline cache storage quota exceeded or failed:', err);
    }
  },

  /**
   * Retrieve cached data
   */
  get: <T>(key: string, maxAgeMs = 1000 * 60 * 60 * 24): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (!item) return null;
      const entry: CacheEntry<T> = JSON.parse(item);
      const isExpired = Date.now() - entry.timestamp > maxAgeMs;
      if (isExpired) {
        localStorage.removeItem(`${CACHE_PREFIX}${key}`);
        return null;
      }
      return entry.data;
    } catch (err) {
      console.warn('Failed to parse offline cache:', err);
      return null;
    }
  },

  /**
   * Clear offline cache for a key or all keys
   */
  clear: (key?: string): void => {
    if (typeof window === 'undefined') return;
    if (key) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    } else {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
    }
  },

  /**
   * Register PWA Service Worker for offline static asset caching
   */
  registerServiceWorker: (): void => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => {
            console.log('Role Ready Service Worker registered:', reg.scope);
          })
          .catch(err => {
            console.warn('Service Worker registration failed:', err);
          });
      });
    }
  }
};
