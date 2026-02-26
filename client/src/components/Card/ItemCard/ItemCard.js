import './ItemCard.css';
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { UserContext } from "../../../Context/UserContext";
import { AlertContext } from "../../../Context/AlertContext";
import { IconButton, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { WishItemsContext } from '../../../Context/WishItemsContext';

const ItemCard = (props) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isWishlisted, setIsWishlisted] = useState(false)
    const cartItemsContext = useContext(CartItemsContext)
    const wishItemsContext = useContext(WishItemsContext)
    const { user } = useContext(UserContext)
    const { showAlert } = useContext(AlertContext)
    const navigate = useNavigate()

    const handleAddToWishList = () => {
        wishItemsContext.addItem(props.item)
        setIsWishlisted(!isWishlisted)
    }

    const handleAddToCart = () => {
        cartItemsContext.addItem(props.item, 1)
    }

    const handleShopNow = () => {
        if (!user) {
            showAlert('Please login account', 'info');
            navigate('/account/login', { 
                state: { 
                    from: '/checkout',
                    orderItems: [{
                        ...props.item,
                        quantity: 1,
                        product: props.item._id
                    }]
                } 
            });
            return;
        }
        
        cartItemsContext.addItem(props.item, 1)
        // Pass the item as orderItems to checkout
        navigate('/checkout', { 
            state: { 
                orderItems: [{
                    ...props.item,
                    quantity: 1,
                    product: props.item._id
                }]
            } 
        })
    }

    // Check if item and image exist
    if (!props.item || !props.item.image || props.item.image.length === 0) {
        return null; // Don't render if no data
    }

    return (
        <div className="product__card__card">
            <div className="product__card">
                <div className="product__image"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered && props.item.image[1] ?
                        <img src={props.item.image[1]} alt={props.item.name} className="product__img" /> :
                        <img src={props.item.image[0]} alt={props.item.name} className="product__img" />
                    }
                </div>
                <div className="product__card__detail">
                    <div className="product__name">
                        <Link to={`/item/${props.item.category}/${props.item._id}`}>
                            {props.item.name}
                        </Link>
                    </div>
                    <div className="product__description">
                        <span>{props.item.description}</span>
                    </div>
                    <div className="product__price">
                        <span className="current-price">${props.item.price}</span>
                        {props.item.comparePrice && (
                            <span className="compare-price">${props.item.comparePrice}</span>
                        )}
                    </div>
                    <Button 
                        onClick={handleShopNow}
                        className="product__shop__now__btn"
                        fullWidth
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            backgroundColor: '#FFE26E',
                            color: '#1a1a1a',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            padding: '12px 0',
                            borderRadius: 0,
                            textTransform: 'none',
                            letterSpacing: '0.5px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingRight: '8px',
                            '&:hover': {
                                backgroundColor: '#FFD700',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(255, 226, 110, 0.4)',
                                fontWeight: 800
                            },
                            '&:active': {
                                transform: 'translateY(0px)',
                                boxShadow: '0 2px 8px rgba(255, 226, 110, 0.3)'
                            }
                        }}
                    >
                        <span style={{ flex: 1, textAlign: 'center' }}>Shop Now</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <IconButton onClick={(e) => { e.stopPropagation(); handleAddToWishList(); }} sx={{ borderRadius: '20px', width: '32px', height: '32px', padding: '4px' }}>
                                <FavoriteBorderIcon sx={{ width: '18px', height: '18px', color: '#1a1a1a' }} />
                            </IconButton>
                            <IconButton onClick={(e) => { e.stopPropagation(); handleAddToCart(); }} sx={{ borderRadius: '20px', width: '32px', height: '32px', padding: '4px' }}>
                                <AddShoppingCartIcon sx={{ width: '18px', height: '18px', color: '#1a1a1a' }} />
                            </IconButton>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
