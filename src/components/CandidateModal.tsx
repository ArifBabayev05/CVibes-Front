import React from 'react';
import { X } from 'lucide-react';
import { CVAnalysis } from '../types';

interface CandidateModalProps {
  candidate: CVAnalysis;
  onClose: () => void;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({ candidate, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{candidate.Name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white">{candidate.ContactInformation.Email}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Phone</p>
                <p className="text-gray-900 dark:text-white">{candidate.ContactInformation.Phone}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Summary</h3>
            <p className="text-gray-700 dark:text-gray-300">{candidate.Summary}</p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.Skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Work Experience</h3>
            <div className="space-y-4">
              {candidate.WorkExperience.map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">{exp.JobTitle}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{exp.Company} • {exp.Duration}</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.Description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Education</h3>
            <div className="space-y-4">
              {candidate.Education.map((edu, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900 dark:text-white">{edu.Institution}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {edu.Degree} in {edu.FieldOfStudy} • {edu.Dates}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {candidate.Certifications.length > 0 && (
            <section>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Certifications</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {candidate.Certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </section>
          )}

          {candidate.Languages.length > 0 && (
            <section>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Languages</h3>
              <div className="grid grid-cols-2 gap-4">
                {candidate.Languages.map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{lang.Language}</span>
                    <span className="text-gray-500 dark:text-gray-400">{lang.Proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};