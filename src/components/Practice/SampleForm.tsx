import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SampleForm.css';

const SampleForm: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        country: '',
        interests: [] as string[],
        newsletter: false,
        terms: false
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const handleCheckbox = (value: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(value)
                ? prev.interests.filter(i => i !== value)
                : [...prev.interests, value]
        }));
    };

    return (
        <div className="sample-form-container">
            <h3>{t('practice.sampleForm.title')}</h3>
            {submitted && (
                <div className="form-success" data-testid="form-success">
                    ✓ {t('practice.sampleForm.formSubmitted')}
                </div>
            )}

            <form onSubmit={handleSubmit} data-testid="practice-form">
                <div className="form-group">
                    <label htmlFor="name">{t('practice.sampleForm.name')}</label>
                    <input
                        id="name"
                        type="text"
                        className="input"
                        data-testid="name-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">{t('practice.sampleForm.email')}</label>
                    <input
                        id="email"
                        type="email"
                        className="input"
                        data-testid="email-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">{t('practice.sampleForm.password')}</label>
                    <input
                        id="password"
                        type="password"
                        className="input"
                        data-testid="password-input"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="country">{t('practice.sampleForm.country')}</label>
                    <select
                        id="country"
                        className="input"
                        data-testid="country-select"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    >
                        <option value="">{t('practice.sampleForm.selectCountry')}</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="tr">Turkey</option>
                        <option value="de">Germany</option>
                        <option value="fr">France</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>{t('practice.sampleForm.interests')}</label>
                    <div className="checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                data-testid="interest-cypress"
                                checked={formData.interests.includes('cypress')}
                                onChange={() => handleCheckbox('cypress')}
                            />
                            <span>Cypress</span>
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                data-testid="interest-testing"
                                checked={formData.interests.includes('testing')}
                                onChange={() => handleCheckbox('testing')}
                            />
                            <span>Testing</span>
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                data-testid="interest-automation"
                                checked={formData.interests.includes('automation')}
                                onChange={() => handleCheckbox('automation')}
                            />
                            <span>Automation</span>
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            data-testid="newsletter-checkbox"
                            checked={formData.newsletter}
                            onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                        />
                        <span>{t('practice.sampleForm.newsletter')}</span>
                    </label>
                </div>

                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            data-testid="terms-checkbox"
                            checked={formData.terms}
                            onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                        />
                        <span>{t('practice.sampleForm.terms')}</span>
                    </label>
                </div>

                <button type="submit" className="btn btn-primary" data-testid="submit-button">
                    {t('practice.sampleForm.submit')}
                </button>
            </form>
        </div>
    );
};

export default SampleForm;
