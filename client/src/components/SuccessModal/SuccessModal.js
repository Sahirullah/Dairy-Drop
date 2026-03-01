import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="success-modal-backdrop">
            <div className="success-modal-card">
                <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h2 className="success-title">Order Placed Successfully!</h2>
                <p className="success-message">{message}</p>
                <div className="success-details">
                    <p>Thank you for your purchase. Your order has been confirmed and will be processed shortly.</p>
                </div>
                <button onClick={onClose} className="success-btn">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
