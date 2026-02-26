import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryFormModal.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CategoryFormModal = ({ category, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        isFeatured: false,
        isActive: true,
        order: 0,
    });
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || '',
                description: category.description || '',
                isFeatured: category.isFeatured || false,
                isActive: category.isActive !== undefined ? category.isActive : true,
                order: category.order || 0,
            });
            setPreviewImage(category.image || '');
        }
    }, [category]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('adminToken');
            const data = new FormData();

            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('isFeatured', formData.isFeatured);
            data.append('isActive', formData.isActive);
            data.append('order', formData.order);

            if (image) {
                data.append('image', image);
            }

            if (category) {
                await axios.put(`${API_URL}/categories/${category._id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Category updated successfully!');
            } else {
                await axios.post(`${API_URL}/categories`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Category created successfully!');
            }

            onClose();
        } catch (error) {
            alert('Error saving category: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="category-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{category ? 'Edit Category' : 'Add New Category'}</h2>
                    <button onClick={onClose} className="modal-close">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="category-form">
                    <div className="form-group">
                        <label>Category Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Men's Fashion, Women's Fashion"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Brief description of the category"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Display Order</label>
                            <input
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={handleChange}
                                min="0"
                                placeholder="0"
                            />
                            <small>Lower numbers appear first</small>
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                            />
                            <span>Featured Category</span>
                        </label>
                        <small>Featured categories appear on the homepage</small>
                    </div>

                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                            />
                            <span>Active</span>
                        </label>
                        <small>Inactive categories won't be displayed</small>
                    </div>

                    <div className="form-group">
                        <label>Category Image *</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input"
                            required={!category}
                        />
                        <small>Upload an image for this category</small>
                    </div>

                    {previewImage && (
                        <div className="image-preview">
                            <label>Preview:</label>
                            <div className="preview-container">
                                <img src={previewImage} alt="Preview" />
                            </div>
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="btn-submit">
                            {loading ? 'Saving...' : (category ? 'Update Category' : 'Create Category')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryFormModal;
