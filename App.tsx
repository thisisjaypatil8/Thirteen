import React, { useState, useCallback } from 'react';
import TaskInput from './components/TaskInput';
import ScheduleDisplay from './components/ScheduleDisplay';
import Sidebar from './components/Sidebar';
import Timer from './components/Timer';
import SparkleIcon from './components/icons/SparkleIcon';
import { generateScheduleAndTips } from './services/geminiService';
import { ScheduleItemData, TimerData } from './types';

function App() {
  const [schedule, setSchedule] = useState<ScheduleItemData[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTimer, setActiveTimer] = useState<TimerData | null>(null);

  const handleGenerateSchedule = useCallback(async (tasks: string, isDeepThought: boolean) => {
    setIsLoading(true);
    setError(null);
    setCompletedTasks([]);
    try {
      const { schedule: newSchedule, tips: newTips } = await generateScheduleAndTips(tasks, isDeepThought);
      setSchedule(newSchedule);
      setTips(newTips);
    } catch (e) {
      setError('Failed to generate schedule. Please check your API key and try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleToggleTask = useCallback((task: string) => {
    setCompletedTasks(prev =>
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  }, []);

  const handleClearCompleted = useCallback(() => {
    // Filter out user tasks that have been completed.
    setSchedule(prevSchedule => prevSchedule.filter(item => !item.isUserTask || !completedTasks.includes(item.task)));
    // Reset the list of completed tasks.
    setCompletedTasks([]);
  }, [completedTasks]);
  
  const parseTime = (timeStr: string) => {
    const today = new Date();
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
  
    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) { // Handle 12 AM (midnight)
      hours = 0;
    }
  
    today.setHours(hours, minutes, 0, 0);
    return today.getTime();
  };

  const handleStartTimer = useCallback((task: string, startTime: string, endTime: string) => {
      const endTimestamp = parseTime(endTime);
      setActiveTimer({ task, endTime: endTimestamp });
  }, []);

  return (
    <div className="min-h-screen text-brand-text-main p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center">
            <SparkleIcon className="w-10 h-10 text-brand-primary" />
            <h1 className="text-4xl sm:text-5xl font-extrabold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-success">
              thirteen26
            </h1>
          </div>
          <p className="mt-4 text-lg text-brand-text-secondary max-w-2xl mx-auto">
            Leverage Gemini's intelligence to transform your to-do list into a perfectly optimized daily schedule.
          </p>
        </header>

        <main className="flex flex-col lg:flex-row">
          <div className="flex-grow lg:w-2/3">
            <TaskInput onGenerate={handleGenerateSchedule} isLoading={isLoading} />
            {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
            
            {schedule.length > 0 && !isLoading && (
              <ScheduleDisplay
                schedule={schedule}
                completedTasks={completedTasks}
                onToggleTask={handleToggleTask}
                onStartTimer={handleStartTimer}
              />
            )}
            
            {!isLoading && schedule.length === 0 && (
                <div className="mt-8 text-center bg-brand-surface p-12 rounded-lg border-2 border-dashed border-brand-border">
                    <h3 className="text-xl font-semibold text-brand-text-main">Ready to plan your day?</h3>
                    <p className="text-brand-text-secondary mt-2">Enter your tasks above and let our AI craft the perfect schedule for you.</p>
                </div>
            )}
          </div>
          
          {schedule.length > 0 && !isLoading && (
            <Sidebar
              schedule={schedule}
              completedTasks={completedTasks}
              tips={tips}
              onClearCompleted={handleClearCompleted}
            />
          )}
        </main>
        
        <Timer activeTimer={activeTimer} onClose={() => setActiveTimer(null)} />
      </div>
    </div>
  );
}

export default App;
