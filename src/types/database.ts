export interface UserProfile {
  id: string;
  first_name: string;
  email: string;
  gender: "male" | "female";
  birthdate: string;
  consent: boolean;
  bio: string;
  preferences: UserPreferences;
  location_lat?: number;
  location_lng?: number;
  last_active: string;
  is_verified: boolean;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  age_range: {
    min: number;
    max: number; 
  }
}

export interface Like {
  id: string;
  from_user_id: string;
  to_user_id: string;
  created_at: string;
}

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  is_active: boolean;
  created_at: string;
}