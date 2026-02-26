import './CustomerSupport.css';
import logo from '../../asset/logo.png';
import freeShippingGif from '../../asset/support/original-f0e105470e993aefbbea15484cb58abf.gif';
import cashOnDeliveryGif from '../../asset/support/cash on delivery.gif';
import onlineSupportGif from '../../asset/support/24x7.gif';
import paymentGif from '../../asset/support/different types of payment.gif';

const CustomerSupport = () => {
    const supportItems = [
        {
            id: 1,
            title: 'Free Shipping',
            description: 'Free Shipping for every orders!',
            gif: freeShippingGif
        },
        {
            id: 2,
            title: 'Cash On Delivery',
            description: 'we give Cash On Delivery services!',
            gif: cashOnDeliveryGif
        },
        {
            id: 3,
            title: 'Online Support',
            description: '24 hours a day, 7 days a week',
            gif: onlineSupportGif
        },
        {
            id: 4,
            title: 'Multy ways Payment',
            description: 'Pay with Multiple Credit Cards!',
            gif: paymentGif
        }
    ];

    return (
        <div className="customer-support__container">
            <img src={logo} alt="Dairy Drop Logo" className="customer-support__logo" />
            <h2 className="customer-support__title">Customers support</h2>
            <div className="customer-support__items">
                {supportItems.map(item => (
                    <div key={item.id} className="support-item">
                        <img src={item.gif} alt={item.title} className="support-item__gif" />
                        <h3 className="support-item__title">{item.title}</h3>
                        <p className="support-item__description">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerSupport;
