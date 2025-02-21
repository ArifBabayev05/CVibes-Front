export interface CVDocument {
  base64: string;
  fileType: string;
}

export interface Education {
  Institution: string;        // Changed to match API casing
  Degree: string;            // Changed to match API casing
  FieldOfStudy: string;      // Changed to match API casing
  Dates: string;            // Changed to match API casing
}

export interface WorkExperience {
  JobTitle: string;         // Changed to match API casing
  Company: string;         // Changed to match API casing
  Duration: string;        // Changed to match API casing
  Description: string;     // Changed to match API casing
}

export interface ContactInformation {
  Address?: string;        // Added from API response
  Phone: string;
  Email: string;
  LinkedIn?: string;       // Added from API response
  Behance?: string;        // Added from API response
}

export interface Language {
  Language: string;        // Changed to match API casing
  Proficiency: string;     // Changed to match API casing
}

export interface OtherDetails {
  Birthdate?: string;      // Added from API response
  PassportNo?: string;     // Added from API response
  MaritalStatus?: string;  // Added from API response
}

export interface CVAnalysis {
  id: string;              // Added id property
  Name: string;            // Changed to match API casing
  ContactInformation: ContactInformation;  // Updated to new interface
  Summary: string;        // Changed to match API casing
  Education: Education[]; // Changed to match API casing
  WorkExperience: WorkExperience[]; // Changed to match API casing
  Skills: string[];       // Changed to match API casing
  Certifications: string[]; // Changed to match API casing
  Languages: Language[];   // Changed to match API casing and new interface
  Projects: Array<{       // Changed to match API casing
    name: string;
    description: string;
  }>;
  Achievements: string[]; // Changed to match API casing
  OtherDetails: string | OtherDetails; // Updated to support both string and object from API
  matchPercentage?: number;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
}

export interface AnalysisStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
  cvAnalyses: CVAnalysis[];
  setCVAnalyses: (analyses: CVAnalysis[]) => void;
  addCVAnalyses: (analyses: CVAnalysis[]) => void;
  selectedCandidate: CVAnalysis | null;
  setSelectedCandidate: (candidate: CVAnalysis | null) => void;
}

// Optional: Add interface for the full API response
export interface APIResponse {
  totalProcessed: number;
  results: Array<{
    index: number;
    status: 'success' | 'error';
    result: CVAnalysis;
  }>;
}