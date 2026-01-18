import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, Circle } from 'lucide-react';
import { curriculum } from '../../data/curriculum';
import { useProgress } from '../../contexts/ProgressContext';
import './Sidebar.css';

interface SidebarProps {
    currentLessonId?: string;
    onLessonSelect: (lessonId: string) => void;
    onNavigatePractice: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentLessonId, onLessonSelect, onNavigatePractice }) => {
    const { t } = useTranslation();
    const { isLessonComplete, getProgress, resetProgress } = useProgress();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const progress = getProgress();

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                {!isCollapsed && (
                    <>
                        <BookOpen size={28} className="sidebar-icon" />
                        <h2 className="sidebar-title">Cypress Learn</h2>
                    </>
                )}
                <button
                    className="btn btn-ghost btn-icon sidebar-toggle"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {!isCollapsed && (
                <>
                    <div className="sidebar-progress">
                        <div className="progress-info">
                            <span className="progress-label">{t('progress.title')}</span>
                            <span className="progress-percentage">{progress.percentage}%</span>
                        </div>
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${progress.percentage}%` }}
                            />
                        </div>
                        <span className="progress-text">
                            {t('progress.completed', { count: progress.completed, total: progress.total })}
                        </span>
                        <button
                            className="btn btn-ghost btn-sm reset-progress-btn"
                            onClick={() => {
                                if (window.confirm('Are you sure you want to reset your progress? This action cannot be undone.')) {
                                    resetProgress();
                                }
                            }}
                            data-testid="reset-progress-button"
                        >
                            {t('progress.resetProgress')}
                        </button>
                    </div>

                    <nav className="sidebar-nav">
                        {curriculum.map((level) => (
                            <div key={level.id} className="level-section">
                                <h3 className="level-title">{t(`${level.translateKey}.title`)}</h3>
                                <p className="level-description">{t(`${level.translateKey}.description`)}</p>
                                <ul className="lessons-list">
                                    {level.lessons.map((lesson) => {
                                        const isComplete = isLessonComplete(lesson.id);
                                        const isActive = currentLessonId === lesson.id;

                                        return (
                                            <li key={lesson.id}>
                                                <button
                                                    className={`lesson-item ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
                                                    onClick={() => onLessonSelect(lesson.id)}
                                                >
                                                    <span className="lesson-icon">
                                                        {isComplete ? (
                                                            <CheckCircle size={18} className="icon-complete" />
                                                        ) : (
                                                            <Circle size={18} className="icon-incomplete" />
                                                        )}
                                                    </span>
                                                    <span className="lesson-title">{t(`${lesson.translateKey}.title`)}</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}

                        <div className="practice-section">
                            <button
                                className="btn btn-primary practice-button"
                                onClick={onNavigatePractice}
                            >
                                {t('nav.practice')}
                            </button>
                        </div>
                    </nav>
                </>
            )}
        </aside>
    );
};

export default Sidebar;
