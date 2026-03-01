import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { AlertContext } from '../Context/AlertContext';
import SuccessModal from '../components/SuccessModal/SuccessModal';
import axios from 'axios';
import './Checkout.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, loading } = useContext(UserContext);
    const { showAlert } = useContext(AlertContext);
    const [submitting, setSubmitting] = useState(false);

    const initialOrderItems = location.state?.orderItems || [];
    const [orderItems, setOrderItems] = useState(initialOrderItems);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    useEffect(() => {
        // Update form data when user changes
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || prev.name || '',
                email: user.email || prev.email || '',
                phone: user.phone || prev.phone || '',
            }));
        }
    }, [user]);

    useEffect(() => {
        if (orderItems.length === 0) {
            navigate('/shop');
        }

        // Check if user is logged in
        if (!user && !loading) {
            showAlert('Please login account', 'info');
            navigate('/account/login', { state: { from: '/checkout', orderItems } });
        }
    }, [orderItems, navigate, user, loading, showAlert]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedItems = [...orderItems];
        updatedItems[index].quantity = newQuantity;
        setOrderItems(updatedItems);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = orderItems.filter((_, i) => i !== index);
        setOrderItems(updatedItems);
        if (updatedItems.length === 0) {
            showAlert('No items in cart. Redirecting to shop...', 'info');
            navigate('/shop');
        }
    };

    const calculateTotal = () => {
        const itemsPrice = orderItems.reduce((acc, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;
            return acc + (price * quantity);
        }, 0);

        const shippingPrice = itemsPrice > 100 ? 0 : 10;
        const taxPrice = itemsPrice * 0.1; // 10% tax
        const totalPrice = itemsPrice + shippingPrice + taxPrice;

        return {
            itemsPrice: Number(itemsPrice.toFixed(2)),
            shippingPrice: Number(shippingPrice.toFixed(2)),
            taxPrice: Number(taxPrice.toFixed(2)),
            totalPrice: Number(totalPrice.toFixed(2)),
        };
    };

    const totals = calculateTotal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phone number
        if (!formData.phone || formData.phone.trim() === '') {
            showAlert('Please enter a phone number', 'error');
            return;
        }

        if (!user) {
            showAlert('Please login account', 'info');
            navigate('/account/login', { state: { from: '/checkout', orderItems } });
            return;
        }

        const token = localStorage.getItem('userToken');

        if (!token) {
            showAlert('Session expired. Please login again', 'error');
            navigate('/account/login', { state: { from: '/checkout', orderItems } });
            return;
        }

        setSubmitting(true);

        try {
            // Validate and format order items
            const formattedOrderItems = orderItems.map(item => {
                // Ensure size is a string, not an array
                let sizeValue = item.size;
                if (Array.isArray(sizeValue)) {
                    sizeValue = sizeValue[0] || '';
                }

                // Ensure image is a string, not an array
                let imageValue = item.image;
                if (Array.isArray(imageValue)) {
                    imageValue = imageValue[0] || '';
                }

                return {
                    product: item.product || item._id,
                    name: item.name || '',
                    quantity: Number(item.quantity) || 1,
                    image: String(imageValue || ''),
                    price: Number(item.price) || 0,
                    size: String(sizeValue || ''),
                    color: String(item.color || ''),
                };
            });

            // Calculate totals with validation
            const itemsPrice = Number(totals.itemsPrice) || 0;
            const taxPrice = Number(totals.taxPrice) || 0;
            const shippingPrice = Number(totals.shippingPrice) || 0;
            const totalPrice = Number(totals.totalPrice) || 0;

            const orderData = {
                orderItems: formattedOrderItems,
                shippingAddress: {
                    street: formData.street.trim(),
                    city: formData.city.trim(),
                    state: formData.state.trim(),
                    zipCode: formData.zipCode.trim(),
                    country: formData.country.trim(),
                },
                paymentMethod: 'Card',
                itemsPrice: itemsPrice,
                taxPrice: taxPrice,
                shippingPrice: shippingPrice,
                totalPrice: totalPrice,
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
            };

            console.log('Sending order data:', JSON.stringify(orderData, null, 2));

            const { data } = await axios.post(`${API_URL}/orders`, orderData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Mark order as paid (in real app, this would be after payment gateway)
            await axios.put(`${API_URL}/orders/${data._id}/pay`, {
                id: 'PAYMENT_' + Date.now(),
                status: 'COMPLETED',
                update_time: new Date().toISOString(),
                email_address: formData.email,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error placing order:', error);
            console.error('Error response:', error.response?.data);
            if (error.response?.status === 401) {
                showAlert('Session expired. Please login again', 'error');
                navigate('/account/login', { state: { from: '/checkout', orderItems } });
            } else {
                const errorMsg = error.response?.data?.message || error.message;
                showAlert('Error placing order: ' + errorMsg, 'error');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        navigate('/');
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <h1>Checkout</h1>

                <div className="checkout-content">
                    <div className="checkout-form-section">
                        <h2>Shipping Information</h2>
                        <form onSubmit={handleSubmit} className="checkout-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your full name"
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
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+1 (555) 000-0000"
                                    pattern="[0-9+\-\s\(\)]+"
                                    title="Please enter a valid phone number"
                                />
                            </div>

                            <div className="form-group">
                                <label>Street Address *</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    required
                                    placeholder="123 Main Street, Apt 4B"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        placeholder="City"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>State/Province *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        placeholder="State"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>ZIP/Postal Code *</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        required
                                        placeholder="12345"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Country *</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        placeholder="Country"
                                    />
                                </div>
                            </div>

                            <button type="submit" disabled={submitting} className="pay-now-btn">
                                {submitting ? 'Processing...' : 'PAY NOW'}
                            </button>
                        </form>
                    </div>

                    <div className="order-summary-section">
                        <h2>Order Summary</h2>
                        <div className="order-items">
                            {orderItems.map((item, index) => (
                                <div key={index} className="order-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p>Size: {item.size}</p>
                                        <p>Color: {item.color}</p>
                                        <div className="quantity-control">
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                                className="qty-btn"
                                            >
                                                −
                                            </button>
                                            <span className="qty-display">{item.quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                                className="qty-btn"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="item-price">
                                        <div>${(item.price * item.quantity).toFixed(2)}</div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(index)}
                                            className="remove-btn"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-totals">
                            <div className="total-row">
                                <span>Subtotal:</span>
                                <span>${totals.itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className="total-row">
                                <span>Shipping:</span>
                                <span>${totals.shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className="total-row">
                                <span>Tax (10%):</span>
                                <span>${totals.taxPrice.toFixed(2)}</span>
                            </div>
                            <div className="total-row total-final">
                                <span>Total:</span>
                                <span>${totals.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SuccessModal
                isOpen={showSuccessModal}
                message="Your order has been placed successfully! You will receive a confirmation email shortly."
                onClose={handleCloseSuccessModal}
            />
        </div>
    );
};

export default Checkout;
