import { ReportStatus } from "./reportStatus";
import { User } from "./user";

export interface Report {
  id: string;
  personName?: string | null;
  age?: number | null;
  gender?: string | null;
  description: string;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  faceEmbedding?: any | null; // Json can be any type in TypeScript (use specific type if known)
  status: ReportStatus;
  location?: string | null;
  lat?: number | null;
  lon?: number | null;
  submittedAt: string; // DateTime is typically serialized as ISO string
  submittedBy: User;
  submittedById: string;
  matchedWith?: string | null;
}
