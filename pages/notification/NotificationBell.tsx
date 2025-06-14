"use client";

import { useEffect } from "react";
import { Bell, CheckCheck } from "lucide-react"; // ✅ new icon
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead, 
} from "@/store/notification/notificationSlice";

export default function NotificationBell() {
  const dispatch = useAppDispatch();
  const { token, user, loading } = useAppSelector((state) => state.auth);
  const { notifications, unreadCount } = useAppSelector(
    (state) => state.notification
  );

  const isAuthenticated = token && user && loading === "succeeded";

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, isAuthenticated]);

  const handleNotificationClick = (id: string) => {
    dispatch(markNotificationAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Notifications</span>
          {unreadCount > 0 && (
            <Button
              onClick={handleMarkAllAsRead}
              variant="ghost"
              size="sm"
              className="gap-1 text-xs"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
        {notifications.length === 0 ? (
          <p className="text-muted-foreground text-sm">No notifications.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.slice(0, 5).map((notification) => (
              <li
                key={notification.id}
                className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm"
                onClick={() => handleNotificationClick(notification.id)}
              >
                <span
                  className={
                    notification.isRead
                      ? "text-muted-foreground"
                      : "font-semibold"
                  }
                >
                  {notification.message}
                </span>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
