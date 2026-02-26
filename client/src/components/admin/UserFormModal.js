import React, { useState, useEffect } from 'react';
import { usersAPI } from '../../services/api';
import './UserFormModal.css';

const UserFormModal = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        isActive: true,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                isActive: user.isActive !== undefined ? user.isActive : true,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (user) {
                await usersAPI.update(user._id, formData);
                alert('User updated successfully!');
            }
            onClose();
        } catch (error) {
            alert('Error saving user: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="user-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit User</h2>
                    <button onClick={onClose} className="modal-close">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="user-form">
                    <div className="form-group">
                        <label>Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter user name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter email address"
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                            />
                            <span>Active User</span>
                        </label>
                        <small>Inactive users cannot login to the website</small>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="btn-submit">
                            {loading ? 'Saving...' : 'Update User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;
