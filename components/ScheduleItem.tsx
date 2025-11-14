
import React from 'react';
import { ScheduleItemData } from '../types';
import ClockIcon from './icons/ClockIcon';

interface ScheduleItemProps {
  item: ScheduleItemData;
  isChecked: boolean;
  onToggle: (task: string) => void;
  onStartTimer: (task: string, startTime: string, endTime: string) => void;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ item, isChecked, onToggle, onStartTimer }) => {
  const { startTime, endTime, task, isUserTask } = item;

  const handleTimerClick = () => {
    onStartTimer(task, startTime, endTime);
  };

  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg transition-colors duration-300 hover:bg-brand-surface/50">
      <div className="text-right font-mono text-sm text-brand-text-secondary w-20 flex-shrink-0 pt-1">
        <p>{startTime}</p>
        <p className="opacity-60">{endTime}</p>
      </div>
      <div className="flex-shrink-0 pt-1">
        {isUserTask ? (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onToggle(task)}
            className="w-5 h-5 rounded bg-brand-surface border-brand-border text-brand-primary focus:ring-brand-secondary focus:ring-2 cursor-pointer"
          />
        ) : (
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-2 h-2 bg-brand-text-secondary rounded-full"></div>
          </div>
        )}
      </div>
      <div className="flex-grow">
        <p className={`font-medium ${isChecked ? 'line-through text-brand-text-secondary' : 'text-brand-text-main'}`}>{task}</p>
      </div>
      {isUserTask && !isChecked && (
        <button 
          onClick={handleTimerClick} 
          className="p-2 text-brand-text-secondary hover:text-brand-primary transition-colors duration-200 rounded-full hover:bg-brand-primary/10"
          aria-label={`Start timer for ${task}`}
        >
          <ClockIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ScheduleItem;
