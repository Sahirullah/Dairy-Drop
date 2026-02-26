import { useState } from 'react';
import './FAQ.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            id: 1,
            question: 'What are your delivery timings?',
            answer: 'We deliver Monday to Sunday from 8 AM to 8 PM. Orders placed before 6 PM are delivered the next day.'
        },
        {
            id: 2,
            question: 'Do you offer free shipping?',
            answer: 'Yes, we offer free shipping on all orders across the city. No minimum order value required.'
        },
        {
            id: 3,
            question: 'What payment methods do you accept?',
            answer: 'We accept cash on delivery, credit cards, debit cards, and digital wallets like Google Pay and Apple Pay.'
        },
        {
            id: 4,
            question: 'How can I track my order?',
            answer: 'You can track your order in real-time through your account dashboard. You will also receive SMS and email updates.'
        },
        {
            id: 5,
            question: 'What is your return policy?',
            answer: 'We offer a 24-hour return policy for unopened products. Please contact our support team for assistance.'
        },
        {
            id: 6,
            question: 'Are your products fresh?',
            answer: 'Yes, all our dairy products are sourced fresh daily from verified suppliers and delivered to your doorstep within 24 hours.'
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq__container">
            <div className="faq__wrapper">
                <h2 className="faq__title">People also ask</h2>
                <div className="faq__items">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="faq__item">
                            <button
                                className={`faq__question ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <span>{faq.question}</span>
                                <ExpandMoreIcon className="faq__icon" />
                            </button>
                            {activeIndex === index && (
                                <div className="faq__answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
