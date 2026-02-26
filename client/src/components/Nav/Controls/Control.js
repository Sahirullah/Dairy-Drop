import './Control.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../../Card/Cart/Cart';
import { useContext } from 'react';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { UserContext } from '../../../Context/UserContext';

const Control = () => {
    const wishItems = useContext(WishItemsContext);
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="control__bar__container">
            <div className="controls__container">
                {user ? (
                    <>
                        <div className="control user-info">
                            <span className="user-name">{user.name}</span>
                        </div>
                        <div className="control">
                            <Link to="/wishlist">
                                <Badge badgeContent={wishItems.items.length} color="error">
                                    <FavoriteBorderIcon color="black" sx={{ width: '35px' }} />
                                </Badge>
                            </Link>
                        </div>
                        <div className="control">
                            <Cart />
                        </div>
                        <div className="control" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            <LogoutIcon color="black" sx={{ width: '35px' }} title="Logout" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="control">
                            <Link to="/account/login">
                                <PersonOutlineIcon color="black" size="large" sx={{ width: '35px' }} />
                            </Link>
                        </div>
                        <div className="control">
                            <Link to="/wishlist">
                                <Badge badgeContent={wishItems.items.length} color="error">
                                    <FavoriteBorderIcon color="black" sx={{ width: '35px' }} />
                                </Badge>
                            </Link>
                        </div>
                        <div className="control">
                            <Cart />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Control;
