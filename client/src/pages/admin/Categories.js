import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryFormModal from '../../components/admin/CategoryFormModal';
import './Categories.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get(`${API_URL}/categories`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Error loading categories');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const token = localStorage.getItem('adminToken');
                await axios.delete(`${API_URL}/categories/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories(categories.filter(c => c._id !== id));
                alert('Category deleted successfully');
            } catch (error) {
                alert('Error deleting category');
            }
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingCategory(null);
        fetchCategories();
    };

    if (loading) {
        return <div className="categories-loading">Loading categories...</div>;
    }

    return (
        <div className="categories-page">
            <div className="categories-header">
                <div>
                    <h2>Categories Management</h2>
                    <p>Manage your product categories and featured sections</p>
                </div>
                <button onClick={() => setShowForm(true)} className="btn-add-category">
                    <span>➕</span> Add New Category
                </button>
            </div>

            {showForm && (
                <CategoryFormModal
                    category={editingCategory}
                    onClose={handleFormClose}
                />
            )}

            <div className="categories-grid">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category._id} className="category-card">
                            <div className="category-image">
                                <img src={category.image} alt={category.name} />
                                {category.isFeatured && (
                                    <span className="featured-badge">Featured</span>
                                )}
                                {!category.isActive && (
                                    <span className="inactive-badge">Inactive</span>
                                )}
                            </div>
                            <div className="category-info">
                                <h3>{category.name}</h3>
                                <p className="category-slug">/{category.slug}</p>
                                {category.description && (
                                    <p className="category-description">{category.description}</p>
                                )}
                                <div className="category-meta">
                                    <span className="category-order">Order: {category.order}</span>
                                </div>
                                <div className="category-actions">
                                    <button onClick={() => handleEdit(category)} className="btn-edit">
                                        ✏️ Edit
                                    </button>
                                    <button onClick={() => handleDelete(category._id)} className="btn-delete">
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-categories">
                        <div className="no-categories-icon">📑</div>
                        <h3>No categories yet</h3>
                        <p>Start by adding your first category</p>
                        <button onClick={() => setShowForm(true)} className="btn-add-first">
                            Add Your First Category
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
