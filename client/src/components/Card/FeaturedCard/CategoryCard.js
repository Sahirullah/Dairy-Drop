import { Link } from 'react-router-dom';
import './CategoryCard.css'

const CategoryCard = (props) => {
    // Handle both old and new data structure
    const categoryData = {
        name: props.data.name,
        image: props.data.image,
        slug: props.data.slug,
        url: props.data.slug ? `/category/${props.data.slug}` : `/category/${props.data._id}`
    };

    return (
        <Link to={categoryData.url} style={{ textDecoration: 'none' }}>
            <div className="category__card__card">
                <div className="category__image">
                    <img src={categoryData.image} alt={categoryData.name} className="product__img" />
                    <div className="category__hover__label">
                        {categoryData.name}
                    </div>
                </div>
                <div className="category__card__detail">
                    <div className="category__name">
                        <span>{categoryData.name}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CategoryCard;
