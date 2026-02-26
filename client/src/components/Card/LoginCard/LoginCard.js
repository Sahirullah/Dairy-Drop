import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';
import './LoginCard.css';

const LoginCard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login({ email, password });

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleSubmit} className="login__inputs">
                    {error && <div className="error__message">{error}</div>}

                    <div className="email__input__container input__container">
                        <label className="email__label input__label">Email</label>
                        <input
                            type="email"
                            className="email__input login__input"
                            placeholder='example@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password__input__container input__container">
                        <label className="password__label input__label">Password</label>
                        <input
                            type="password"
                            className="password__input login__input"
                            placeholder='**********'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login__button__container">
                        <button
                            type="submit"
                            className="login__button"
                            disabled={loading}
                        >
                            {loading ? 'LOGGING IN...' : 'LOGIN'}
                        </button>
                    </div>
                </form>
                <div className="login__other__actions">
                    <div className="login__forgot__password">Forgot password?</div>
                    <div className="login__new__account">
                        Don't have account? <Link to="/account/register">Create account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginCard;
