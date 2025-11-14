import { GoogleGenAI, Type } from "@google/genai";
import { ScheduleItemData } from '../types';

const getSchedulePrompt = (tasks: string): string => `
You are an expert productivity assistant. Your task is to create an optimal daily schedule based on a list of tasks provided by the user.

Here is the user's fixed daily routine, which you must incorporate:
- 7:00 AM - 8:00 AM: Morning Essential Routine
- 8:00 AM - 8:30 AM: Breakfast
- 1:00 PM - 1:45 PM: Lunch
- 5:00 PM - 5:15 PM: Tea Break
- 9:00 PM - 10:00 PM: Dinner
- 11:00 PM - 7:00 AM: Sleep

Here is the list of tasks the user wants to accomplish today:
---
${tasks}
---

Your goal is to schedule these tasks into the available time slots. Follow these principles for an optimal schedule:
1.  **Prioritization:** Schedule more demanding or important tasks during peak energy hours, typically in the morning.
2.  **Time Blocking:** Assign a specific time block for each task. The user may provide estimated durations in parentheses (e.g., "Write report (2 hours)"). You MUST honor these estimations. If no duration is provided, estimate a reasonable one.
3.  **Task Batching:** Group similar tasks together to minimize context switching.
4.  **Breaks:** Include short 5-10 minute breaks between longer tasks to maintain focus.
5.  **Flexibility:** If scheduling all tasks is difficult, you may slightly adjust the fixed routine times (e.g., shift lunch by 15-30 minutes), but you must include all fixed routine items.

Respond with ONLY a valid JSON object. Do not include any other text or markdown specifiers.
`;

const scheduleSchema = {
    type: Type.OBJECT,
    properties: {
        schedule: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    startTime: { type: Type.STRING, description: "Start time in HH:MM AM/PM format" },
                    endTime: { type: Type.STRING, description: "End time in HH:MM AM/PM format" },
                    task: { type: Type.STRING },
                    isUserTask: { type: Type.BOOLEAN, description: "True if it is a user-provided task." },
                },
                required: ["startTime", "endTime", "task", "isUserTask"],
            },
        },
    },
    required: ["schedule"],
};

const getTipsPrompt = (tasks: string): string => `
Based on the following list of tasks, generate 5 short, actionable productivity tips to help the user stay focused and efficient. The tasks are: ${tasks}.
Respond with ONLY a valid JSON object with a single key "tips" which is an array of strings.
`;

const tipsSchema = {
    type: Type.OBJECT,
    properties: {
        tips: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
        },
    },
    required: ["tips"],
};

export const generateScheduleAndTips = async (
    tasks: string,
    isDeepThought: boolean
): Promise<{ schedule: ScheduleItemData[]; tips: string[] }> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const scheduleModel = isDeepThought ? 'gemini-2.5-pro' : 'gemini-2.5-flash-lite';
    const scheduleConfig = isDeepThought ? { thinkingConfig: { thinkingBudget: 32768 } } : {};

    const [scheduleResponse, tipsResponse] = await Promise.all([
        ai.models.generateContent({
            model: scheduleModel,
            contents: getSchedulePrompt(tasks),
            config: {
                ...scheduleConfig,
                responseMimeType: "application/json",
                responseSchema: scheduleSchema,
            },
        }),
        ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: getTipsPrompt(tasks),
            config: {
                responseMimeType: "application/json",
                responseSchema: tipsSchema,
            },
        }),
    ]);
    
    const scheduleData = JSON.parse(scheduleResponse.text);
    const tipsData = JSON.parse(tipsResponse.text);

    return {
        schedule: scheduleData.schedule,
        tips: tipsData.tips,
    };
};