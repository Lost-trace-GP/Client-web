import { User } from "./user";

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string; // DateTime is typically serialized as ISO string
  user: User;
  userId: string;
}
