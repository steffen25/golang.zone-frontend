import { nanoid } from 'nanoid';
import create, { SetState } from 'zustand';

export type Notification = {
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message?: string;
};

type NotificationsState = {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    dismissNotification: (id: string) => void;
};

export const useNotificationStore = create<NotificationsState>((set: SetState<NotificationsState>) => ({
    notifications: [],

    addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { id: nanoid(), ...notification }],
    })),

    dismissNotification: (id: string) => set((state) => ({
        notifications: state.notifications.filter((notification) => notification.id !== id),
    })),
}));