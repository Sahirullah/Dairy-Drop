import React from 'react';
import './OrderDetailsModal.css';

const OrderDetailsModal = ({ order, onClose, onStatusChange }) => {
    if (!order) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="order-details-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Order Details</h2>
                    <button onClick={onClose} className="modal-close">&times;</button>
                </div>

                <div className="order-details-content">
                    <div className="details-section">
                        <h3>Order Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="label">Order ID:</span>
                                <span className="value">#{order._id}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Date:</span>
                                <span className="value">{new Date(order.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Status:</span>
                                <span className="value status-badge" style={{
                                    backgroundColor: order.status === 'delivered' ? '#4caf50' :
                                        order.status === 'shipped' ? '#9c27b0' :
                                            order.status === 'processing' ? '#2196f3' :
                                                order.status === 'cancelled' ? '#f44336' : '#ffc107',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    textTransform: 'capitalize'
                                }}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="label">Payment:</span>
                                <span className={`value ${order.isPaid ? 'paid' : 'unpaid'}`}>
                                    {order.isPaid ? '✓ Paid' : '✗ Unpaid'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="details-section">
                        <h3>Customer Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="label">Name:</span>
                                <span className="value">{order.user?.name || 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Email:</span>
                                <span className="value">{order.user?.email || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="details-section">
                        <h3>Shipping Address</h3>
                        <div className="address-box">
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                            <p>{order.shippingAddress.country}</p>
                        </div>
                    </div>

                    <div className="details-section">
                        <h3>Order Items</h3>
                        <div className="order-items-list">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="order-item-row">
                                    <img src={item.image} alt={item.name} />
                                    <div className="item-info">
                                        <h4>{item.name}</h4>
                                        <p>Size: {item.size} | Color: {item.color}</p>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="item-price">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="details-section">
                        <h3>Order Summary</h3>
                        <div className="summary-grid">
                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span>${order.itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping:</span>
                                <span>${order.shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax:</span>
                                <span>${order.taxPrice.toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total:</span>
                                <span>${order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="details-section">
                        <h3>Update Status</h3>
                        <select
                            value={order.status}
                            onChange={(e) => {
                                onStatusChange(order._id, e.target.value);
                                onClose();
                            }}
                            className="status-update-select"
                        >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
