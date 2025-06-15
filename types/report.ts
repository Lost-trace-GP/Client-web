import { ReportStatus } from "./reportStatus";
import { User } from "./user";

export interface Report {
  id: string;
  personName?: string | null;
  age?: number | null;
  gender?: string | null;
  description: string;
  contact_number:string | null
  imageUrl?: string | null;
  imagePublicId?: string | null;
  faceEmbedding?: number[] | null; // More precise than any
  status: ReportStatus;
  location: string | null;
  lat?: number | null;
  lon?: number | null;
  submittedAt: string; // ISO date string
  submittedBy: User;
  submittedById: string;
  matchedWith?: string | null;
  phone?: number | null; // optional, depending on backend
}