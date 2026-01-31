import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Dynamically determine API URL based on current hostname
            const API_BASE_URL = `http://${window.location.hostname}:8080`;
            const response = await fetch(`${API_BASE_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Success
                console.log('Login successful');
                // Ideally save token here if one was returned, but backend just returns string
                navigate('/');
            } else {
                const errorText = await response.text();
                setError(errorText || 'Invalid email or password');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="auth-container">
                <div className="auth-overlay"></div>
                <div className="auth-content">
                    <div className="glass-card auth-card">
                        <h2>Welcome Back</h2>
                        <p className="auth-subtitle">Login to continue your journey</p>

                        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
