import { Role } from "./role";
import { Report } from "./report";
import { Notification } from "./notification";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: string; // DateTime is typically serialized as ISO string in frontend
  reports: Report[];
  notifications: Notification[];
  resetToken?: string | null;
  resetTokenExpiry?: string | null; // DateTime is typically serialized as ISO string
}
