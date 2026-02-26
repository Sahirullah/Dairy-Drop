import './CustomerReview.css';
import abidImg from '../../asset/review/abid.png';
import ihsanImg from '../../asset/review/ihsan (1).png';
import khadijaImg from '../../asset/review/khadija.png';

const CustomerReview = () => {
    const reviews = [
        {
            id: 1,
            name: 'Abid',
            image: abidImg,
            review: 'Excellent quality products and fast delivery. Highly recommended!',
            rating: 5
        },
        {
            id: 2,
            name: 'Ihsan',
            image: ihsanImg,
            review: 'Great customer service and authentic dairy products. Very satisfied!',
            rating: 5
        },
        {
            id: 3,
            name: 'Khadija',
            image: khadijaImg,
            review: 'Fresh products delivered on time. Best dairy shop in town!',
            rating: 5
        }
    ];

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    return (
        <div className="customer-review__container">
            <h2 className="customer-review__title">Customer Reviews</h2>
            <div className="customer-review__items">
                {reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <img src={review.image} alt={review.name} className="review-card__image" />
                        <h3 className="review-card__name">{review.name}</h3>
                        <div className="review-card__rating">
                            {renderStars(review.rating)}
                        </div>
                        <p className="review-card__text">{review.review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerReview;
