export interface Message {
  text: string;
  sender: "user" | "bot";
}

export interface ChatResponse {
  response: string;
}

export interface ProfileData {
  name: string;
  currentRole: string;
  yearsOfExperience: number;
  location: string;
}

export interface SkillsData {
  technicalSkills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
  };
  softSkills: string[];
}
