
import React, { useState, useEffect } from 'react';
import { TimerData } from '../types';
import ClockIcon from './icons/ClockIcon';

interface TimerProps {
  activeTimer: TimerData | null;
  onClose: () => void;
}

const Timer: React.FC<TimerProps> = ({ activeTimer, onClose }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!activeTimer) return;

    const calculateTimeLeft = () => {
      const difference = activeTimer.endTime - new Date().getTime();
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      return '00:00:00';
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimer]);

  if (!activeTimer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-brand-surface p-8 rounded-2xl shadow-2xl text-center w-full max-w-md mx-4 border border-brand-border animate-fade-in">
        <div className="flex justify-center items-center text-brand-primary mb-4">
          <ClockIcon className="w-8 h-8 mr-3" />
          <h2 className="text-2xl font-bold text-brand-text-main">Task in Progress</h2>
        </div>
        <p className="text-lg text-brand-text-secondary mb-6">{activeTimer.task}</p>
        <div className="text-7xl font-mono font-bold text-brand-primary tracking-wider bg-brand-bg py-4 px-6 rounded-lg border border-brand-border">
          {timeLeft}
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50"
        >
          Close Timer
        </button>
      </div>
    </div>
  );
};

export default Timer;
