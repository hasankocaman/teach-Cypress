import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import './SampleTable.css';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
}

const initialUsers: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', status: 'inactive' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active' },
    { id: 5, name: 'Evan Davis', email: 'evan@example.com', role: 'User', status: 'active' }
];

const SampleTable: React.FC = () => {
    const { t } = useTranslation();
    const [users] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="sample-table-container">
            <h3>{t('practice.sampleTable.title')}</h3>

            <div className="table-controls">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        className="input"
                        data-testid="table-search"
                        placeholder={t('practice.sampleTable.search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-wrapper">
                <table className="data-table" data-testid="users-table">
                    <thead>
                        <tr>
                            <th>{t('practice.sampleTable.name')}</th>
                            <th>{t('practice.sampleTable.email')}</th>
                            <th>{t('practice.sampleTable.role')}</th>
                            <th>{t('practice.sampleTable.status')}</th>
                            <th>{t('practice.sampleTable.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} data-testid={`user-row-${user.id}`}>
                                <td data-testid={`user-name-${user.id}`}>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge badge-info`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge badge-${user.status === 'active' ? 'success' : 'warning'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="table-actions">
                                        <button className="btn btn-ghost btn-sm" data-testid={`view-${user.id}`}>
                                            {t('practice.sampleTable.view')}
                                        </button>
                                        <button className="btn btn-ghost btn-sm" data-testid={`edit-${user.id}`}>
                                            {t('practice.sampleTable.edit')}
                                        </button>
                                        <button className="btn btn-ghost btn-sm" data-testid={`delete-${user.id}`}>
                                            {t('practice.sampleTable.delete')}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredUsers.length === 0 && (
                <div className="no-results">
                    No users found matching "{searchTerm}"
                </div>
            )}
        </div>
    );
};

export default SampleTable;
