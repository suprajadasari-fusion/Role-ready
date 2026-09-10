import { apiFetch } from '../../lib/api';
import { ParentNotification } from '../../lib/types';

/**
 * Fetch live system and academic notifications for the parent
 * Endpoint: GET /api/v1/notifications
 * ZERO mock data fallback: returns empty array if no unread or archived notifications
 */
export async function fetchParentNotifications(): Promise<ParentNotification[]> {
  try {
    const res = await apiFetch<{ success: boolean; data: any[] }>('/api/v1/notifications');
    if (res?.data && Array.isArray(res.data)) {
      return res.data.map((n: any, idx: number) => ({
        id: n.id || `notif-${idx}`,
        title: n.title || 'System Notification',
        message: n.message || '',
        category: n.category || 'system',
        timestamp: n.timestamp || n.createdAt || 'Recent',
        isRead: !!n.isRead,
        linkTab: n.linkTab || 'overview'
      }));
    }
  } catch (err) {
    // Expected when no notifications exist
  }

  return [];
}

/**
 * Mark a notification as read
 * Endpoint: PUT /api/v1/notifications/{id}/read
 */
export async function markNotificationAsRead(notificationId: string): Promise<boolean> {
  try {
    await apiFetch(`/api/v1/notifications/${notificationId}/read`, {
      method: 'PUT'
    });
    return true;
  } catch (err) {
    return false;
  }
}
