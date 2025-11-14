
import React from 'react';
import SparkleIcon from './icons/SparkleIcon';

interface TipsProps {
  tips: string[];
}

const Tips: React.FC<TipsProps> = ({ tips }) => {
  return (
    <div className="bg-brand-surface p-6 rounded-lg border border-brand-border">
      <h3 className="text-xl font-bold text-brand-text-main mb-4 flex items-center">
        <SparkleIcon className="w-6 h-6 mr-2 text-brand-primary" />
        AI-Powered Tips
      </h3>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="text-brand-primary mr-3 mt-1">◆</span>
            <p className="text-brand-text-secondary">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tips;
