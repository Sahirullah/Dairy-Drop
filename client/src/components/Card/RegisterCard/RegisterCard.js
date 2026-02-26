import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';
import './RegisterCard.css';

const RegisterCard = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const userData = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
        };

        const result = await register(userData);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="register__card__container">
            <div className="register__card">
                <div className="register__header">
                    <h1>Create Account</h1>
                </div>
                <form onSubmit={handleSubmit} className="register__inputs">
                    {error && <div className="error__message">{error}</div>}

                    <div className="fname__input__container reg__input__container">
                        <label className="fname__label input__label">First name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="fname__input register__input"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="lname__input__container reg__input__container">
                        <label className="lname__label input__label">Last name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="lname__input register__input"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="email__input__container reg__input__container">
                        <label className="email__label input__label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="email__input register__input"
                            placeholder='example@gmail.com'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="password__input__container reg__input__container">
                        <label className="password__label input__label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="password__input register__input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register__button__container">
                        <button
                            type="submit"
                            className="register__button"
                            disabled={loading}
                        >
                            {loading ? 'CREATING ACCOUNT...' : 'Create Account'}
                        </button>
                    </div>
                </form>
                <div className="register__other__actions">
                    <div className="register__login__account">
                        Already have account? <Link to="/account/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterCard;
