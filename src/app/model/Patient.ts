export interface Patient {
    patientId: number;  // Primary Key
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    email?: string;
    phoneNumber?: string;
    emergencyContact: string;
    emergencyContactInfo: string;
    heightCM?: number;
    weightKG?: number;
    bmi?: number;
    chronicConditions?: string;
    allergies?: string;
    medications?: string;
    familyHistory?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  