import React, { useState, useEffect } from 'react';
import { usersAPI } from '../../services/api';
import UserFormModal from '../../components/admin/UserFormModal';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await usersAPI.getAll();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Error loading users');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await usersAPI.delete(id);
                setUsers(users.filter(u => u._id !== id));
                alert('User deleted successfully');
            } catch (error) {
                alert('Error deleting user');
            }
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingUser(null);
        fetchUsers();
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    if (loading) {
        return <div className="users-loading">Loading users...</div>;
    }

    return (
        <div className="users-page">
            <div className="users-header">
                <div>
                    <h2>Users Management</h2>
                    <p>Manage registered users</p>
                </div>
            </div>

            <div className="users-filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="users-stats">
                <span>Total Users: <strong>{filteredUsers.length}</strong></span>
                <span>Active: <strong>{filteredUsers.filter(u => u.isActive).length}</strong></span>
                <span>Inactive: <strong>{filteredUsers.filter(u => !u.isActive).length}</strong></span>
            </div>

            {showForm && (
                <UserFormModal
                    user={editingUser}
                    onClose={handleFormClose}
                />
            )}

            <div className="users-table-container">
                {filteredUsers.length > 0 ? (
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Registered</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <div className="user-name">{user.name}</div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone || 'N/A'}</td>
                                    <td>
                                        <span className={`role-tag role-${user.role}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${user.isActive ? 'status-active' : 'status-inactive'}`}>
                                            {user.isActive ? '✓ Active' : '✗ Inactive'}
                                        </span>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="btn-edit"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="btn-delete"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-users">
                        <div className="no-users-icon">👥</div>
                        <h3>No users found</h3>
                        <p>No registered users match your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
