import React, { useState } from 'react';
import BoltIcon from './icons/BoltIcon';
import BrainIcon from './icons/BrainIcon';

interface TaskInputProps {
  onGenerate: (tasks: string, isDeepThought: boolean) => void;
  isLoading: boolean;
}

const TaskInput: React.FC<TaskInputProps> = ({ onGenerate, isLoading }) => {
  const [tasks, setTasks] = useState('Plan marketing strategy for Q3 (2 hours)\nWrite two blog posts (90 minutes)\nTeam sync meeting (1 hr)\nReview new design mockups');
  const [isDeepThought, setIsDeepThought] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tasks.trim()) {
      onGenerate(tasks, isDeepThought);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-surface p-6 rounded-lg border border-brand-border">
      <label htmlFor="task-input" className="block text-lg font-medium text-brand-text-main mb-2">
        What do you want to accomplish today? (e.g., Task name (1.5 hours))
      </label>
      <textarea
        id="task-input"
        value={tasks}
        onChange={(e) => setTasks(e.target.value)}
        placeholder="e.g., Finish project report (2 hours), call the doctor (15 min), workout..."
        className="w-full h-32 p-3 bg-brand-bg border border-brand-border rounded-md text-brand-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
        disabled={isLoading}
      />
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 p-1 bg-brand-bg rounded-full border border-brand-border">
          <button
            type="button"
            onClick={() => setIsDeepThought(false)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors ${!isDeepThought ? 'bg-brand-primary text-white' : 'text-brand-text-secondary hover:bg-brand-surface'}`}
          >
            <BoltIcon className="w-4 h-4" /> Fast
          </button>
          <button
            type="button"
            onClick={() => setIsDeepThought(true)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors ${isDeepThought ? 'bg-brand-primary text-white' : 'text-brand-text-secondary hover:bg-brand-surface'}`}
          >
            <BrainIcon className="w-4 h-4" /> Deep Thought
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading || !tasks.trim()}
          className="w-full sm:w-auto bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 disabled:bg-brand-border disabled:text-brand-text-secondary disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Plan My Day'
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskInput;