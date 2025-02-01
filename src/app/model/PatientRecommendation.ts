export interface PatientRecommendation {
  id: number; // Primary Key
  CheckId: number;
  PatientId: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
