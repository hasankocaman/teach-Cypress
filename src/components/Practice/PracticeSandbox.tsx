import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList } from 'lucide-react';
import SampleForm from './SampleForm';
import SampleButtons from './SampleButtons';
import SampleTable from './SampleTable';
import './PracticeSandbox.css';

type Tab = 'forms' | 'buttons' | 'tables';

const PracticeSandbox: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<Tab>('forms');

    return (
        <div className="practice-sandbox">
            <div className="practice-header">
                <ClipboardList size={32} className="practice-icon" />
                <div>
                    <h1 className="practice-title">{t('practice.title')}</h1>
                    <p className="practice-description">{t('practice.description')}</p>
                </div>
            </div>

            <div className="practice-instructions">
                <h3>{t('practice.instructions.title')}</h3>
                <p>
                    {activeTab === 'forms' && t('practice.instructions.forms')}
                    {activeTab === 'buttons' && t('practice.instructions.buttons')}
                    {activeTab === 'tables' && t('practice.instructions.tables')}
                </p>
            </div>

            <div className="practice-tabs">
                <button
                    className={`tab-button ${activeTab === 'forms' ? 'active' : ''}`}
                    onClick={() => setActiveTab('forms')}
                    data-testid="tab-forms"
                >
                    {t('practice.tabs.forms')}
                </button>
                <button
                    className={`tab-button ${activeTab === 'buttons' ? 'active' : ''}`}
                    onClick={() => setActiveTab('buttons')}
                    data-testid="tab-buttons"
                >
                    {t('practice.tabs.buttons')}
                </button>
                <button
                    className={`tab-button ${activeTab === 'tables' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tables')}
                    data-testid="tab-tables"
                >
                    {t('practice.tabs.tables')}
                </button>
            </div>

            <div className="practice-content">
                {activeTab === 'forms' && <SampleForm />}
                {activeTab === 'buttons' && <SampleButtons />}
                {activeTab === 'tables' && <SampleTable />}
            </div>
        </div>
    );
};

export default PracticeSandbox;
