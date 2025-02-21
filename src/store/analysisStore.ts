import { create } from 'zustand';
import { AnalysisStore } from '../types';

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  cvAnalyses: [],
  setCVAnalyses: (analyses) => set({ cvAnalyses: analyses }),
  addCVAnalyses: (analyses) => set((state) => ({ 
    cvAnalyses: [...state.cvAnalyses, ...analyses] 
  })),
  selectedCandidate: null,
  setSelectedCandidate: (candidate) => set({ selectedCandidate: candidate }),
}));