import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Detail.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { CartItemsContext } from '../../../Context/CartItemsContext';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Detail = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(props.item.size[0]);
    const navigate = useNavigate();

    const cartItems = useContext(CartItemsContext)
    const wishItems = useContext(WishItemsContext)

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };


    const handelQuantityIncrement = (event) => {
        setQuantity((prev) => prev += 1);
    };

    const handelQuantityDecrement = (event) => {
        if (quantity > 1) {
            setQuantity((prev) => prev -= 1);
        }
    };

    const handelAddToCart = () => {
        cartItems.addItem(props.item, quantity, size)
    }

    const handelAddToWish = () => {
        wishItems.addItem(props.item)
    }

    const handleBuyNow = () => {
        // Ensure size is a string
        const sizeValue = Array.isArray(size) ? size[0] : size;

        // Create order item for checkout
        const orderItem = {
            product: props.item._id,
            name: props.item.name,
            quantity: Number(quantity),
            image: Array.isArray(props.item.image) ? props.item.image[0] : props.item.image,
            price: Number(props.item.price),
            size: String(sizeValue || ''),
            color: String(props.item.color || ''),
        };

        console.log('Buy Now - Order Item:', orderItem);

        // Navigate to checkout with order data
        navigate('/checkout', { state: { orderItems: [orderItem] } });
    }

    return (
        <div className="product__detail__container">
            <div className="product__detail">
                <div className="product__main__detail">
                    <div className="product__name__main">{props.item.name}</div>
                    <div className="product__detail__description">{props.item.description}</div>
                    <div className="product__color">
                        <div className="product-color-label">COLOR</div>
                        <div className="product-color" style={{ backgroundColor: `${props.item.color}` }}></div>
                    </div>
                    <div className="product__price__detail">
                        <span className="current-price">${props.item.price}</span>
                        {props.item.comparePrice && (
                            <span className="compare-price">${props.item.comparePrice}</span>
                        )}
                    </div>
                </div>
                <form onSubmit={handelAddToCart} className="product__form">
                    <div className="product__quantity__and__size">
                        <div className="product__quantity">
                            <IconButton onClick={handelQuantityIncrement}>
                                <AddCircleIcon />
                            </IconButton>
                            <div type="text" name="quantity" className="quantity__input">{quantity}</div>
                            <IconButton onClick={handelQuantityDecrement}>
                                <RemoveCircleIcon fontSize='medium' />
                            </IconButton>
                        </div>

                        <div className="product size">
                            <Box sx={{ minWidth: 100 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Size</InputLabel>
                                    <Select
                                        value={size}
                                        label="size"
                                        onChange={handleSizeChange}
                                    >
                                        {props.item.size.map((size) => <MenuItem value={size}>{size}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className="collect__item__actions">
                        <div className="add__cart__add__wish">
                            <div className="add__cart">
                                <Button variant="outlined" size="large" sx={[{ '&:hover': { backgroundColor: '#FFE26E', borderColor: '#FFE26E', borderWidth: '3px', color: 'black' }, minWidth: 200, borderColor: 'black', backgroundColor: "black", color: "#FFE26E", borderWidth: '3px' }]} onClick={handelAddToCart}>ADD TO BAG</Button>
                            </div>
                            <div className="add__wish">
                                <IconButton variant="outlined" size="large" sx={[{ '&:hover': { backgroundColor: '#FFE26E', borderColor: '#FFE26E', borderWidth: '3px', color: 'black' }, borderColor: 'black', backgroundColor: "black", color: "#FFE26E", borderWidth: '3px' }]} onClick={handelAddToWish}>
                                    <FavoriteBorderIcon sx={{ width: '22px', height: '22px' }} />
                                </IconButton>
                            </div>
                        </div>
                        <div className="buy__now__section">
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={[{
                                    '&:hover': {
                                        backgroundColor: '#FFD700',
                                        transform: 'scale(1.02)'
                                    },
                                    marginTop: '15px',
                                    backgroundColor: "#FFE26E",
                                    color: "black",
                                    fontWeight: 'bold',
                                    padding: '12px',
                                    transition: 'all 0.2s'
                                }]}
                                onClick={handleBuyNow}
                            >
                                BUY NOW
                            </Button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Detail;