import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ProgressContextType {
    completedLessons: string[];
    toggleLessonComplete: (lessonId: string) => void;
    isLessonComplete: (lessonId: string) => boolean;
    getProgress: () => { completed: number; total: number; percentage: number };
    resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const TOTAL_LESSONS = 17; // Total number of lessons in curriculum

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
        const saved = localStorage.getItem('completedLessons');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    }, [completedLessons]);

    const toggleLessonComplete = (lessonId: string) => {
        setCompletedLessons(prev =>
            prev.includes(lessonId)
                ? prev.filter(id => id !== lessonId)
                : [...prev, lessonId]
        );
    };

    const isLessonComplete = (lessonId: string) => {
        return completedLessons.includes(lessonId);
    };

    const getProgress = () => {
        const completed = completedLessons.length;
        const total = TOTAL_LESSONS;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { completed, total, percentage };
    };

    const resetProgress = () => {
        setCompletedLessons([]);
    };

    return (
        <ProgressContext.Provider value={{
            completedLessons,
            toggleLessonComplete,
            isLessonComplete,
            getProgress,
            resetProgress
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within ProgressProvider');
    }
    return context;
};
