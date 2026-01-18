import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check } from 'lucide-react';
import './CodeSnippet.css';

interface CodeSnippetProps {
    code: string;
    language?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = 'javascript' }) => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="code-snippet-container">
            <div className="code-snippet-header">
                <span className="code-language">{language}</span>
                <button
                    className="btn btn-ghost btn-icon copy-button"
                    onClick={handleCopy}
                    aria-label={t('controls.copyCode')}
                >
                    {copied ? (
                        <>
                            <Check size={16} />
                            <span className="copy-label">{t('controls.copied')}</span>
                        </>
                    ) : (
                        <>
                            <Copy size={16} />
                            <span className="copy-label">{t('controls.copyCode')}</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="code-snippet-content">
                <code className={`language-${language}`}>{code}</code>
            </pre>
        </div>
    );
};

export default CodeSnippet;
