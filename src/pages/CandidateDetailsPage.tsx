import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAnalysisStore } from '../store/analysisStore';

export const CandidateDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cvAnalyses } = useAnalysisStore();

  console.log("ID from URL:", id);

  const candidate = cvAnalyses.find(c => c.id === id);

  if (!candidate) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Candidate not found
        </h2>
        <button
          onClick={() => navigate('/candidates')}
          className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Candidates
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/candidates')}
        className="inline-flex items-center px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Candidates
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{candidate.Name}</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{candidate.ContactInformation.Email}</p>
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
              {candidate.ContactInformation.Address && (
                <div className="col-span-2">
                  <p className="text-gray-500 dark:text-gray-400">Address</p>
                  <p className="text-gray-900 dark:text-white">{candidate.ContactInformation.Address}</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Summary</h3>
            <p className="text-gray-700 dark:text-gray-300">{candidate.Summary}</p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.Skills.map((skill, index) => (
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

          {candidate.Projects.length > 0 && (
            <section>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Projects</h3>
              <div className="space-y-4">
                {candidate.Projects.map((project, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {candidate.Achievements.length > 0 && (
            <section>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Achievements</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {candidate.Achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};