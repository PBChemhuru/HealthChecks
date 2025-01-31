export interface Patient {
    patientId: number;  // Primary Key
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    email?: string;
    phonenumber?: string;
    emergencyContact: string;
    emergencyContactInfo: string;
    heightCM?: number;
    weightKG?: number;
    bmi?: number;
    chronicConditions?: string;
    allergies?: string;
    medications?: string;
    familyHistory?: string;
  
    // Timestamps
    createdAt: Date;
    updatedAt: Date;
  }
  