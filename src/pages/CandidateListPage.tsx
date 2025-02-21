import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CandidateTable } from '../components/CandidateTable';
import { useAnalysisStore } from '../store/analysisStore';
import type { CVAnalysis } from '../types';

export const CandidateListPage: React.FC = () => {
  const { cvAnalyses } = useAnalysisStore();
  const navigate = useNavigate();

  const handleCandidateSelect = (candidate: CVAnalysis) => {
    navigate(`/candidates/${candidate.id}`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Candidates</h2>
        <CandidateTable
          candidates={cvAnalyses}
          onCandidateSelect={handleCandidateSelect}
        />
      </div>
    </div>
  );
};