import './RelatedCard.css'
import { Link } from "react-router-dom"

const RelatedCard = (props) => {
    // Check if item and image exist
    if (!props.item || !props.item.image || props.item.image.length === 0) {
        return null;
    }

    return (
        <div className="related__product__card__container">
            <div className="related__product__card__inner">
                <div className="related__product__image">
                    <img
                        src={props.item.image[0]}
                        alt={props.item.name}
                        className="product__img"
                        onError={(e) => {
                            e.target.src = '/placeholder.png';
                        }}
                    />
                </div>
                <div className="related__product__card__detail">
                    <div className="related__product__name">
                        <Link to={`/item/${props.item.category}/${props.item._id}`}>
                            {props.item.name}
                        </Link>

                    </div>
                    <div className="related__product__description">
                        <span>{props.item.description}</span>
                    </div>
                    <div className="related__product__price">
                        <span className="current-price">${props.item.price}</span>
                        {props.item.comparePrice && (
                            <span className="compare-price">${props.item.comparePrice}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelatedCard;
