import React, { useState, useEffect } from 'react';
import { productsAPI, categoriesAPI } from '../../services/api';
import './ProductForm.css';

const ProductForm = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        color: '',
        type: '',
        description: '',
        price: '',
        comparePrice: '',
        size: '',
        highlights: '',
        detail: '',
    });
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoriesAPI.getAll();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                category: product.category || '',
                color: product.color || '',
                type: product.type || '',
                description: product.description || '',
                price: product.price || '',
                comparePrice: product.comparePrice || '',
                size: Array.isArray(product.size) ? product.size.join(', ') : '',
                highlights: Array.isArray(product.highlights) ? product.highlights.join(', ') : '',
                detail: product.detail || '',
            });
            setExistingImages(product.image || []);
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleRemoveExistingImage = async (imageUrl) => {
        if (window.confirm('Remove this image?')) {
            try {
                if (product) {
                    await productsAPI.deleteImage(product._id, imageUrl);
                }
                setExistingImages(existingImages.filter(img => img !== imageUrl));
            } catch (error) {
                alert('Error removing image');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();

            // Append form fields
            Object.keys(formData).forEach(key => {
                if (key === 'size' || key === 'highlights') {
                    const arrayValue = formData[key].split(',').map(item => item.trim()).filter(item => item);
                    data.append(key, JSON.stringify(arrayValue));
                } else {
                    data.append(key, formData[key]);
                }
            });

            // Append existing images
            if (product) {
                data.append('existingImages', JSON.stringify(existingImages));
            }

            // Append new images
            images.forEach(image => {
                data.append('images', image);
            });

            if (product) {
                await productsAPI.update(product._id, data);
                alert('Product updated successfully!');
            } else {
                await productsAPI.create(data);
                alert('Product created successfully!');
            }

            onClose();
        } catch (error) {
            alert('Error saving product: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="product-form-container">
                <div className="form-header">
                    <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Product Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Category *</label>
                            <select name="category" value={formData.category} onChange={handleChange} required>
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Type *</label>
                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                placeholder="e.g., Shoes, Jeans, T-Shirt"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Color *</label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Compare Price</label>
                            <input
                                type="number"
                                name="comparePrice"
                                value={formData.comparePrice}
                                onChange={handleChange}
                                step="0.01"
                                placeholder="Original price (optional)"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Sizes (comma separated)</label>
                            <input
                                type="text"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                placeholder="S, M, L, XL"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Highlights (comma separated)</label>
                        <textarea
                            name="highlights"
                            value={formData.highlights}
                            onChange={handleChange}
                            rows="2"
                            placeholder="Feature 1, Feature 2, Feature 3"
                        />
                    </div>

                    <div className="form-group">
                        <label>Details *</label>
                        <textarea
                            name="detail"
                            value={formData.detail}
                            onChange={handleChange}
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Product Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <small>You can select multiple images</small>
                    </div>

                    {existingImages.length > 0 && (
                        <div className="existing-images">
                            <label>Current Images:</label>
                            <div className="image-preview-grid">
                                {existingImages.map((img, index) => (
                                    <div key={index} className="image-preview">
                                        <img src={img} alt={`Product ${index + 1}`} />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExistingImage(img)}
                                            className="remove-image-btn"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="btn-submit">
                            {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
