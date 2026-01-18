import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import LessonView from './components/Lesson/LessonView';
import PracticeSandbox from './components/Practice/PracticeSandbox';
import { curriculum } from './data/curriculum';
import './App.css';

type ViewMode = 'lesson' | 'practice';

function App() {
    const [currentLessonId, setCurrentLessonId] = useState<string>(curriculum[0].lessons[0].id);
    const [viewMode, setViewMode] = useState<ViewMode>('lesson');

    // Find current lesson
    const findLesson = (id: string) => {
        for (const level of curriculum) {
            const lesson = level.lessons.find(l => l.id === id);
            if (lesson) return lesson;
        }
        return null;
    };

    // Get all lessons in order
    const getAllLessons = () => {
        return curriculum.flatMap(level => level.lessons);
    };

    const currentLesson = findLesson(currentLessonId);
    const allLessons = getAllLessons();
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);

    const handleNext = () => {
        if (currentIndex < allLessons.length - 1) {
            setCurrentLessonId(allLessons[currentIndex + 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentLessonId(allLessons[currentIndex - 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleLessonSelect = (lessonId: string) => {
        setCurrentLessonId(lessonId);
        setViewMode('lesson');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavigatePractice = () => {
        setViewMode('practice');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <ThemeProvider>
            <ProgressProvider>
                <div className="app">
                    <Sidebar
                        currentLessonId={viewMode === 'lesson' ? currentLessonId : undefined}
                        onLessonSelect={handleLessonSelect}
                        onNavigatePractice={handleNavigatePractice}
                    />
                    <div className="app-main">
                        <Header />
                        <main className="app-content">
                            {viewMode === 'lesson' && currentLesson ? (
                                <LessonView
                                    lesson={currentLesson}
                                    onNext={handleNext}
                                    onPrevious={handlePrevious}
                                    hasNext={currentIndex < allLessons.length - 1}
                                    hasPrevious={currentIndex > 0}
                                />
                            ) : (
                                <PracticeSandbox />
                            )}
                        </main>
                    </div>
                </div>
            </ProgressProvider>
        </ThemeProvider>
    );
}

export default App;
