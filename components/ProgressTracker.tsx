
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface ProgressTrackerProps {
  completed: number;
  total: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ completed, total }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const data = [
    { name: 'Completed', value: completed },
    { name: 'Remaining', value: total - completed },
  ];
  const COLORS = ['#3FB950', '#30363D'];

  return (
    <div className="bg-brand-surface p-6 rounded-lg border border-brand-border text-center">
      <h3 className="text-xl font-bold text-brand-text-main mb-4">Daily Progress</h3>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={450}
              paddingAngle={total > 0 ? 5 : 0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
               <Label
                  value={`${percentage}%`}
                  position="center"
                  fill="#C9D1D9"
                  className="text-3xl font-bold"
                />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-brand-text-secondary mt-4">{completed} of {total} tasks completed</p>
    </div>
  );
};

export default ProgressTracker;
