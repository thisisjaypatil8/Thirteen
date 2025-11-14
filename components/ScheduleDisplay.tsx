import React from 'react';
import { ScheduleItemData } from '../types';
import ScheduleItem from './ScheduleItem';

interface ScheduleDisplayProps {
  schedule: ScheduleItemData[];
  completedTasks: string[];
  onToggleTask: (task: string) => void;
  onStartTimer: (task: string, startTime: string, endTime: string) => void;
}

const ScheduleDisplay: React.FC<ScheduleDisplayProps> = ({ schedule, completedTasks, onToggleTask, onStartTimer }) => {
  return (
    <div className="mt-8 bg-brand-surface p-4 sm:p-6 rounded-lg border border-brand-border">
      <h2 className="text-2xl font-bold text-brand-text-main mb-4 px-4">Your thirteen26 Plan</h2>
      <div className="divide-y divide-brand-border">
        {schedule.map((item, index) => (
          <ScheduleItem
            key={index}
            item={item}
            isChecked={completedTasks.includes(item.task)}
            onToggle={onToggleTask}
            onStartTimer={onStartTimer}
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduleDisplay;
