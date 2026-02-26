import { useEffect, useState } from 'react';
import { TabTitle } from '../utils/General';
import './About.css';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GrassIcon from '@mui/icons-material/Grass';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import aboutImg from '../asset/img/about.jpg';

const About = () => {
    TabTitle("About Us - Dairy Drop");
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const faqs = [
        {
            id: 1,
            question: 'What makes Dairy Drop different from other dairy retailers?',
            answer: 'We source directly from local farmers, ensuring freshness and quality. Our commitment to sustainability and customer satisfaction sets us apart in the industry.'
        },
        {
            id: 2,
            question: 'How do you ensure product freshness?',
            answer: 'All our products are sourced fresh daily and delivered within 24 hours. We maintain strict quality control standards and work only with verified suppliers.'
        },
        {
            id: 3,
            question: 'Do you support local farmers?',
            answer: 'Yes, we work directly with local dairy farmers and producers. By choosing Dairy Drop, you support sustainable farming practices and local communities.'
        },
        {
            id: 4,
            question: 'What is your sustainability commitment?',
            answer: 'We are committed to eco-friendly practices including sustainable packaging, reducing carbon footprint, and supporting environmentally responsible farming methods.'
        },
        {
            id: 5,
            question: 'How can I be sure about product quality?',
            answer: 'Every product undergoes rigorous testing and quality checks. We only partner with certified suppliers who meet our strict quality standards.'
        },
        {
            id: 6,
            question: 'What is your customer support availability?',
            answer: 'Our dedicated support team is available 24/7 to assist you with any questions or concerns. We are committed to providing excellent customer service.'
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="about__container">
            {/* Hero Section */}
            <section className="about__hero">
                <div className="about__hero__content">
                    <h1>About Dairy Drop</h1>
                    <p>Your trusted source for premium dairy products and quality essentials</p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="about__mission">
                <div className="about__mission__content">
                    <div className="mission__text">
                        <h2>Our Mission</h2>
                        <p>
                            At Dairy Drop, we're committed to delivering the finest quality dairy products directly to your doorstep. 
                            We believe in supporting local farmers and providing our customers with fresh, nutritious, and delicious products 
                            that enhance their daily lives.
                        </p>
                        <p>
                            Our mission is to make premium dairy products accessible to everyone while maintaining the highest standards 
                            of quality, freshness, and customer satisfaction.
                        </p>
                    </div>
                    <div className="mission__image">
                        <img src={aboutImg} alt="Dairy Drop Mission" />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="about__values">
                <h2>Our Core Values</h2>
                <div className="values__grid">
                    <div className="value__card">
                        <div className="value__icon">
                            <VerifiedUserIcon />
                        </div>
                        <h3>Quality</h3>
                        <p>We source only the finest dairy products from trusted suppliers and farmers who share our commitment to excellence.</p>
                    </div>
                    <div className="value__card">
                        <div className="value__icon">
                            <LocalShippingIcon />
                        </div>
                        <h3>Fast Delivery</h3>
                        <p>Quick and reliable delivery ensures your products arrive fresh and on time, every single time.</p>
                    </div>
                    <div className="value__card">
                        <div className="value__icon">
                            <SupportAgentIcon />
                        </div>
                        <h3>Customer Care</h3>
                        <p>Our dedicated support team is always ready to help you with any questions or concerns you may have.</p>
                    </div>
                    <div className="value__card">
                        <div className="value__icon">
                            <GrassIcon />
                        </div>
                        <h3>Sustainability</h3>
                        <p>We're committed to sustainable practices that protect our environment for future generations.</p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="about__story">
                <div className="story__content">
                    <h2>Our Story</h2>
                    <div className="story__text">
                        <p>
                            Dairy Drop was founded with a simple vision: to revolutionize how people access premium dairy products. 
                            What started as a small local initiative has grown into a trusted brand serving thousands of satisfied customers.
                        </p>
                        <p>
                            We work directly with local dairy farmers and producers to ensure every product meets our strict quality standards. 
                            Our team is passionate about bringing the freshest, most delicious dairy products to your table.
                        </p>
                        <p>
                            Today, Dairy Drop stands as a symbol of quality, reliability, and customer-first service in the dairy industry.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="about__stats">
                <div className="stats__grid">
                    <div className="stat__item">
                        <h3>10K+</h3>
                        <p>Happy Customers</p>
                    </div>
                    <div className="stat__item">
                        <h3>500+</h3>
                        <p>Products Available</p>
                    </div>
                    <div className="stat__item">
                        <h3>50+</h3>
                        <p>Partner Farmers</p>
                    </div>
                    <div className="stat__item">
                        <h3>24/7</h3>
                        <p>Customer Support</p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="about__team">
                <h2>Why Choose Us?</h2>
                <div className="team__reasons">
                    <div className="reason__item">
                        <div className="reason__number">1</div>
                        <h4>Premium Quality</h4>
                        <p>All products are carefully selected and tested for quality and freshness.</p>
                    </div>
                    <div className="reason__item">
                        <div className="reason__number">2</div>
                        <h4>Competitive Prices</h4>
                        <p>We offer the best prices without compromising on quality.</p>
                    </div>
                    <div className="reason__item">
                        <div className="reason__number">3</div>
                        <h4>Easy Ordering</h4>
                        <p>Simple and secure online ordering process with multiple payment options.</p>
                    </div>
                    <div className="reason__item">
                        <div className="reason__number">4</div>
                        <h4>Fast Shipping</h4>
                        <p>Quick delivery to your doorstep with real-time tracking.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="about__faq">
                <h2>People also ask</h2>
                <div className="about__faq__grid">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="about__faq__card">
                            <button
                                className={`about__faq__question ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <span>{faq.question}</span>
                                <ExpandMoreIcon className="about__faq__icon" />
                            </button>
                            {activeIndex === index && (
                                <div className="about__faq__answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
