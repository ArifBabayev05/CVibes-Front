import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { CVAnalysis } from '../types';

interface CandidateTableProps {
  candidates: CVAnalysis[];
  onCandidateSelect: (candidate: CVAnalysis) => void;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({ candidates, onCandidateSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof CVAnalysis>('Name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof CVAnalysis) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.ContactInformation.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (candidate.Skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) || false)
  );

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortField === 'Name' || sortField === 'status') {
      return sortDirection === 'asc'
        ? String(a[sortField]).localeCompare(String(b[sortField]))
        : String(b[sortField]).localeCompare(String(a[sortField]));
    }
    return 0;
  });

  const SortIcon = ({ field }: { field: keyof CVAnalysis }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search candidates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                onClick={() => handleSort('Name')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <SortIcon field="Name" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Skills
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Match %
              </th>
              <th
                onClick={() => handleSort('status')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <SortIcon field="status" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedCandidates.map((candidate, index) => (
              <tr
                key={index}
                onClick={() => onCandidateSelect(candidate)}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{candidate.Name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{candidate.ContactInformation.Email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {(candidate.Skills?.slice(0, 3) || []).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.Skills?.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        +{candidate.Skills.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {candidate.WorkExperience.length} years
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {candidate.matchPercentage || 0}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${candidate.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                    ${candidate.status === 'analyzing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                    ${candidate.status === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                    ${candidate.status === 'pending' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' : ''}
                  `}>
                    {candidate.status.charAt(0).toUpperCase() + candidate.status?.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};