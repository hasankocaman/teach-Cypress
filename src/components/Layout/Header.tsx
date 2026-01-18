import React from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import './Header.css';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(newLang);
        localStorage.setItem('language', newLang);
    };

    return (
        <header className="app-header">
            <div className="header-content">
                <h1 className="header-title">Cypress Testing Guide</h1>

                <div className="header-controls">
                    <button
                        className="btn btn-ghost btn-icon"
                        onClick={toggleLanguage}
                        aria-label={t('controls.language')}
                        title={i18n.language === 'en' ? t('controls.turkish') : t('controls.english')}
                    >
                        <Globe size={20} />
                        <span className="control-label">{i18n.language.toUpperCase()}</span>
                    </button>

                    <button
                        className="btn btn-ghost btn-icon"
                        onClick={toggleTheme}
                        aria-label={t('controls.theme')}
                        title={theme === 'light' ? t('controls.darkMode') : t('controls.lightMode')}
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
