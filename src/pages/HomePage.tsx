import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { FileUpload } from '../components/FileUpload';
import { convertFileToBase64 } from '../utils/fileUtils';
import { useAnalysisStore } from '../store/analysisStore';
import { v4 as uuidv4 } from 'uuid';
import type { CVDocument, CVAnalysis, APIResponse } from '../types';

export const HomePage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addCVAnalyses } = useAnalysisStore();
  const navigate = useNavigate();

  const transformAPIResponse = (response: APIResponse): CVAnalysis[] => {
    return response.results
      .filter(item => item.status === 'success' && item.result.Name) // Filter out empty or failed results
      .map(item => ({
        id: uuidv4(), // Generate a unique ID for each candidate
        Name: item.result.Name,
        ContactInformation: {
          Email: item.result.ContactInformation.Email || '',
          Phone: item.result.ContactInformation.Phone || '',
          Address: item.result.ContactInformation.Address,
          LinkedIn: item.result.ContactInformation.LinkedIn,
          Behance: item.result.ContactInformation.Behance
        },
        Summary: item.result.Summary,
        Education: item.result.Education.map(edu => ({
          Institution: edu.Institution,
          Degree: edu.Degree,
          FieldOfStudy: edu.FieldOfStudy,
          Dates: edu.Dates
        })),
        WorkExperience: item.result.WorkExperience.map(exp => ({
          JobTitle: exp.JobTitle,
          Company: exp.Company,
          Duration: exp.Duration,
          Description: exp.Description
        })),
        Skills: item.result.Skills,
        Certifications: item.result.Certifications,
        Languages: item.result.Languages.map(lang => ({
          Language: lang.Language,
          Proficiency: lang.Proficiency
        })),
        Projects: item.result.Projects,
        Achievements: item.result.Achievements,
        OtherDetails: item.result.OtherDetails,
        status: 'completed'
      }));
  };

  const analyzeCVsMutation = useMutation({
    mutationFn: async (documents: CVDocument[]) => {
      try {
        const response = await fetch('https://cvibes-api.netlify.app/api/analyze-cvs', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ documents }),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message || 
            `Failed to analyze CVs (Status: ${response.status})`
          );
        }
        
        const data: APIResponse = await response.json();
        return transformAPIResponse(data);
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(`Failed to analyze CVs: ${err.message}`);
        }
        throw new Error('An unexpected error occurred while analyzing CVs');
      }
    },
    onSuccess: (data) => {
      if (data.length === 0) {
        setError('No valid CVs were found in the analysis results');
        setIsUploading(false);
        return;
      }
      
      addCVAnalyses(data);
      setFiles([]);
      setIsUploading(false);
      setError(null);
      navigate('/candidates');
    },
    onError: (error: Error) => {
      console.error('Error analyzing CVs:', error);
      setError(error.message);
      setIsUploading(false);
    },
  });

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setError('Please select at least one file to analyze');
      return;
    }

    setIsUploading(true);
    setError(null);
    
    try {
      const documents = await Promise.all(
        files.map(async (file) => ({
          base64: await convertFileToBase64(file),
          fileType: file.name.split('.').pop()?.toLowerCase() || '',
        }))
      );

      analyzeCVsMutation.mutate(documents);
    } catch (err) {
      setError('Failed to process files. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upload CVs</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        <FileUpload onFilesSelected={handleFilesSelected} />
        
        {files.length > 0 && (
          <button
            onClick={handleAnalyze}
            disabled={isUploading}
            className={`mt-4 px-4 py-2 rounded-lg text-white
              ${isUploading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
          >
            {isUploading ? 'Analyzing...' : 'Analyze CVs'}
          </button>
        )}
      </div>
    </div>
  );
};