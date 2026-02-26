import { Link } from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ItemCard from '../../Card/ItemCard/ItemCard';
import ReactLoading from 'react-loading';
import './FeaturedItems.css'

const FeaturedItems = (props) => {
    return (
         
        <div className="featured__products__container">
            <div className="featured__products">
                <div className="featured__products__header">
                    <h3 className='featured__items__header__big'>Featured Items </h3><Link to="/all-products" className='featured__header__small'>Show all<ArrowRightAltIcon /></Link>
                </div>
                <div className="featured__products__header__line"></div>
                <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
                    {!props.items && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto'/>}
                { props.items && props.items.length > 0 &&
                    <div className="featured__products__card__container">
                        {props.items.map((item, index) => (
                            <ItemCard key={item._id || index} item={item} category="featured"/>
                        ))}
                    </div>
                }
                { props.items && props.items.length === 0 &&
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <p>No products available</p>
                    </div>
                }
                </div>
            </div>
        </div>        
     );
}
 
export default FeaturedItems;