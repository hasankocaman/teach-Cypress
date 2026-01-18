import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lightbulb, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import type { Lesson } from '../../data/curriculum';
import { useProgress } from '../../contexts/ProgressContext';
import CodeSnippet from './CodeSnippet';
import './LessonView.css';

interface LessonViewProps {
    lesson: Lesson;
    onNext?: () => void;
    onPrevious?: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

const LessonView: React.FC<LessonViewProps> = ({
    lesson,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious
}) => {
    const { t } = useTranslation();
    const { isLessonComplete, toggleLessonComplete } = useProgress();
    const isComplete = isLessonComplete(lesson.id);

    return (
        <div className="lesson-view">
            <div className="lesson-header">
                <div>
                    <h1 className="lesson-title">{t(`${lesson.translateKey}.title`)}</h1>
                    <p className="lesson-description">{t(`${lesson.translateKey}.description`)}</p>
                </div>
                <button
                    className={`btn ${isComplete ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => toggleLessonComplete(lesson.id)}
                >
                    <CheckCircle size={18} />
                    {isComplete ? '✓ ' + t('controls.markComplete') : t('controls.markComplete')}
                </button>
            </div>

            <div className="lesson-content">
                <section className="content-section">
                    <h2>📚 Overview</h2>
                    <p>{t(`${lesson.translateKey}.content`)}</p>
                </section>

                {lesson.concepts && (
                    <section className="content-section concepts-section">
                        <div className="concepts-header">
                            <Lightbulb size={24} className="concepts-icon" />
                            <h2>{t(`${lesson.translateKey}.concepts.title`)}</h2>
                        </div>
                        <ul className="concepts-list">
                            {lesson.concepts.items.map((item, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: t(`${lesson.translateKey}.concepts.items.${index}`, item) }} />
                            ))}
                        </ul>
                    </section>
                )}

                {lesson.codeExample && (
                    <section className="content-section">
                        <h2>💻 Code Example</h2>
                        <CodeSnippet code={lesson.codeExample} language="javascript" />
                    </section>
                )}

                <div className="lesson-navigation">
                    <button
                        className="btn btn-secondary"
                        onClick={onPrevious}
                        disabled={!hasPrevious}
                    >
                        <ArrowLeft size={18} />
                        {t('controls.previousLesson')}
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={onNext}
                        disabled={!hasNext}
                    >
                        {t('controls.nextLesson')}
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonView;
