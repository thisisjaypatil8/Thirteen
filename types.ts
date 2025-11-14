
export interface ScheduleItemData {
  startTime: string;
  endTime: string;
  task: string;
  isUserTask: boolean;
}

export interface TimerData {
  task: string;
  endTime: number;
}
