import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#FFE26E' }}>
            <div style={{ backgroundColor: '#FFE26E', display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', padding: '60px 40px', alignItems: 'start', width: '100%' }}>
                    {/* Left Section: Logo and Social Media */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#333', margin: 0, letterSpacing: '1px' }}>Dairy Drop</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#333', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Follow Us</p>
                            <ul style={{ margin: 0, padding: 0, listStyleType: 'none', display: 'flex', flexDirection: 'row', gap: '12px' }}>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.1)', color: '#333', transition: 'all 0.3s ease', textDecoration: 'none' }}>
                                        <TwitterIcon />
                                    </a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.1)', color: '#333', transition: 'all 0.3s ease', textDecoration: 'none' }}>
                                        <InstagramIcon />
                                    </a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.1)', color: '#333', transition: 'all 0.3s ease', textDecoration: 'none' }}>
                                        <YouTubeIcon />
                                    </a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <a href="https://telegram.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.1)', color: '#333', transition: 'all 0.3s ease', textDecoration: 'none' }}>
                                        <TelegramIcon />
                                    </a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.1)', color: '#333', transition: 'all 0.3s ease', textDecoration: 'none' }}>
                                        <PinterestIcon />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Middle Section: Help */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#333', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Help</h1>
                        <ul style={{ margin: 0, padding: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li style={{ color: '#333' }}>
                                <a href="/" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease', display: 'inline-block' }}> Shipping</a>
                            </li>
                            <li style={{ color: '#333' }}>
                                <a href="/" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease', display: 'inline-block' }}>Refund</a>
                            </li>
                            <li style={{ color: '#333' }}>
                                <a href="/faq" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease', display: 'inline-block' }}>FAQ</a>
                            </li>
                            <li style={{ color: '#333' }}>
                                <a href="/" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease', display: 'inline-block' }}>Accessibility</a>
                            </li>
                            <li style={{ color: '#333' }}>
                                <Link to="/about" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease', display: 'inline-block' }}>About Us</Link>
                            </li>
                            <li style={{ color: '#333' }}>
                                <Link to="/contact" style={{ color: '#333', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease', display: 'inline-block' }}>Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right Section: Contact */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#333', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact Us</h1>
                        <ul style={{ margin: 0, padding: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <li style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', gap: '12px', color: '#333', fontSize: '0.95rem' }}>
                                <LocalPhoneIcon style={{ fontSize: '1.2rem', color: '#333', flexShrink: 0 }} /> <span>+123 4567 890</span>
                            </li>
                            <li style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', gap: '12px', color: '#333', fontSize: '0.95rem' }}>
                                <EmailIcon style={{ fontSize: '1.2rem', color: '#333', flexShrink: 0 }} /> <span>shop@dairydrop.com</span>
                            </li>
                            <li style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', gap: '12px', color: '#333', fontSize: '0.95rem' }}>
                                <LocationOnIcon style={{ fontSize: '1.2rem', color: '#333', flexShrink: 0 }} /> <span>Addis Ababa, Ethiopia</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{ height: 'auto', width: '100%', backgroundColor: '#333', display: 'flex', color: '#FFE26E', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', padding: '25px 40px', gap: '8px' }}>
                    <ul style={{ margin: 0, padding: 0, listStyleType: 'none', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
                        <li style={{ fontSize: '0.9rem', color: '#FFE26E' }}>©2026 Dairy Drop Ltd. |</li>
                        <li style={{ fontSize: '0.9rem', color: '#FFE26E' }}> | Terms & Condition |</li>
                        <li style={{ fontSize: '0.9rem', color: '#FFE26E' }}>| Privacy Policy</li>
                        <li style={{ fontSize: '0.9rem', color: '#FFE26E' }}>| Develope By <a href='mailto:info.sahirweb@gmail.com' style={{ color: '#FFE26E', textDecoration: 'none', transition: 'color 0.3s ease' }}>sahirullah</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
