export interface CVAnalysis {
  id: string;
  Name: string;
  ContactInformation: {
    Email: string;
    Phone: string;
    Address?: string;
  };
  Skills: string[];
  WorkExperience: {
    JobTitle: string;
    Company: string;
    Duration: string;
    Description: string;
  }[];
  Summary: string;
  Education: {
    Institution: string;
    Degree: string;
    FieldOfStudy: string;
    Dates: string;
  }[];
  Certifications: string[];
  Languages: {
    Language: string;
    Proficiency: string;
  }[];
  Projects: {
    name: string;
    description: string;
  }[];
  Achievements: string[];
  status: string;
  matchPercentage?: number;
}