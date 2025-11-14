import React from 'react';
import ProgressTracker from './ProgressTracker';
import Tips from './Tips';
import { ScheduleItemData } from '../types';

interface SidebarProps {
  schedule: ScheduleItemData[];
  completedTasks: string[];
  tips: string[];
  onClearCompleted: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ schedule, completedTasks, tips, onClearCompleted }) => {
  const userTasks = schedule.filter(item => item.isUserTask);

  return (
    <aside className="lg:w-1/3 lg:pl-8 space-y-8 mt-8 lg:mt-0">
      <ProgressTracker completed={completedTasks.length} total={userTasks.length} />
       {completedTasks.length > 0 && (
        <button
          onClick={onClearCompleted}
          className="w-full bg-brand-surface hover:bg-brand-border text-brand-text-secondary font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50"
        >
          Clear Completed Tasks
        </button>
      )}
      {tips.length > 0 && <Tips tips={tips} />}
    </aside>
  );
};

export default Sidebar;
