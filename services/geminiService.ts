
import { GoogleGenAI, Type } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";
import { Task, ExecutionResult } from "../types";

const apiKey = process.env.API_KEY || ''; 

let ai: GoogleGenAI | null = null;

try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (e) {
    console.error("Failed to initialize Gemini Client", e);
}

export const checkCodeWithAI = async (code: string, task: Task): Promise<ExecutionResult> => {
    if (!ai) {
        return {
            success: false,
            logs: ["Системная ошибка: ИИ-модуль не подключен (Отсутствует API Key)"],
            steps: []
        };
    }

    let prompt = '';

    if (task.type === 'terminal') {
         prompt = `
        Ты - эмулятор Linux терминала в киберпанк игре.
        
        ЗАДАЧА: "${task.title}"
        Файловая система (JSON): ${task.terminalConfig?.fileSystem || '{}'}
        Цель: Ученик должен выполнить команду, которая эквивалентна: "${task.terminalConfig?.goalCommand}"
        
        ВВОД ПОЛЬЗОВАТЕЛЯ: "${code}"
        
        ТВОЯ РОЛЬ:
        1. Интерпретируй команду (ls, cd, cat, pwd, whoami).
        2. Верни результат выполнения как текст терминала (terminalOutput).
        3. Если пользователь выполнил ЦЕЛЬ (например, прочитал нужный файл), верни success: true.
        4. Если команда ошибочная, верни ошибку как в bash.
        
        ФОРМАТ ОТВЕТА (JSON):
        {
          "success": boolean,
          "terminalOutput": string, // Вывод команды (например список файлов или содержимое файла)
          "logs": string[], // Системные логи для HUD
          "steps": [],
          "error": string | null,
          "feedback": string
        }
        `;
    } else if (task.type === 'html') {
        prompt = `
        Ты - браузерный движок и учитель веб-разработки.
        ЗАДАЧА: "${task.title}"
        Требования: Tag: ${task.htmlConfig?.targetTag}, Style: ${task.htmlConfig?.targetStyle}
        КОД: ${code}
        
        Верни success: true, если требования выполнены.
        ФОРМАТ (JSON): { "success": boolean, "logs": string[], "steps": [], "error": string | null, "feedback": string }
        `;
    } else {
        // Grid Task
        prompt = `
        Ты - компилятор игры.
        Сцена: ${task.mapConfig?.gridSize}x${task.mapConfig?.gridSize}.
        Старт: ${JSON.stringify(task.mapConfig?.start)}. Финиш: ${JSON.stringify(task.mapConfig?.end)}.
        Препятствия: ${JSON.stringify(task.mapConfig?.obstacles)}.
        КОД: ${code}
        
        Симулируй движение.
        ФОРМАТ (JSON): { "success": boolean, "logs": string[], "steps": [[x,y]...], "error": string | null, "feedback": string }
        `;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                systemInstruction: AI_SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        success: { type: Type.BOOLEAN },
                        logs: { type: Type.ARRAY, items: { type: Type.STRING } },
                        steps: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.NUMBER } } },
                        terminalOutput: { type: Type.STRING, nullable: true },
                        error: { type: Type.STRING, nullable: true },
                        feedback: { type: Type.STRING, nullable: true }
                    },
                    required: ["success", "logs", "steps"]
                }
            }
        });

        const result = JSON.parse(response.text || '{}') as ExecutionResult;
        return result;

    } catch (error) {
        console.error("Gemini Error:", error);
        return {
            success: false,
            logs: ["Критический сбой связи с ядром ИИ."],
            steps: [],
            error: "Ошибка сети/API"
        };
    }
};

export const generateHint = async (code: string, task: Task): Promise<string> => {
    if (!ai) return "ИИ Оффлайн.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Ученик застрял. Задача: ${task.title}. Требование: ${task.description}. Код:\n${code}\n\nДай короткую подсказку (не решение) на русском.`,
        });
        return response.text || "Данные повреждены.";
    } catch (e) {
        return "Ошибка соединения...";
    }
};

// --- Fantasy Services (Kept for compatibility) ---
export const checkFantasyAnswer = async (c: string, a: string) => ({ isCorrect: false, feedback: "Service Offline" });
export const generateFantasyHint = async (c: string) => "Service Offline";
export const generateFantasyImage = async (d: string) => null;
