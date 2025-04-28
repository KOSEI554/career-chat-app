import axios from 'axios';
import { ChatResponse, ProfileData, SkillsData } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

export const chatApi = {
  sendMessage: async (message: string): Promise<ChatResponse> => {
    const response = await axios.get<ChatResponse>(`${API_BASE_URL}/chat`, {
      params: { message }
    });
    return response.data;
  },
  
  getProfile: async (): Promise<ProfileData> => {
    const response = await axios.get<ProfileData>(`${API_BASE_URL}/profile`);
    return response.data;
  },
  
  getSkills: async (): Promise<SkillsData> => {
    const response = await axios.get<SkillsData>(`${API_BASE_URL}/skills`);
    return response.data;
  }
};