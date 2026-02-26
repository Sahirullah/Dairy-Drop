import React, { useState, useEffect } from 'react';
import { productsAPI, categoriesAPI } from '../../services/api';
import './ProductFormModal.css';

const ProductFormModal = ({ product, onClose }) => {
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
    const [previewImages, setPreviewImages] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoriesAPI.getAll();
                if (response.data && response.data.length > 0) {
                    setCategories(response.data);
                } else {
                    // Fallback to hardcoded categories if API returns empty
                    setCategories([
                        { _id: '1', name: 'Milk', slug: 'milk' },
                        { _id: '2', name: 'Yogurt', slug: 'yogurt' },
                        { _id: '3', name: 'Butter', slug: 'butter' },
                        { _id: '4', name: 'Cheese', slug: 'cheese' },
                        { _id: '5', name: 'Cream', slug: 'cream' },
                        { _id: '6', name: 'Men', slug: 'men' },
                        { _id: '7', name: 'Women', slug: 'women' },
                        { _id: '8', name: 'Kids', slug: 'kids' },
                    ]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Fallback to hardcoded categories on error
                setCategories([
                    { _id: '1', name: 'Milk', slug: 'milk' },
                    { _id: '2', name: 'Yogurt', slug: 'yogurt' },
                    { _id: '3', name: 'Butter', slug: 'butter' },
                    { _id: '4', name: 'Cheese', slug: 'cheese' },
                    { _id: '5', name: 'Cream', slug: 'cream' },
                    { _id: '6', name: 'Men', slug: 'men' },
                    { _id: '7', name: 'Women', slug: 'women' },
                    { _id: '8', name: 'Kids', slug: 'kids' },
                ]);
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
        const files = Array.from(e.target.files);
        setImages(files);

        // Create preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
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
        <div className="modal-backdrop" onClick={onClose}>
            <div className="product-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="modal-close">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Product Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter product name"
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
                                placeholder="e.g., Black, White, Blue"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Price *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                                placeholder="0.00"
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
                            placeholder="Enter product description"
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
                            placeholder="Enter detailed product information"
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
                            className="file-input"
                        />
                        <small>You can select multiple images (max 10)</small>
                    </div>

                    {previewImages.length > 0 && (
                        <div className="image-previews">
                            <label>New Images Preview:</label>
                            <div className="preview-grid">
                                {previewImages.map((preview, index) => (
                                    <div key={index} className="preview-item">
                                        <img src={preview} alt={`Preview ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {existingImages.length > 0 && (
                        <div className="existing-images">
                            <label>Current Images:</label>
                            <div className="preview-grid">
                                {existingImages.map((img, index) => (
                                    <div key={index} className="preview-item">
                                        <img src={img} alt={`Product ${index + 1}`} />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExistingImage(img)}
                                            className="remove-btn"
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

export default ProductFormModal;
