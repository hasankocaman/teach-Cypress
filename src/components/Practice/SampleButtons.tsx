import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from 'lucide-react';
import './SampleButtons.css';

const SampleButtons: React.FC = () => {
    const { t } = useTranslation();
    const [clickCount, setClickCount] = useState(0);
    const [toggled, setToggled] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLoadingClick = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="sample-buttons-container">
            <h3>{t('practice.sampleButtons.title')}</h3>

            <div className="button-section">
                <h4>Click Counter</h4>
                <button
                    className="btn btn-primary"
                    data-testid="click-counter"
                    onClick={() => setClickCount(clickCount + 1)}
                >
                    {t('practice.sampleButtons.clickMe')}
                </button>
                <p className="counter-text" data-testid="click-count">
                    {t('practice.sampleButtons.clicked', { count: clickCount })}
                </p>
            </div>

            <div className="button-section">
                <h4>Toggle Button</h4>
                <button
                    className={`btn ${toggled ? 'btn-primary' : 'btn-secondary'}`}
                    data-testid="toggle-button"
                    onClick={() => setToggled(!toggled)}
                >
                    {t('practice.sampleButtons.toggle')}: {toggled ? 'ON' : 'OFF'}
                </button>
            </div>

            <div className="button-section">
                <h4>Disabled Button</h4>
                <button
                    className="btn btn-secondary"
                    data-testid="disabled-button"
                    disabled
                >
                    {t('practice.sampleButtons.disabled')}
                </button>
            </div>

            <div className="button-section">
                <h4>Loading Button</h4>
                <button
                    className="btn btn-primary"
                    data-testid="loading-button"
                    onClick={handleLoadingClick}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader size={16} className="spinner" />
                            {t('practice.sampleButtons.loading')}
                        </>
                    ) : (
                        'Load Data'
                    )}
                </button>
            </div>
        </div>
    );
};

export default SampleButtons;
