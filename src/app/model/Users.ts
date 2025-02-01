export interface Users {
  id: number; // Primary Key
  username: string;
  email: string;
  password_hash: string;
  role: string;
  firstname: string;
  surname: string;
  patientId: Number;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
