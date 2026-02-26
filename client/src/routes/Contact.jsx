import { useEffect, useState } from 'react';
import { TabTitle } from '../utils/General';
import './Contact.css';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Contact = () => {
    TabTitle("Contact Us - Dairy Drop");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            id: 1,
            question: 'What are your delivery times?',
            answer: 'We deliver within 24-48 hours in Addis Ababa and surrounding areas. Delivery times may vary based on location.'
        },
        {
            id: 2,
            question: 'Do you offer returns?',
            answer: 'Yes, we offer a 7-day return policy for unopened products. Please contact us for more details.'
        },
        {
            id: 3,
            question: 'What payment methods do you accept?',
            answer: 'We accept credit cards, debit cards, mobile money, and bank transfers for your convenience.'
        },
        {
            id: 4,
            question: 'How can I track my order?',
            answer: 'You\'ll receive a tracking number via email once your order ships. You can use it to track your delivery.'
        },
        {
            id: 5,
            question: 'Are your products fresh?',
            answer: 'Yes, all our dairy products are sourced fresh daily from verified suppliers and delivered within 24 hours.'
        },
        {
            id: 6,
            question: 'Do you offer bulk orders?',
            answer: 'Yes, we offer special pricing for bulk orders. Please contact our sales team for more information.'
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact__container">
            {/* Hero Section */}
            <section className="contact__hero">
                <div className="contact__hero__content">
                    <h1>Get In Touch</h1>
                    <p>We'd love to hear from you. Send us a message!</p>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="contact__info__section">
                <div className="contact__info__grid">
                    <div className="contact__info__card">
                        <div className="info__icon">
                            <LocalPhoneIcon />
                        </div>
                        <h3>Phone</h3>
                        <p>+123 4567 890</p>
                        <p className="info__subtext">Mon-Fri, 9AM-6PM</p>
                    </div>

                    <div className="contact__info__card">
                        <div className="info__icon">
                            <EmailIcon />
                        </div>
                        <h3>Email</h3>
                        <p>shop@dairydrop.com</p>
                        <p className="info__subtext">We'll respond within 24 hours</p>
                    </div>

                    <div className="contact__info__card">
                        <div className="info__icon">
                            <LocationOnIcon />
                        </div>
                        <h3>Address</h3>
                        <p>Addis Ababa, Ethiopia</p>
                        <p className="info__subtext">Visit our store</p>
                    </div>

                    <div className="contact__info__card">
                        <div className="info__icon">
                            <AccessTimeIcon />
                        </div>
                        <h3>Business Hours</h3>
                        <p>Mon-Fri: 9AM - 6PM</p>
                        <p className="info__subtext">Sat-Sun: 10AM - 4PM</p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact__form__section">
                <div className="contact__form__container">
                    <div className="form__header">
                        <h2>Send us a Message</h2>
                        <p>Fill out the form below and we'll get back to you as soon as possible</p>
                    </div>

                    {submitted && (
                        <div className="success__message">
                            <div className="success__icon">✓</div>
                            <h3>Thank you for your message!</h3>
                            <p>We've received your inquiry and will respond shortly.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="contact__form">
                        <div className="form__row">
                            <div className="form__group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="form__group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form__row">
                            <div className="form__group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+123 456 7890"
                                />
                            </div>
                            <div className="form__group">
                                <label htmlFor="subject">Subject *</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form__group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us more about your inquiry..."
                                rows="6"
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="submit__btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <SendIcon style={{ marginRight: '8px' }} />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </section>

            {/* Map Section */}
            <section className="contact__map__section">
                <h2>Find Us</h2>
                <div className="map__container">
                    <iframe
                        title="Dairy Drop Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6829271099!2d38.74677!3d9.03212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cecc1e1d1d%3A0x1234567890!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1234567890"
                        width="100%"
                        height="400"
                        style={{ border: 0, borderRadius: '10px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="contact__faq__section">
                <div className="contact__faq__container">
                    <h2>People also ask</h2>
                    <div className="contact__faq__list">
                        {faqs.map((faq, index) => (
                            <div key={faq.id} className="contact__faq__item">
                                <button
                                    className={`contact__faq__question ${activeIndex === index ? 'active' : ''}`}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span>{faq.question}</span>
                                    <ExpandMoreIcon className="contact__faq__icon" />
                                </button>
                                {activeIndex === index && (
                                    <div className="contact__faq__answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Contact;
