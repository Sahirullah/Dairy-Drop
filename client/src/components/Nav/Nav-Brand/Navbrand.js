import './NavBrand.css'
import { Link } from 'react-router-dom';
import logo from '../../../asset/logo.png';

const NavBrand = () => {
    return (
        <div href="#home" className='navbrand__container'>
            <Link to="/" className='navbrand__logo-link'>
                <img src={logo} alt="Dairy Drop Logo" className='navbrand__logo' />
            </Link>
        </div>
    );
}

export default NavBrand;